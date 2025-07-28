"use client";
import { useState } from "react";
import Project, { ProjectType } from "./project";
import Tabs, { CategoriesType } from "./tabs";

type ProjectsProps = {
	projects: ProjectType[];
	categories: CategoriesType[];
};

const Projects = ({ projects, categories }: ProjectsProps) => {
	const [isTabActive, setIsTabActive] = useState<string>("all");

	const handleOnClickTab = (selectedCategory: string) => {
		setIsTabActive(selectedCategory);
	};

	const filteredProjects =
		isTabActive === "all"
			? projects
			: projects.filter(
					p => p.category.toLowerCase() === isTabActive.toLowerCase()
			  );

	return (
		<div>
			<Tabs
				categories={categories}
				onClick={handleOnClickTab}
				isActive={isTabActive}
			/>
			<div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
				{filteredProjects.map((project, i) => {
					return <Project key={i} {...project} />;
				})}
			</div>
		</div>
	);
};

export default Projects;
