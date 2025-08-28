"use client";
import { use, useState } from "react";
import Tabs from "./tabs";
import Project from "./project";
import Pagination from "../pagination";
import { Prisma } from "@prisma/client";
import { selectedRowProjects } from "@/lib/schema";

export type PortofoliosType = Prisma.ProjectGetPayload<{
	select: typeof selectedRowProjects;
}>;

type ProjectsProps = {
	projects: Promise<PortofoliosType[] | undefined>;
	categories: Promise<{ name: string; id: string }[]>;
	itemCount: Promise<number | undefined>;
};

const Projects = ({ projects, categories, itemCount }: ProjectsProps) => {
	const allProjects = use(projects);
	const allCategories = use(categories);
	const [isTabActive, setIsTabActive] = useState<string>("all");

	const handleOnClickTab = (selectedCategory: string) => {
		setIsTabActive(selectedCategory);
	};

	const filteredProjects =
		allProjects !== undefined
			? allProjects.length > 0 && isTabActive === "all"
				? allProjects
				: allProjects.filter(
						p => p.category.name.toLowerCase() === isTabActive.toLowerCase()
				  )
			: [];

	return (
		<div>
			<div className="mt-7 flex flex-col gap-4 md:flex-row md:justify-between">
				<Tabs
					categories={allCategories}
					onClick={handleOnClickTab}
					isActive={isTabActive}
				/>
				<Pagination itemCount={itemCount} />
			</div>
			<div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
				{filteredProjects && filteredProjects.length > 0 ? (
					filteredProjects.map((project, i) => {
						return <Project key={i} {...project} />;
					})
				) : (
					<div className="col-span-1 md:col-span-2 lg:col-span-3 text-lg md:text-xl text-center">
						Nothing...
					</div>
				)}
			</div>
		</div>
	);
};

export default Projects;
