import { z } from "zod";

export const loginFormSchema = z.object({
	email: z.string().email("Invalid email address"),
	password: z.string().min(1, "At Least 1 character"),
});

export const createPortofolioFormSchema = z.object({
	name: z.string().min(1, "At least 1 character"),
	category: z.string().min(1, "required"),
	tech: z.array(z.string()),
	image: z
		.instanceof(File)
		.refine(file => file.type.startsWith("image/"), {
			message: "Invalid fie type",
		})
		.refine(file => file.size < 5000000, {
			message: "Image must less then 5MB",
		}),
});

export type createPortofolioFormType = z.infer<
	typeof createPortofolioFormSchema
>;
