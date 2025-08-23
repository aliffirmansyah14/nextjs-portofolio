import CategoryCard from "@/components/shared/dashboard/cards/category-card";
import ChartCard from "@/components/shared/dashboard/cards/category-chart-card";
import ChartPieCategory from "@/components/shared/dashboard/cards/category-pie-card";
import PortofolioCard from "@/components/shared/dashboard/cards/portofolio-card";
import SkeletonCard from "@/components/shared/dashboard/cards/skeleton-card";
import Header from "@/components/shared/dashboard/Header";
import { Card, CardContent } from "@/components/ui/card";
import { getCountCategoriesWithCountProjects } from "@/lib/api";
import { Suspense } from "react";

const DashboardPage = () => {
	const categoriesWithCount = getCountCategoriesWithCountProjects();
	return (
		<div
			className={`dashboard dashboard-active p-2 md:pl-2 md:pr-12`}
			id="dashboard-content"
		>
			<Header text="Dashboard" />
			<div className="md:px-2 mt-4 grid md:grid-cols-2 gap-4">
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
			<div className="md:px-2 mt-5">
				<Card>
					<CardContent>
						<h2 className="font-semibold text-lg ">Recent Updates</h2>
						<div className="overflow-x-auto">
							<table className="table-auto w-xl md:w-full">
								<tbody className="text-sm md:text-lg">
									<tr className="border border-r-0 border-l-0 border-secondary">
										<td className="px-1 py-2"> 123456 </td>
										<td className="px-1 py-2">portofolio</td>
										<td className="px-1 py-2">{new Date().toString()}</td>
									</tr>
									<tr className="border border-r-0 border-l-0 border-secondary">
										<td className="px-1 py-2"> 123456 </td>
										<td className="px-1 py-2">portofolio</td>
										<td className="px-1 py-2">{new Date().toString()}</td>
									</tr>
									<tr className="border border-r-0 border-l-0 border-secondary">
										<td className="px-1 py-2"> 123456 </td>
										<td className="px-1 py-2">portofolio</td>
										<td className="px-1 py-2">{new Date().toString()}</td>
									</tr>
								</tbody>
							</table>
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	);
};

export default DashboardPage;
