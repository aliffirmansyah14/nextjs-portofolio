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
import { getSession } from "next-auth/react";

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

export const getPortofolios = cache(
	async (props?: {
		customArgs?: Prisma.ProjectFindManyArgs<DefaultArgs>;
		page?: number;
	}) => {
		try {
			const selectedRowDefault = { ...selectedRowProjects };
			// check ada props nya atau tidak
			if (!props?.customArgs && !props?.page) {
				return await prisma.project.findMany({ select: selectedRowDefault });
			} else if (props.page || props.customArgs) {
				// check props page
				if (props.page && isNaN(props.page)) {
					console.log("props page bukan number");
					return;
				}

				const portofolios = await prisma.project.findMany({
					...props.customArgs,
					select: props.customArgs?.select || selectedRowDefault,
					take: props.customArgs?.take || OFFSET_DATA,
					skip:
						props.customArgs?.skip ||
						(props.customArgs?.take || OFFSET_DATA) *
							(props.page ? props.page - 1 : 0),
				});

				return portofolios;
			}
			// await new Promise(resolve => setTimeout(resolve, 1000));
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
	}
);

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

export const getCountPortofolios = cache(async (query?: string) => {
	try {
		return await prisma.project.count({
			where: {
				OR: [
					{
						name: {
							contains: query,
						},
					},
					{
						category: {
							name: {
								contains: query,
							},
						},
					},
					{
						tech: {
							has: query,
						},
					},
				],
			},
		});
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

export const isUserLogin = cache(async () => {
	return await getSession();
});
