using System.Globalization;

namespace Remotely.Desktop.UI;

/// <summary>
/// UI strings for the desktop client, in English and Brazilian Portuguese.
/// Portuguese is used when the OS display language is Portuguese; anything else gets English.
/// Properties are used from XAML via {x:Static}, so each is read once when its window loads.
/// </summary>
public static class Loc
{
    private static bool IsPortuguese =>
        CultureInfo.CurrentUICulture.TwoLetterISOLanguageName.Equals("pt", StringComparison.OrdinalIgnoreCase);

    private static string T(string en, string pt) => IsPortuguese ? pt : en;

    // Generic
    public static string Ok => T("OK", "OK");
    public static string Yes => T("Yes", "Sim");
    public static string No => T("No", "Não");
    public static string You => T("You", "Você");

    // Main window
    public static string ShareScreen => T("Share Screen", "Compartilhar tela");
    public static string YourSessionId => T("Your Session ID:", "ID da sua sessão:");
    public static string InviteLink => T("Invite Link:", "Link de convite:");
    public static string Copy => T("Copy", "Copiar");
    public static string CopiedToClipboard => T("Copied to clipboard!", "Copiado para a área de transferência!");
    public static string Viewers => T("Viewers", "Visualizadores");
    public static string Name => T("Name", "Nome");
    public static string HasControl => T("Has Control", "Tem controle");
    public static string Remove => T("Remove", "Remover");
    public static string ChangeServer => T("Change Server", "Alterar servidor");
    public static string Initializing => T("Initializing...", "Iniciando...");
    public static string Retrieving => T("Retrieving...", "Obtendo...");
    public static string Disconnected => T("Disconnected", "Desconectado");
    public static string Reconnecting => T("Reconnecting", "Reconectando");
    public static string SudoRequired => T("Sudo Required", "Sudo necessário");
    public static string RunWithSudo => T("Please run with sudo.", "Execute com sudo.");
    public static string ConnectionFailed => T("Connection Failed", "Falha na conexão");
    public static string FailedToConnect => T("Failed to connect to server.", "Não foi possível conectar ao servidor.");
    public static string InvalidServerUrl => T("Invalid Server URL", "URL do servidor inválida");
    public static string InvalidServerUrlMessage => T(
        "Server URL must be a valid Uri (e.g. https://example.com).",
        "A URL do servidor deve ser válida (ex.: https://exemplo.com).");

    // Host name prompt
    public static string HostName => T("Host Name", "Servidor");
    public static string EnterServerUrl => T("Enter the server URL:", "Digite a URL do servidor:");

    // Remote control request
    public static string RemoteControlRequest => T("Remote Control Request", "Solicitação de controle remoto");
    public static string RemoteControlRequested => T(
        "A remote control session has been requested.",
        "Foi solicitada uma sessão de controle remoto.");
    public static string DefaultRequester => T("a technician", "um técnico");
    public static string DefaultOrganization => T("your IT provider", "seu provedor de TI");
    public static string AllowRequest(string requester, string organization) => T(
        $"Would you like to allow {requester} from {organization} to control your computer?",
        $"Deseja permitir que {requester}, de {organization}, controle o seu computador?");

    // Session indicator
    public static string RemoteControlActive => T("Remote Control Active", "Controle remoto ativo");
    public static string RemoteControlStarted => T(
        "A remote control session has started.",
        "Uma sessão de controle remoto foi iniciada.");
    public static string StopSession => T("Stop Session", "Encerrar sessão");
    public static string StopSessionQuestion => T("Stop the remote control session?", "Encerrar a sessão de controle remoto?");

    // Chat
    public static string ChatSession => T("Chat Session", "Sessão de chat");
    public static string ChatSessionWith(string organization) => T($"Chat session with {organization}", $"Sessão de chat com {organization}");
    public static string PartnerDisconnected => T("Partner Disconnected", "Interlocutor desconectado");
    public static string PartnerDisconnectedMessage => T(
        "Your partner has disconnected from the chat.",
        "Seu interlocutor saiu do chat.");

    // File transfer
    public static string FileTransfer => T("File Transfer", "Transferência de arquivos");
    public static string UploadFilesTo => T("Upload files to ", "Enviar arquivos para ");
    public static string UploadFile => T("Upload File", "Enviar arquivo");
    public static string TransferComplete => T("Transfer Complete", "Transferência concluída");
    public static string TransferCompleteShowFolder => T(
        "File transfer complete.  Show folder?",
        "Transferência de arquivos concluída. Abrir a pasta?");
    public static string TransferCompleteSavedTo(string directory) => T(
        $"File transfer complete.  Files saved to directory:\n\n{directory}",
        $"Transferência de arquivos concluída. Arquivos salvos em:\n\n{directory}");
}
