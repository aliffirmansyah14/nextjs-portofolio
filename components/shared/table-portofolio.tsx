"use client";
import { Prisma } from "@prisma/client";
import { PencilIcon, Trash2 } from "lucide-react";
import { Badge } from "../ui/badge";
import { use } from "react";
import { selectedRowProjects } from "@/lib/schema";
import { useActionPortofolio } from "@/store/action-portofolio";

export type portofoliosType = Prisma.ProjectGetPayload<{
	select: typeof selectedRowProjects;
}>;

type TablePortofolioProps = {
	portofolios: Promise<portofoliosType[] | undefined>;
};

const TablePortofolio = ({ portofolios }: TablePortofolioProps) => {
	const { setActionPortofolio, setActionIdPortofolio } = useActionPortofolio();
	const allPortofolios = use(portofolios);

	const handleClickEditButton = (portofolio: portofoliosType) => {
		setActionPortofolio(portofolio);
		setActionIdPortofolio(portofolio.id);
		document.getElementById("trigger-edit-portofolio")?.click();
	};
	const handleClickDeleteButton = (id: string) => {
		setActionIdPortofolio(id);
		document.getElementById("trigger-delete-portofolio")?.click();
	};

	if (allPortofolios !== undefined && allPortofolios.length > 0) {
		const columns = Object.keys(allPortofolios[0]);
		columns.shift();
		return (
			<div className="min-w-2xl">
				<table className="w-full mt-4">
					<thead>
						<tr>
							{columns.map(col => (
								<th
									key={col}
									className="text-left capitalize text-sm md:text-base"
								>
									{col}
								</th>
							))}
							<th>Action</th>
						</tr>
					</thead>
					<tbody>
						{allPortofolios.map(portofolio => (
							<tr
								key={portofolio.name}
								className="border border-r-0 border-l-0 border-secondary t"
							>
								<td className="mt-1 px-1 py-2 ">
									<p className="capitalize text-sm sm:text-base font-normal leading-none w-[120px] md:w-fit">
										{portofolio.name}
									</p>
								</td>
								<td className="px-1 py-2 ">
									<p className="capitalize text-sm sm:text-base font-normal leading-none">
										{portofolio.category.name}
									</p>
								</td>
								<td className="px-1 py-2 w-[120px] md:w-fit">
									<p className="capitalize text-xs sm:text-base font-normal leading-none">
										{portofolio.tech.join(", ")}
									</p>
								</td>
								<td className="px-1 py-2 relative group/redirect">
									<UrlRender url={portofolio.imageUrl} />
								</td>
								<td className="relative px-1 py-2 group/redirect">
									<UrlRender url={portofolio.redirectUrl} />
								</td>
								<td className="px-1 py-2 ">
									<p className=" text-sm sm:text-base font-normal leading-none">
										{new Date(portofolio.createdAt).toISOString().split("T")[0]}
									</p>
								</td>
								<td className="px-1 py-2 flex items-center gap-2">
									<button
										className="rounded-full p-2 hover:bg-secondary"
										onClick={e => {
											e.preventDefault();
											handleClickEditButton(portofolio);
										}}
									>
										<PencilIcon />
									</button>

									<button
										className="rounded-full p-2 hover:bg-secondary"
										onClick={e => {
											e.preventDefault();
											handleClickDeleteButton(portofolio.id);
										}}
									>
										<Trash2 />
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		);
	}
	return (
		<div className="text-center">
			<p>Nothing here</p>
		</div>
	);
};

export default TablePortofolio;

const UrlRender = ({ url }: { url?: string | null }) => {
	return (
		<>
			<p className="text-sm sm:text-base font-normal leading-none ">
				{url ? (
					<Badge variant={"default"} className="rounded-full">
						true
					</Badge>
				) : (
					<Badge variant={"destructive"} className="rounded-full">
						false
					</Badge>
				)}
			</p>
			{url && (
				<div
					className={`hidden group-hover/redirect:block absolute -top-10 text-xs bg-secondary px-3 py-2 rounded-2xl`}
					style={{
						left: `-${url.length}px`,
					}}
				>
					<a
						href={url}
						target="_blank"
						className="block hover:text-blue-600 hover:underline"
					>
						{url}
					</a>
				</div>
			)}
		</>
	);
};
