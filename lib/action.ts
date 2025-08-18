"use server";

import { signIn } from "@/auth";
import {
	createPortofolioFormSchema,
	createPortofolioFormType,
	editPortofolioFormSchema,
	editPortofolioWithFileFormSchema,
	loginFormSchema,
} from "./schema";
import { prisma } from "./prisma";
import bcrypt from "bcrypt";
import { AuthError } from "next-auth";
import { put, del } from "@vercel/blob";
import { revalidatePath } from "next/cache";

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

export const createPortofolio = async (
	prevState: unknown,
	formData: FormData
) => {
	const createFormdata: createPortofolioFormType = {
		name: formData.get("name") as string,
		category: formData.get("category") as string,
		image: formData.get("image") as File,
		redirectUrl: formData.get("redirect") as string,
		tech: (formData.get("tech") as string).split(",").map(t => t.trim()),
	};
	const parsedFormData = createPortofolioFormSchema.safeParse(createFormdata);
	if (!parsedFormData.success) {
		return {
			field: Object.fromEntries(formData.entries()),
			error: parsedFormData.error.flatten().fieldErrors,
		};
	}

	const { url } = await put(
		`${parsedFormData.data.image.name}-${
			new Date().toISOString().split("T")[0]
		}`,
		parsedFormData.data.image,
		{
			access: "public",
			allowOverwrite: true,
		}
	);

	const createdPortofolio = await prisma.project.create({
		data: {
			name: createFormdata.name,
			redirectUrl: createFormdata.redirectUrl,
			categoryId: createFormdata.category,
			imageUrl: url,
			tech: createFormdata.tech,
		},
	});
	console.log(createdPortofolio);
	revalidatePath("/dashboard/portofolio");
};

export const editPortofolio = async (
	idProject: string | undefined | null,
	prevState: unknown,
	formData: FormData
) => {
	if (!idProject) return;
	const image = formData.get("image");
	const imageName = formData.get("imageName") as string;

	const isImageFile = image instanceof File;

	const editFormData = {
		name: formData.get("name") as string,
		category: formData.get("category") as string,
		redirectUrl: formData.get("redirect") as string,
		tech: (formData.get("tech") as string).split(",").map(t => t.trim()),
		image: isImageFile ? (image as File) : (image as string),
	};
	const schema = isImageFile
		? editPortofolioWithFileFormSchema
		: editPortofolioFormSchema;

	const parsedFormData = schema.safeParse(editFormData);

	if (!parsedFormData.success) {
		return {
			field: Object.fromEntries(formData.entries()),
			error: parsedFormData.error.flatten().fieldErrors,
		};
	}
	if (!isImageFile) {
		await prisma.project.update({
			data: {
				name: parsedFormData.data.name,
				categoryId: parsedFormData.data.category,
				tech: parsedFormData.data.tech,
				redirectUrl: parsedFormData.data.redirectUrl,
			},
			where: {
				id: idProject,
			},
		});
	} else {
		await del(imageName);
		const newImage = parsedFormData.data.image as File;
		const { url } = await put(
			`${newImage.name.split(".")[0]}-${
				new Date().toISOString().split("T")[0]
			}`,
			newImage,
			{
				access: "public",
				allowOverwrite: true,
			}
		);
		await prisma.project.update({
			data: {
				name: parsedFormData.data.name,
				categoryId: parsedFormData.data.category,
				tech: parsedFormData.data.tech,
				redirectUrl: parsedFormData.data.redirectUrl,
				imageUrl: url,
			},
			where: {
				id: idProject,
			},
		});
	}
	revalidatePath("/dashboard/portofolio");
};
