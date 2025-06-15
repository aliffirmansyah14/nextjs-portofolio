import Projects from "./projects";
import { getProjects } from "@/lib/api";

const ListProjects = async () => {
	const projects = await getProjects(3000);

	return <Projects projects={projects} />;
};

export default ListProjects;
