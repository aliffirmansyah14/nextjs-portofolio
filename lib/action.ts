"use server";

import { signIn } from "@/auth";
import {
	createPortofolioFormSchema,
	createPortofolioFormType,
	editPortofolioFormSchema,
	editPortofolioType,
	// editPortofolioWithFileFormSchema,
	loginFormSchema,
	uploadImageSchema,
} from "./schema";
import { prisma } from "./prisma";
import bcrypt from "bcrypt";
import { AuthError } from "next-auth";
import { put, del } from "@vercel/blob";
import { revalidatePath } from "next/cache";
import { getPortofolioById } from "./api";

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
		// const hashPassword = await bcrypt.hash(parsedFormData.data.password, 10);
		// await prisma.user.create({
		// 	data: {
		// 		email: parsedFormData.data.email,
		// 		password: hashPassword,
		// 	},
		// });
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

export const uploadImageToBlob = async (file: File) => {
	const parsed = uploadImageSchema.safeParse({ image: file });

	if (!parsed.success) {
		return {
			message: "Upload image failed",
			errors: parsed.error.flatten().fieldErrors,
			success: false,
		};
	}
	if (!parsed.data.image)
		return {
			message: "file is undefined",
			success: false,
		};
	try {
		const { url } = await put(
			`${parsed.data.image?.name}-${new Date().toISOString().split("T")[0]}`,
			parsed.data.image,
			{
				access: "public",
				allowOverwrite: true,
			}
		);
		return {
			message: "upload image success",
			success: true,
			url,
		};
	} catch (error) {
		console.log("error di upload image to blob func " + error);
		return {
			errors: error,
			message: "upload failed",
			success: false,
		};
	}
};

export const deleteImageInBlob = async (url: string) => {
	try {
		await del(url);
		return {
			success: true,
		};
	} catch (error) {
		console.log("error di delete image : " + error);
		return {
			success: false,
			errors: error,
		};
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

export type ReturnType = {
	message: string;
	errors?: Record<string, unknown>;
	success: boolean;
};

export const createPortofolio = async (
	rawData: createPortofolioFormType
): Promise<ReturnType> => {
	const parsed = createPortofolioFormSchema.safeParse(rawData);

	if (!parsed.success) {
		return {
			message: "Submission failed",
			errors: parsed.error.flatten().fieldErrors,
			success: false,
		};
	}
	try {
		await prisma.project.create({
			data: {
				name: parsed.data.name,
				redirectUrl: parsed.data.redirectUrl,
				categoryId: parsed.data.category,
				imageUrl: parsed.data.imageUrl,
				tech: parsed.data.tech.split(",").map(t => t.trim()),
			},
		});

		revalidatePath("/dashboard/portofolio");
		revalidatePath("/");

		return {
			success: true,
			message: "Submission Success",
		};
	} catch (error) {
		console.log(`error di create form portofolio func : ${error}`);
		if (parsed.data.imageUrl) {
			await del(parsed.data.imageUrl);
		}
		return {
			message: "Submission failed",
			success: false,
		};
	}
};
export const editPortofolio = async (
	rawData: editPortofolioType,
	idProject: string
): Promise<ReturnType> => {
	const parsed = editPortofolioFormSchema.safeParse(rawData);

	if (!parsed.success) {
		return {
			message: "Submission failed",
			errors: parsed.error.flatten().fieldErrors,
			success: false,
		};
	}

	try {
		await prisma.project.update({
			data: {
				name: parsed.data.name,
				redirectUrl: parsed.data.redirectUrl,
				categoryId: parsed.data.category,
				imageUrl: parsed.data.imageUrl,
				tech: parsed.data.tech.split(",").map(t => t.trim()),
			},
			where: {
				id: idProject,
			},
		});

		// revalidatePath("/dashboard/portofolio/edit/[id]");
		revalidatePath("/dashboard/portofolio");
		revalidatePath("/");

		return {
			success: true,
			message: "Submission Success",
		};
	} catch (error) {
		console.log(`error di create form portofolio func : ${error}`);
		return {
			message: "Submission failed",
			success: false,
		};
	}
};

export const deletePortofolioById = async (formData: unknown) => {
	if (!(formData instanceof FormData)) return;

	const id = formData.get("id") as string;
	if (!id) return;

	const portofolio = await getPortofolioById(id, { imageUrl: true });
	try {
		if (!id || !portofolio) return;
		if (portofolio.imageUrl) {
			const response = await deleteImageInBlob(portofolio.imageUrl);
			if (!response.success) {
				throw new Error(response?.errors as any);
			}
		}
		await prisma.project.delete({
			where: {
				id,
			},
		});
		revalidatePath("/dashboard/portofolio");
		revalidatePath("/");
		revalidatePath("/dashboard");
	} catch (error) {
		console.log("error di delete portofolio api.ts ");
	}
};
