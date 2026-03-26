import CategoryCard from "@/components/shared/dashboard/cards/category-card";
import ChartCard from "@/components/shared/dashboard/cards/category-chart-card";
import ChartPieCategory from "@/components/shared/dashboard/cards/category-pie-card";
import PortofolioCard from "@/components/shared/dashboard/cards/portofolio-card";
import SkeletonCard from "@/components/shared/dashboard/cards/skeleton-card";
import Header from "@/components/shared/dashboard/Header";
import InfoTable from "@/components/shared/dashboard/info-table";
import { getCountCategoriesWithCountProjects } from "@/lib/api";
import { Suspense } from "react";
import SkeletonTable from "@/components/shared/skeleton-table";

const DashboardPage = () => {
	const categoriesWithCount = getCountCategoriesWithCountProjects();
	return (
		<div className={`px-4`} id="dashboard-content">
			<Header text="Dashboard" />
			<div className="mt-4 grid md:grid-cols-2 gap-4">
				<Suspense fallback={<SkeletonCard />}>
					<PortofolioCard />
				</Suspense>
				<Suspense fallback={<SkeletonCard />}>
					<CategoryCard />
				</Suspense>
				<Suspense fallback={<SkeletonCard />}>
					<ChartCard fetchCategory={categoriesWithCount} />
				</Suspense>
				<Suspense fallback={<SkeletonCard />}>
					<ChartPieCategory fetchCategory={categoriesWithCount} />
				</Suspense>
			</div>
			<div className="py-5">
				<Suspense fallback={<SkeletonTable row={5} col={3} />}>
					<InfoTable />
				</Suspense>
			</div>
		</div>
	);
};

export default DashboardPage;
