import Breadcrumbs from "@/components/shared/dashboard/Breadcrumbs";
import FormAddPortofolio from "@/components/shared/dashboard/portofolio/form-add-portofolio";
import FormDeletePortofolio from "@/components/shared/dashboard/portofolio/form-delete-portofolio";
import FormEditPortofolio from "@/components/shared/dashboard/portofolio/form-edit-portofolio";
import SiderbarTriggerMobile from "@/components/shared/dashboard/sidebar/sidebar-trigger-mobile";
import SkeletonTable from "@/components/shared/skeleton-table";

import { Button } from "@/components/ui/button";
import {
	Card,
	CardAction,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { getCategories, getCountPortofolios, getPortofolios } from "@/lib/api";
import { Plus } from "lucide-react";
import { Suspense } from "react";
import PaginationTable from "@/components/shared/dashboard/portofolio/pagination";
import TablePortofolio from "@/components/shared/dashboard/portofolio/table-portofolio";

const PortofolioPage = async ({
	searchParams,
}: {
	searchParams: Promise<{ page?: string; take?: string; search?: string }>;
}) => {
	const { page = "1", take = "4", search = "" } = await searchParams;

	const totalDataPortofolios = await getCountPortofolios(search);

	const categories = getCategories();

	return (
		<div className="px-4" id="dashboard-content">
			<header className="flex items-center">
				<SiderbarTriggerMobile />
				<Breadcrumbs
					list={[
						{ href: "/dashboard", label: "dashboard" },
						{ href: "/dashboard/portofolio", label: "portofolio" },
					]}
				/>
			</header>
			<div className="mt-4 sm:px-2 md:px-0">
				<Card className="gap-4 overflow-hidden">
					<CardHeader>
						<CardTitle>
							<h2 className=" text-3xl font-semibold">Portofolios</h2>
						</CardTitle>
						<CardAction>
							<Suspense
								fallback={
									<Button disabled variant="outline" className="rounded-xl">
										Add <Plus />
									</Button>
								}
							>
								<FormAddPortofolio categories={categories} />
							</Suspense>
						</CardAction>
					</CardHeader>
					<CardContent className="overflow-auto border-t py-2 lg:scroll-w-sm lg:scroll-h-sm lg:scroll-track-dark">
						<Suspense fallback={<SkeletonTable row={4} col={6} />}>
							<TablePortofolio page={page} take={take} search={search} />
						</Suspense>
					</CardContent>
					{/* <div className="mt-4 overflow-x-auto scroll-h-sm scroll-track-dark"></div> */}
					<CardFooter>
						<PaginationTable limitData={totalDataPortofolios || 0} />
					</CardFooter>
				</Card>
			</div>
			<FormEditPortofolio categories={categories} />
			<FormDeletePortofolio />
		</div>
	);
};

export default PortofolioPage;
