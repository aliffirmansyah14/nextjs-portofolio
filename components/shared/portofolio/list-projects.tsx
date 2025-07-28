import Projects from "./projects";
import { getCategories, getProjects } from "@/lib/api";

const ListProjects = async () => {
	const [categories, projects] = await Promise.all([
		getCategories(),
		getProjects(2000),
	]);

	return <Projects projects={projects} categories={categories} />;
};

export default ListProjects;
