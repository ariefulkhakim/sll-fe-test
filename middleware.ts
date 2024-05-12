import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  let cookie = request.cookies.get("access_token");
  if (!cookie) {
    console.log("tidak ada cookie");
    return NextResponse.redirect(new URL("sign-in", request.url));
  }
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
