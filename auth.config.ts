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
				return Response.redirect(new URL("/", nextUrl));
			}
			return true;
		},
		// session: async({session,token})=>{
		// 		session
		// }
	},
	providers: [],
} satisfies NextAuthConfig;
