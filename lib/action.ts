"use server";

import { signIn } from "@/auth";
import { loginFormSchema } from "./schema";
import { prisma } from "./prisma";
import bcrypt from "bcrypt";
import { AuthError } from "next-auth";

export const authenticate = async (prevState: unknown, formData: FormData) => {
	const parsedFormData = loginFormSchema.safeParse(
		Object.fromEntries(formData.entries())
	);
	if (!parsedFormData.success) {
		return {
			error: parsedFormData.error.flatten().fieldErrors,
		};
	}
	try {
		await signIn("credentials", formData);
	} catch (error) {
		if (error instanceof AuthError) {
			switch (error.type) {
				case "CredentialsSignin":
					return { message: "Invalid Credentials" };
				default:
					return { nessage: "Something wennt wrong" };
			}
		}
		throw error;
	}
};

export const createUser = async (email: string, password: string) => {
	const salt = await bcrypt.genSalt(10);
	const hashPassword = await bcrypt.hash(password, salt);
	const user = await prisma.user.create({
		data: {
			email,
			password: hashPassword,
		},
	});
	if (user) {
		console.log(user);
	}
};
