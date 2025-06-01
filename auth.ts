import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "./lib/prisma";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";
import bcrypt from "bcrypt";

export const { handlers, signIn, signOut, auth } = NextAuth({
	...authConfig,
	adapter: PrismaAdapter(prisma),
	session: {
		strategy: "jwt",
	},
	providers: [
		Credentials({
			credentials: {
				email: {},
				password: {},
			},
			authorize: async credentials => {
				const parsedCredentials = z
					.object({ email: z.string().email(), password: z.string().min(8) })
					.safeParse(credentials);

				if (parsedCredentials.success) {
					const { email, password } = parsedCredentials.data;
					const user = await prisma.user.findUnique({
						where: {
							email,
						},
					});
					if (!user) return null;

					const passwordMatch = await bcrypt.compare(password, user.password!);
					if (passwordMatch) return user;
				}

				return null;
			},
		}),
	],
});
