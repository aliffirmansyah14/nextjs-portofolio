import { Card, CardContent } from "@/components/ui/card";
import { getPortofolios } from "@/lib/api";
import { formatDateToIndonesia } from "@/lib/utils";

const InfoTable = async () => {
	const portofolios = await getPortofolios({
		customArgs: {
			select: {
				name: true,

				category: {
					select: {
						name: true,
					},
				},
				createdAt: true,
			},
			take: 6,
			orderBy: {
				createdAt: "asc",
			},
		},
	});

	return (
		<Card>
			<CardContent>
				<h2 className="font-semibold text-lg ">Recent Updates</h2>
				<div className="overflow-x-auto">
					<table className="table-auto w-full">
						<tbody className="text-sm md:text-lg">
							{portofolios?.map(portofolio => (
								<tr
									className="border border-r-0 border-l-0 border-secondary"
									key={portofolio.name}
								>
									<td className="px-1 py-2"> {portofolio.name} </td>

									<td className="px-1 py-2">{portofolio.category.name}</td>
									<td className="px-1 py-2">
										{formatDateToIndonesia(portofolio.createdAt)}
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</CardContent>
		</Card>
	);
};
export default InfoTable;
