# Migrar um servidor Remotely existente para o Remotamente (Coolify + SQLite)

Objetivo: trocar o Remotely pelo Remotamente **sem perder os agentes dos clientes**.

## O que mantém os clientes conectados

1. **Mesmo endereço.** Cada agente guarda o endereço do servidor em `ConnectionInfo.json`.
   O domínio (`remoto.brendon.dev.br`) não pode mudar.
2. **Mesmo banco de dados.** Na primeira conexão o agente cria um token de verificação e o servidor o guarda
   no registro do dispositivo. Nas conexões seguintes o agente pergunta esse token ao servidor e **só conecta se for igual**.
   Servidor novo com banco vazio ou diferente = todos os agentes recusam (precisaria reinstalar máquina por máquina).
3. **Mesmo volume.** O banco SQLite fica em `/app/AppData/Remotely.db`, dentro do volume montado em `/app/AppData`
   (no compose oficial, `/var/www/remotely` no host). Reaproveite exatamente esse volume.

O Remotamente **não adiciona migrations**: o schema do banco é o mesmo do Remotely. Dá para subir o Remotamente no banco
atual e, se preciso, voltar à imagem antiga sem restaurar backup.

## Passo a passo

### 0. Gerar a imagem
No GitHub: **Actions → Release → Run workflow** (ou crie uma tag `v*`). O workflow publica
`ghcr.io/brendoncarvalho/remotamente:latest` (e tags por versão e commit), já com os pacotes de agente e os
clientes desktop dentro. Por padrão o pacote no GHCR herda a visibilidade do repositório (privado).

### 1. Backup (obrigatório)
Na VPS, com o contêiner **parado** (evita copiar o SQLite no meio de uma escrita):

```bash
docker stop <contêiner-do-remotely>
sudo cp -a /var/www/remotely /var/www/remotely.bak-$(date +%F)
docker start <contêiner-do-remotely>
```

Confirme que `Remotely.db` está na cópia. Se usar o caminho do volume do Coolify, ajuste o caminho
(`docker inspect <contêiner> | grep -A3 Mounts`).

### 2. Teste em paralelo (recomendado)
1. Crie um segundo recurso no Coolify com a imagem `ghcr.io/brendoncarvalho/remotamente:latest`
   (se a imagem for privada, cadastre o registro `ghcr.io` com um token do GitHub com `read:packages`).
2. Domínio de teste, por exemplo `remoto-teste.brendon.dev.br`.
3. Volume: monte uma **cópia** do banco (`/var/www/remotely.bak-...`) em `/app/AppData`. Nunca o banco de produção.
4. Copie as variáveis de ambiente do recurso atual (veja abaixo) e troque só o que for do domínio de teste.
5. Entre pela interface, confira idioma, organizações, dispositivos e a página **Downloads**.

> Agentes reais não vão aparecer online no teste (apontam para o domínio de produção). Para testar a conexão de um agente,
> instale um agente novo pelo script de **Deploy** do servidor de teste numa máquina sua.

### 3. Troca em produção
No recurso atual do Coolify (o que atende `remoto.brendon.dev.br`):
1. **Não mude** domínio, volume, porta nem variáveis de ambiente.
2. Troque somente a imagem para `ghcr.io/brendoncarvalho/remotamente:latest`
   (se o recurso for um *Docker Compose*, é a linha `image:` do serviço).
3. Faça o redeploy.
4. Confira: login na interface; um dispositivo seu aparece **Online**; abra um controle remoto; rode um comando.
5. Só então acompanhe os demais dispositivos.

### 4. Voltar atrás
Se algo der errado: no Coolify volte a imagem para `immybot/remotely:latest` e faça o redeploy. O banco é compatível
nos dois sentidos. Em último caso, restaure `/var/www/remotely.bak-<data>`.

## Variáveis de ambiente
Mantenha as do servidor atual. As que importam (nomes iguais aos do Remotely):

| Variável | Valor típico |
| --- | --- |
| `ASPNETCORE_ENVIRONMENT` | `Production` |
| `ASPNETCORE_HTTP_PORTS` | `5000` |
| `Remotely_ApplicationOptions__DbProvider` | `SQLite` |
| `Remotely_ConnectionStrings__SQLite` | `Data Source=/app/AppData/Remotely.db` |
| `Remotely_ApplicationOptions__DockerGateway` | gateway da rede Docker do recurso (o do Coolify costuma diferir de `172.28.0.1`) |

`DockerGateway` serve para o servidor confiar nos cabeçalhos `X-Forwarded-*` do proxy. Se o atual funciona,
copie o valor atual.

## Observações
- **Sessões web:** as chaves de proteção de dados ficam em `/root/.aspnet/DataProtection-Keys`, dentro do contêiner
  (não persistem). Cada redeploy desloga os usuários da interface. Os agentes não são afetados.
- **GPLv3:** ao distribuir binários (agente, instalador) aos clientes, você deve fornecer o código-fonte correspondente.
  Um repositório privado exige entregar o código sob pedido a quem recebeu os binários.
- **Não verificado:** a troca de imagem em um servidor real e a compatibilidade de agentes antigos (.NET 8) com o servidor
  (.NET 10). Faça com um dispositivo seu antes de todos.

## Deploy automático

A cada merge na `main` (fora mudanças só de documentação), o workflow **Release** roda os testes do servidor,
publica a imagem em `ghcr.io/brendoncarvalho/remotamente:latest` e, no fim, chama o webhook de deploy do Coolify.
Não é preciso rodar o release nem reimplantar à mão.

Configuração (uma vez):

1. **Coolify → Keys & Tokens → API tokens**: crie um token com permissão de deploy (a API precisa estar habilitada em
   *Settings → Advanced → API Access*).
2. No recurso do Remotamente: **Webhooks → Deploy Webhook**: copie a URL (termina em `/api/v1/deploy?uuid=...`).
3. **Desligue o "Auto Deploy" por push do Git** nesse mesmo painel. Senão o Coolify reimplanta na hora do merge, antes
   da imagem nova estar pronta, e sobe a imagem antiga outra vez.
4. No GitHub: **Settings → Secrets and variables → Actions → New repository secret**:
   - `COOLIFY_DEPLOY_URL`: a URL do passo 2;
   - `COOLIFY_API_TOKEN`: o token do passo 1.

Sem esses dois segredos o release publica a imagem e pula o deploy (aparece um aviso no log).

Cada merge passa a ir para a produção sozinho. Para voltar ao modo manual, apague o job `deploy` do workflow ou
os segredos. Para desfazer uma versão ruim, reverta o commit na `main` (o release publica a versão anterior) ou fixe
uma tag de imagem anterior no compose.
