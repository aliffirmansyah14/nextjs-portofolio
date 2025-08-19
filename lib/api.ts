"use server";
import { prisma } from "./prisma";
import { cache } from "react";
import { selectedRowProjects } from "./schema";
import {
	DefaultArgs,
	PrismaClientKnownRequestError,
} from "@prisma/client/runtime/library";
import { Prisma } from "@prisma/client";

// const projects: ProjectType[] = [
// 	{
// 		tech: ["Next JS", "Tailwind CSS", "React JS", "Laravel", "Supabase"],
// 		imageUrl: "https://placehold.co/400x200",
// 		name: "React-js chatting",
// 		redirectUrl: "https://github.com/aliffirmansyah14/",
// 		category: "reactjs",
// 	},
// 	{
// 		tech: ["Next JS", "Tailwind CSS"],
// 		imageUrl: "https://placehold.co/400x200",
// 		name: "React-js chatting",
// 		redirectUrl: "https://github.com/aliffirmansyah14/",
// 		category: "reactjs",
// 	},
// 	{
// 		tech: ["Next JS", "Tailwind CSS"],
// 		imageUrl: "https://placehold.co/400x200",
// 		name: "React-js chatting",
// 		redirectUrl: "https://github.com/aliffirmansyah14/",
// 		category: "reactjs",
// 	},
// 	{
// 		tech: ["Next JS", "Tailwind CSS"],
// 		imageUrl: "https://placehold.co/400x200",
// 		name: "React-js chatting",
// 		redirectUrl: "https://github.com/aliffirmansyah14/",
// 		category: "reactjs",
// 	},
// 	{
// 		tech: ["Next JS", "Tailwind CSS"],
// 		imageUrl: "https://placehold.co/400x200",
// 		name: "React-js chatting",
// 		redirectUrl: "https://github.com/aliffirmansyah14/",
// 		category: "html css",
// 	},
// 	{
// 		tech: ["Next JS", "Tailwind CSS"],
// 		imageUrl: "https://placehold.co/400x200",
// 		name: "React-js chatting",
// 		redirectUrl: "https://github.com/aliffirmansyah14/",
// 		category: "laravel",
// 	},
// ];

export const getCategories = cache(async () => {
	try {
		// await new Promise(resolve => {
		// 	setTimeout(resolve, 300);
		// });
		return await prisma.category.findMany({
			select: {
				id: true,
				name: true,
			},
		});
	} catch (error) {
		console.log(`error get categories : ${error}`);
		return [];
	}
});

export const getPortofolios = cache(async () => {
	try {
		return await prisma.project.findMany({
			select: { ...selectedRowProjects },
		});
	} catch (error) {
		if (error instanceof Error) {
			switch (error.name) {
				case "PrismaClientKnownRequestError":
					console.log((error as PrismaClientKnownRequestError).code);
				default:
					console.log(error.name);
			}
		}
		// if (error instanceof PrismaClientKnownRequestError) {
		// 	throw new Error("error di get portofolios" + error.message);
		// }
	}
});

export const getPortofolioById = async (
	idProject: string,
	selecttedProject: Prisma.ProjectSelect<DefaultArgs> | null | undefined
) => {
	try {
		return await prisma.project.findUnique({
			select: {
				...selecttedProject,
			},
			where: {
				id: idProject,
			},
		});
	} catch (error) {
		throw new Error("Error di getportofolio by id");
	}
};
