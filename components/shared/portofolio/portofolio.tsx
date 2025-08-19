import Section from "@/components/shared/layout/section-layout";
import HeaderSection from "../header-section";
import { Suspense } from "react";
import ProjectsSkeleton from "./project-skeleton";
import { getCategories, getPortofolios } from "@/lib/api";
import Projects from "./projects";

const Portofolio = () => {
	// provide promise to client component
	const categories = getCategories();
	const projects = getPortofolios();
	// const [categories, projects] = Promise.all([
	// 	getCategories(),
	// 	getProjects(2000),
	// ]);
	return (
		<Section id="portofolio">
			<HeaderSection
				badgeText="Portofolio"
				text={`Explore my portofolio of creative solutions`}
			/>
			<Suspense fallback={<ProjectsSkeleton />}>
				<Projects categories={categories} projects={projects} />
			</Suspense>
		</Section>
	);
};

export default Portofolio;
