"use client";
import { use, useState } from "react";
import Project, { ProjectType } from "./project";
import Tabs, { CategoriesType } from "./tabs";

type ProjectsProps = {
	projects: Promise<ProjectType[]>;
	categories: Promise<{ name: string; id: string }[]>;
};

const Projects = ({ projects, categories }: ProjectsProps) => {
	const allProjects = use(projects);
	const allCategories = use(categories);
	const [isTabActive, setIsTabActive] = useState<string>("all");

	const handleOnClickTab = (selectedCategory: string) => {
		setIsTabActive(selectedCategory);
	};

	const filteredProjects =
		isTabActive === "all"
			? allProjects
			: allProjects.filter(
					p => p.category.toLowerCase() === isTabActive.toLowerCase()
			  );

	return (
		<div>
			<Tabs
				categories={allCategories}
				onClick={handleOnClickTab}
				isActive={isTabActive}
			/>
			<div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
				{filteredProjects.length > 0 ? (
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
