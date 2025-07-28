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
			field: Object.fromEntries(formData.entries()),
			error: parsedFormData.error.flatten().fieldErrors,
		};
	}

	try {
		await signIn("credentials", {
			...Object.fromEntries(formData.entries()),
			redirectTo: "/dashboard",
		});
	} catch (error) {
		if (error instanceof AuthError) {
			switch (error.type) {
				case "CredentialsSignin":
					return {
						field: Object.fromEntries(formData.entries()),
						message: "Username or Password is incorrect",
					};
				default:
					return {
						field: Object.fromEntries(formData.entries()),
						nessage: "Something wennt wrong",
					};
			}
		}
		throw error;
	}
};

export const createUser = async (email: string, password: string) => {
	const salt = await bcrypt.genSalt(10);
	const hashPassword = await bcrypt.hash(password, salt);
	try {
		const user = await prisma.user.create({
			data: {
				email,
				password: hashPassword,
			},
		});
		return user;
	} catch (error) {
		console.log(`Cannot create user in createUser Function :${error}`);
	}
};

export const seedCreateCaregory = async () => {
	const categories = [
		{ name: "react js" },
		{ name: "laravel" },
		{ name: "html css" },
		{ name: "next js" },
	];
	try {
		await prisma.category.createMany({
			data: categories,
		});
		return "success seed category";
	} catch (error) {
		console.log(`Cannot create user in createUser Function :${error}`);
	}
};
