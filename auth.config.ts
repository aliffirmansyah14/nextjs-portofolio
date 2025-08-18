import { NextAuthConfig } from "next-auth";

export const authConfig = {
	pages: {
		signIn: "/login",
	},
	callbacks: {
		authorized: ({ auth, request: { nextUrl } }) => {
			const isLoggedIn = !!auth?.user;
			const protectedRoute = ["/dashboard"];

			if (!isLoggedIn && protectedRoute.includes(nextUrl.pathname)) {
				return false; // Redirect unauthenticated users to login page
			}
			if (isLoggedIn && nextUrl.pathname.startsWith("/login")) {
				return Response.redirect(new URL("/dashboard", nextUrl));
			}
			return true;
		},
		jwt: ({ token, user }) => {
			if (user && user.id) {
				token.id = user.id;
			}
			return token;
		},
		session: async ({ session, token }) => {
			session.user.id = token.id;
			session.user.name = token.name;

			return session;
		},
	},
	providers: [],
} satisfies NextAuthConfig;
