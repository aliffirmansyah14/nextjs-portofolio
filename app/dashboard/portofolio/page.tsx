import Breadcrumbs from "@/components/shared/dashboard/Breadcrumbs";
import FormAddPortofolio from "@/components/shared/dashboard/portofolio/form-add-portofolio";
import FormDeletePortofolio from "@/components/shared/dashboard/portofolio/form-delete-portofolio";
import FormEditPortofolio from "@/components/shared/dashboard/portofolio/form-edit-portofolio";
import { SidebarTrigger } from "@/components/shared/dashboard/Sidebar";
import TablePortofolio from "@/components/shared/table-portofolio";
import { Button } from "@/components/ui/button";
import { getCategories, getPortofolios } from "@/lib/api";
import { Plus } from "lucide-react";
import { Suspense } from "react";

const PortofolioPage = () => {
	const portofolios = getPortofolios();
	const categories = getCategories();

	return (
		<div className="p-4">
			<header className="flex items-center">
				<SidebarTrigger />
				<Breadcrumbs
					list={[
						{ href: "/dashboard", label: "dashboard" },
						{ href: "/dashboard/portofolio", label: "portofolio" },
					]}
				/>
			</header>
			<div className="mt-4 px-2">
				<div className="flex justify-between items-center">
					<h2 className=" text-3xl font-semibold">Portofolios</h2>
					<Suspense
						fallback={
							<Button disabled variant="outline" className="rounded-xl">
								Add <Plus />
							</Button>
						}
					>
						<FormAddPortofolio categories={categories} />
					</Suspense>
				</div>
				<div className="mt-4 overflow-x-auto scroll-h-sm scroll-track-dark">
					<Suspense fallback={<TablePortofolioSkeleton />}>
						<div className="min-w-2xl ">
							<TablePortofolio portofolios={portofolios} />
						</div>
					</Suspense>
				</div>
			</div>
			<FormEditPortofolio categories={categories} />
			<FormDeletePortofolio />
		</div>
	);
};

export default PortofolioPage;

const TablePortofolioSkeleton = () => {
	return (
		<table className="w-full">
			<thead>
				<tr>
					<td className="px-1 py-2 w-[10%] ">
						<div className=" h-4 bg-secondary rounded-2xl animate-pulse"></div>
					</td>
					<td className="px-1 py-2 w-[10%] ">
						<div className=" h-4 bg-secondary rounded-2xl animate-pulse "></div>
					</td>
					<td className="px-1 py-2 w-[15%] ">
						<div className=" h-4 bg-secondary rounded-2xl animate-pulse"></div>
					</td>
					<td className="px-1 py-2 w-[10%]">
						<div className=" h-4 bg-secondary rounded-2xl animate-pulse"></div>
					</td>
					<td className="px-1 py-2 w-[20%]">
						<div className=" h-4 bg-secondary rounded-2xl animate-pulse"></div>
					</td>
					<td className="px-1 py-2 w-[15%]">
						<div className=" h-4 bg-secondary rounded-2xl animate-pulse"></div>
					</td>
					<td className="px-1 py-2 w-[10%]">
						<div className=" h-4 bg-secondary rounded-2xl animate-pulse"></div>
					</td>
				</tr>
			</thead>
			<tbody>
				{Array.from({ length: 5 }).map((_, i) => (
					<tr key={i} className="border border-r-0 border-l-0 border-secondary">
						<td className="px-1 py-2">
							<div className="h-4 bg-secondary rounded-2xl animate-pulse"></div>
						</td>
						<td className="px-1 py-2 ">
							<div className="h-4 bg-secondary rounded-2xl animate-pulse"></div>
						</td>
						<td className="px-1 py-2">
							<div className="h-4 bg-secondary rounded-2xl animate-pulse"></div>
						</td>
						<td className="px-1 py-2">
							<div className="h-4 bg-secondary rounded-2xl animate-pulse"></div>
						</td>
						<td className="px-1 py-2">
							<div className="h-4 bg-secondary rounded-2xl animate-pulse"></div>
						</td>
						<td className="px-1 py-2">
							<div className="h-4 bg-secondary rounded-2xl animate-pulse"></div>
						</td>
						<td className="px-1 py-2">
							<div className="h-4 bg-secondary rounded-2xl animate-pulse"></div>
						</td>
					</tr>
				))}
			</tbody>
		</table>
	);
};
