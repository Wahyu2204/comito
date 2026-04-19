import { withAuth } from "next-auth/middleware";
import { NextRequest } from "next/server";

export const middleware = withAuth(
  function middleware(req: NextRequest) {
    return;
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  },
);

// Protect these routes - add paths that require authentication
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - auth (auth pages)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|auth).*)",
  ],
};
