import Section from "@/components/shared/layout/section-layout";
import HeaderSection from "../header-section";
import { Suspense } from "react";
import ListProjects from "./list-projects";
import ProjectsSkeleton from "./project-skeleton";

const Portofolio = () => {
	return (
		<Section id="portofolio">
			<HeaderSection
				badgeText="Portofolio"
				text={`Explore my portofolio of creative solutions`}
			/>
			<Suspense fallback={<ProjectsSkeleton />}>
				<ListProjects />
			</Suspense>
		</Section>
	);
};

export default Portofolio;
