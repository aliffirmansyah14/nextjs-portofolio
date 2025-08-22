"use server";
import { prisma } from "./prisma";
import { cache } from "react";
import { selectedRowProjects } from "./schema";
import {
	DefaultArgs,
	PrismaClientKnownRequestError,
} from "@prisma/client/runtime/library";
import { Prisma } from "@prisma/client";
import { OFFSET_DATA } from "./constants";

export const getCategories = cache(async () => {
	try {
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

export const getPortofolios = cache(async (page: number = 1) => {
	if (isNaN(page)) return;
	try {
		await new Promise(resolve => setTimeout(resolve, 1000));
		return await prisma.project.findMany({
			select: { ...selectedRowProjects },
			take: OFFSET_DATA,
			skip: OFFSET_DATA * (page - 1),
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

export const getPortofolioById = cache(
	async (
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
	}
);

export const getCountPortofolios = cache(async () => {
	try {
		return await prisma.project.count();
	} catch (error) {
		console.log("error di count portofolios " + error);
	}
});

export const getCountCategoriesWithCountProjects = cache(async () => {
	try {
		return await prisma.category.findMany({
			select: {
				name: true,
				_count: {
					select: {
						projects: true,
					},
				},
			},
			orderBy: {
				projects: {
					_count: "desc",
				},
			},
		});
	} catch (error) {
		console.log("error di count categories " + error);
	}
});
