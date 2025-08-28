import { Badge } from "@/components/ui/badge";
import { formatDateToIndonesia, getMinMax } from "@/lib/utils";
import ActionButtonPortofolioTable from "@/components/shared/dashboard/portofolio/actions-button-portofolio";
import { getPortofolios } from "@/lib/api";
import { MAX_TAKE, MIN_TAKE } from "@/lib/constants";
import NotFoundButton from "./not-found-button";

type TablePortofolioProps = {
	page: number | string;
	take: number | string;
	search: string;
};

const TablePortofolio = async ({
	page,
	take,
	search,
}: TablePortofolioProps) => {
	const pageParam = Number(page) || 1;
	const takeParam = getMinMax(Number(take) || 4, MIN_TAKE, MAX_TAKE);
	const searchParam = search || "";

	const allPortofolios = await getPortofolios({
		customArgs: {
			take: takeParam,
			where: {
				OR: [
					{
						name: {
							contains: searchParam,
						},
					},
					{
						category: {
							name: {
								contains: searchParam,
							},
						},
					},
					{
						tech: {
							has: searchParam,
						},
					},
				],
			},
		},
		page: pageParam,
	});

	if (allPortofolios !== undefined && allPortofolios.length > 0) {
		const columns = Object.keys(allPortofolios[0]).map(
			col => col.toLowerCase().split("url")[0]
		);
		columns.shift();
		return (
			<div className="min-w-2xl h-auto md:h-[280px]">
				<table className="w-full mt-4">
					<thead>
						<tr>
							{columns.map((col, i) => {
								const styleText = i === 0 ? "text-left" : "text-center";
								return (
									<th
										key={i}
										className={`${styleText} capitalize text-sm md:text-base`}
									>
										{col}
									</th>
								);
							})}
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
									<p className="capitalize text-sm lg:text-base font-normal leading-none w-[120px] md:w-fit">
										{portofolio.name}
									</p>
								</td>
								<td className="px-1 py-2 ">
									<p className="capitalize text-sm lg:text-base font-normal leading-none">
										{portofolio.category.name}
									</p>
								</td>
								<td className="px-1 py-2 w-[120px] md:w-fit">
									<p className="capitalize text-xs lg:text-base font-normal leading-none">
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
										<span className="max-md:block md:hidden ">
											{formatDateToIndonesia(portofolio.createdAt, {
												dateStyle: "short",
											})}
										</span>
										<span className="max-md:hidden md:block">
											{formatDateToIndonesia(portofolio.createdAt, {
												dateStyle: "medium",
											})}
										</span>
									</p>
								</td>
								<td className="px-1 py-2 flex items-center gap-2">
									<ActionButtonPortofolioTable portofolio={portofolio} />
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		);
	}
	return (
		<div className="min-w-2xl h-auto md:h-[280px] grid place-content-center">
			<NotFoundButton />
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
						left: `-${url.length + 20}px`,
					}}
				>
					<a
						href={url}
						target="_blank"
						className="hover:text-blue-600 hover:underline"
					>
						{url}
					</a>
				</div>
			)}
		</>
	);
};
