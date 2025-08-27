import Breadcrumbs from "@/components/shared/dashboard/Breadcrumbs";
import FormAddPortofolio from "@/components/shared/dashboard/portofolio/form-add-portofolio";
import FormDeletePortofolio from "@/components/shared/dashboard/portofolio/form-delete-portofolio";
import FormEditPortofolio from "@/components/shared/dashboard/portofolio/form-edit-portofolio";
import SiderbarTriggerMobile from "@/components/shared/dashboard/sidebar/sidebar-trigger-mobile";
import SkeletonTable from "@/components/shared/skeleton-table";
import TablePortofolio from "@/components/shared/table-portofolio";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardAction,
	CardContent,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { getCategories, getPortofolios } from "@/lib/api";
import { Plus } from "lucide-react";
import { Suspense } from "react";

const PortofolioPage = async ({
	searchParams,
}: {
	searchParams: Promise<{ page?: string }>;
}) => {
	const { page = "1" } = await searchParams;
	const portofolios = getPortofolios({
		customArgs: { take: 4 },
		page: Number(page),
	});
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
				<Card>
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
					<CardContent className="overflow-x-auto border-t py-2 lg:scroll-h-sm lg:scroll-track-dark">
						<Suspense fallback={<SkeletonTable row={4} col={6} />}>
							<TablePortofolio portofolios={portofolios} />
						</Suspense>
					</CardContent>
					{/* <div className="mt-4 overflow-x-auto scroll-h-sm scroll-track-dark"></div> */}
				</Card>
			</div>
			<FormEditPortofolio categories={categories} />
			<FormDeletePortofolio />
		</div>
	);
};

export default PortofolioPage;
