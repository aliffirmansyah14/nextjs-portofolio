import Breadcrumbs from "@/components/shared/dashboard/Breadcrumbs";
import FormAddPortofolio from "@/components/shared/dashboard/portofolio/form-add-portofolio";
import { SidebarTrigger } from "@/components/shared/dashboard/Sidebar";
import { PencilIcon, Trash2 } from "lucide-react";
const PortofolioPage = () => {
	return (
		<div className="container p-2 md:pl-2 md:pr-12">
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
					<FormAddPortofolio />
				</div>
				<table className="w-full mt-4">
					<tbody>
						{Array.from({ length: 6 }).map((_, i) => (
							<tr
								key={i}
								className="border border-r-0 border-l-0 border-secondary"
							>
								<td className="px-1 py-2 w-fit"> 123456 </td>
								<td className="px-1 py-2 w-fit">portofolio</td>
								<td className="px-1 py-2 w-fit">{new Date().toString()}</td>
								<td className="px-1 py-2 flex items-center gap-2 w-fit	">
									<PencilIcon />
									<Trash2 />
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default PortofolioPage;
