import Breadcrumbs from "@/components/shared/dashboard/Breadcrumbs";
import FormAddPortofolio from "@/components/shared/dashboard/portofolio/form-add-portofolio";
import { SidebarTrigger } from "@/components/shared/dashboard/Sidebar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getCategories } from "@/lib/api";
import { prisma } from "@/lib/prisma";
import { PencilIcon, Plus, Trash2 } from "lucide-react";
import { Suspense } from "react";
const PortofolioPage = async () => {
	const portofolios = await prisma.project.findMany({
		select: {
			name: true,
			category: {
				select: {
					name: true,
				},
			},
			tech: true,
			imageUrl: true,
			redirectUrl: true,
			createdAt: true,
		},
	});
	const cols = Object.keys(portofolios[0]);

	const categories = getCategories();
	return (
		<div className="p-2 md:pl-2 md:pr-12">
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
				<table className="w-full mt-4">
					<thead>
						<tr>
							{cols.map(col => (
								<th key={col} className="capitalize">
									{col}
								</th>
							))}
							<th>Action</th>
						</tr>
					</thead>
					<tbody>
						{portofolios.map(portofolio => (
							<tr
								key={portofolio.name}
								className="border border-r-0 border-l-0 border-secondary"
							>
								<td className="mt-1 px-1 py-2 ">
									<p className="capitalize text-sm font-normal leading-none">
										{portofolio.name}
									</p>
								</td>
								<td className="px-1 py-2 ">
									<p className="capitalize text-sm font-normal leading-none">
										{portofolio.category.name}
									</p>
								</td>
								<td className="px-1 py-2 ">
									<p className="capitalize text-sm font-normal leading-none">
										{portofolio.tech.join(", ")}
									</p>
								</td>
								<td className="px-1 py-2 relative group/image">
									<p className=" text-sm font-normal leading-none">
										{portofolio.imageUrl ? (
											<Badge variant={"default"} className="rounded-full">
												true
											</Badge>
										) : (
											<Badge variant={"destructive"} className="rounded-full">
												false
											</Badge>
										)}
									</p>
									{portofolio.imageUrl && (
										<div
											className="hidden group-hover/image:block absolute -top-10 text-xs bg-secondary px-3 py-2 rounded-2xl"
											style={{
												left: `-${portofolio.imageUrl.length}px`,
											}}
										>
											<a
												href={portofolio.imageUrl}
												target="_blank"
												className="block hover:text-blue-600 hover:underlin"
											>
												{portofolio.imageUrl}
											</a>
										</div>
									)}
								</td>
								<td className="relative px-1 py-2 group/redirect">
									<p className="text-sm font-normal leading-none ">
										{portofolio.redirectUrl ? (
											<Badge variant={"default"} className="rounded-full">
												true
											</Badge>
										) : (
											<Badge variant={"destructive"} className="rounded-full">
												false
											</Badge>
										)}
									</p>
									{portofolio.redirectUrl && (
										<div
											className="hidden group-hover/redirect:block absolute -top-10 text-xs bg-secondary px-3 py-2 rounded-2xl"
											style={{
												left: `-${portofolio.redirectUrl.length}px`,
											}}
										>
											<a
												href={portofolio.redirectUrl}
												target="_blank"
												className="block hover:text-blue-600 hover:underline"
											>
												{portofolio.redirectUrl}
											</a>
										</div>
									)}
								</td>
								<td className="px-1 py-2 ">
									<p className=" text-sm font-normal leading-none">
										{new Date(portofolio.createdAt).toISOString().split("T")[0]}
									</p>
								</td>
								<td className="px-1 py-2 flex items-center gap-2 	">
									<PencilIcon />
									<Trash2 />
								</td>
							</tr>
						))}
						{/* {Array.from({ length: 6 }).map((_, i) => (
							<tr
								key={i}
								className="border border-r-0 border-l-0 border-secondary"
							>
								<td className="px-1 py-2 "> 123456 </td>
								<td className="px-1 py-2 ">portofolio</td>
								<td className="px-1 py-2 w-fit">{new Date().toString()}</td>
								<td className="px-1 py-2 flex items-center gap-2 w-fit	">
									<PencilIcon />
									<Trash2 />
								</td>
							</tr>
						))} */}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default PortofolioPage;
