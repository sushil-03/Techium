import Cookie from "js-cookie";
import { NextRequest, NextResponse } from "next/server";

interface RequestCookies {
  [key: string]: string;
}

export function middleware(request: NextRequest) {
  const accessToken = Cookie.get("accessToken");
  const isLogin = request.nextUrl.pathname === "/login";
  const isSignup = request.nextUrl.pathname === "/signup";
  const isMain = request.nextUrl.pathname === "/";

  // Store current request url in a custom header, which you can read later
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-url", request.nextUrl.pathname);

  if (!accessToken && !isLogin && !isSignup && !isMain) {
    return (
      NextResponse.rewrite(new URL("/login", request.nextUrl)),
      NextResponse.next({
        request: {
          // Apply new request headers
          headers: requestHeaders,
        },
      })
    );
  }

  return NextResponse.next({
    request: {
      // Apply new request headers
      headers: requestHeaders,
    },
  });
}
