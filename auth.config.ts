import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  pages: {
    signIn: "/login",
  },
  providers: [],
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith("/dashboard");
      const isOnLogin = nextUrl.pathname.startsWith("/login");
      const isOnSignUp = nextUrl.pathname.startsWith("/signup");
      const isOnOCR = nextUrl.pathname.startsWith("/ocr-label-maker");

      if (isOnDashboard || isOnOCR) {
        return isLoggedIn;
      }

      if (isOnLogin || isOnSignUp) {
        if (isLoggedIn) {
          return Response.redirect(new URL("/dashboard", nextUrl));
        } else {
          return true;
        }
      }

      return true;
    },
  },
} satisfies NextAuthConfig;
