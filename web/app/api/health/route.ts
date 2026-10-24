// Used by the container health check. Must stay public (see proxy.ts) and touch nothing else.
export const dynamic = "force-dynamic";

export function GET() {
  return Response.json({ status: "ok" }, { headers: { "Cache-Control": "no-store" } });
}
