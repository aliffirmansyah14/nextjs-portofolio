"use client";
import { useState } from "react";
import Project, { ProjectType } from "./project";
import Tabs, { CategoryType } from "./tabs";

type ProjectsProps = {
	projects: ProjectType[];
};
const categories: CategoryType[] = ["all", "html css", "laravel", "reactjs"];

const Projects = ({ projects }: ProjectsProps) => {
	const [isTabActive, setIsTabActive] = useState<CategoryType>("all");

	const handleOnClickTab = (selectedCategory: CategoryType) => {
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
