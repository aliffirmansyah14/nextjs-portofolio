import Section from "@/components/shared/layout/section-layout";
import HeaderSection from "../header-section";
import { Suspense } from "react";
import ProjectsSkeleton from "./project-skeleton";
import { getCategories, getCountPortofolios, getPortofolios } from "@/lib/api";
import Projects from "./projects";

const Portofolio = () => {
	// provide promise to client component
	const categories = getCategories();
	const projects = getPortofolios();
	const countProjects = getCountPortofolios();
	return (
		<Section id="portofolio">
			<HeaderSection
				badgeText="Portofolio"
				text={`Mari lihat-lihat portofolio yang saya buat`}
			/>
			<Suspense fallback={<ProjectsSkeleton />}>
				<Projects
					categories={categories}
					projects={projects}
					itemCount={countProjects}
				/>
			</Suspense>
		</Section>
	);
};

export default Portofolio;
