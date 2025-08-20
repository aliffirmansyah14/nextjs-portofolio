import Section from "@/components/shared/layout/section-layout";
import HeaderSection from "../header-section";
import { Suspense } from "react";
import ProjectsSkeleton from "./project-skeleton";
import { getCategories, getCountPortofolios, getPortofolios } from "@/lib/api";
import Projects from "./projects";
import Pagination from "../pagination";

const Portofolio = ({ page }: { page: string }) => {
	// provide promise to client component
	const categories = getCategories();
	const projects = getPortofolios(Number(page));
	const countProjects = getCountPortofolios();

	return (
		<Section id="portofolio">
			<HeaderSection
				badgeText="Portofolio"
				text={`Explore my portofolio of creative solutions`}
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
