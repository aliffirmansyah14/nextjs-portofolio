import { z } from "zod";

export const loginFormSchema = z.object({
	email: z.string().email("Invalid email address"),
	password: z.string().min(1, "At Least 1 character"),
});

export const createPortofolioFormSchema = z.object({
	name: z.string().min(1, "At least 1 character"),
	category: z.string().min(1, "required"),
	tech: z.array(z.string()),
	redirectUrl: z.string(),
	image: z
		.instanceof(File)
		.refine(file => file.size <= 1000000, {
			message: "Image must less then 1MB",
		})
		.refine(file => file.type.startsWith("image/"), {
			message: "Invalid fie type",
		}),
});

export type createPortofolioFormType = z.infer<
	typeof createPortofolioFormSchema
>;

export const imageZod = z
	.instanceof(File)
	.refine(file => file.size <= 1000000, {
		message: "Image must less then 1MB",
	})
	.refine(file => file.type.startsWith("image/"), {
		message: "Invalid fie type",
	});

export const editPortofolioWithFileFormSchema = z.object({
	name: z.string().min(1, "At least 1 character"),
	category: z.string().min(1, "required"),
	tech: z.array(z.string()),
	redirectUrl: z.string(),
	image: imageZod,
});

export type editPortofolioWithFileFormType = z.infer<
	typeof editPortofolioWithFileFormSchema
>;
export const editPortofolioFormSchema = z.object({
	name: z.string().min(1, "At least 1 character"),
	category: z.string().min(1, "required"),
	tech: z.array(z.string()),
	redirectUrl: z.string(),
	image: z.string().min(1, "requuired"),
});

export type editPortofolioType = z.infer<typeof editPortofolioFormSchema>;

export const selectedRowProjects = {
	id: true,
	name: true,
	category: {
		select: {
			id: true,
			name: true,
		},
	},
	tech: true,
	imageUrl: true,
	redirectUrl: true,
	createdAt: true,
};
