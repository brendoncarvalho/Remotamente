import { NextResponse, type NextRequest } from "next/server";

/**
 * The legacy portal (ASP.NET Core Identity) owns login. This app is served from the
 * same domain, so the browser sends the Identity cookie to both. Here we only check
 * that the cookie EXISTS and otherwise send the visitor to the legacy login page.
 *
 * This is a convenience redirect, not security: anyone can fake a cookie name. Pages
 * in this app must not render private data until they get it from the .NET API,
 * which validates the session. Nothing private is rendered yet.
 */
const IDENTITY_COOKIE = ".AspNetCore.Identity.Application";

export function proxy(request: NextRequest) {
  if (process.env.REMOTAMENTE_DEV_BYPASS_AUTH === "1") {
    return NextResponse.next();
  }

  if (request.cookies.has(IDENTITY_COOKIE)) {
    return NextResponse.next();
  }

  // nextUrl.pathname has no base path; ReturnUrl needs it so login lands back in /app.
  const returnUrl = `/app${request.nextUrl.pathname === "/" ? "" : request.nextUrl.pathname}${request.nextUrl.search}`;
  const login = new URL("/Account/Login", request.url);
  login.searchParams.set("ReturnUrl", returnUrl);
  return NextResponse.redirect(login);
}

export const config = {
  // Everything except the health check and Next's own assets. "/" is listed on its own:
  // with a base path, the home page is not matched by the catch-all pattern.
  matcher: ["/", "/((?!api/health|_next/static|_next/image|favicon.ico).+)"],
};
