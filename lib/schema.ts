import { z } from "zod";

export const imageZod = z
	.instanceof(File)
	.refine(file => file.size <= 1000000, {
		message: "Image must less then 1MB",
	})
	.refine(file => file.size > 0 && file.type.startsWith("image/"), {
		message: "Invalid fie type",
	});

export const uploadImageSchema = z.object({
	image: imageZod,
});
export type uploadImageType = z.infer<typeof uploadImageSchema>;

export const loginFormSchema = z.object({
	email: z.string().email("Invalid email address"),
	password: z.string().min(1, "At Least 1 character"),
});

export const createPortofolioFormSchema = z.object({
	name: z.string().min(3, "At least 1 character"),
	category: z.string().min(1, "required"),
	tech: z.string().min(1, "At least 1 character"),
	redirectUrl: z.string().min(1, "At least 1 character"),
	imageUrl: z.string().optional(),
	// image: imageZod,
});

export type createPortofolioFormType = z.infer<
	typeof createPortofolioFormSchema
>;

export const editPortofolioFormSchema = z.object({
	name: z.string().min(1, "At least 1 character"),
	category: z.string().min(1, "required"),
	tech: z.string().min(1, "At least 1 character"),
	redirectUrl: z.string(),
	imageUrl: z.string().optional().nullable(),
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
