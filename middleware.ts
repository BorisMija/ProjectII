import { clerkMiddleware } from "@clerk/nextjs/server";

export default clerkMiddleware({
  publicRoutes: ["/api/:path*"], // permite accesul fără autentificare la toate rutele API
});

export const config = {
  matcher: [
    /*
      Matcher interceptează toate rutele cu excepția:
      - a celor statice din .next/
      - a rutei /api (deoarece le permiți public în middleware)
    */
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};