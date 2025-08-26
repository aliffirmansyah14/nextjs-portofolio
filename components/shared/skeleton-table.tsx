type SkeletonTableProps = {
	row?: number;
	col?: number;
};

const SkeletonTable = ({ row = 3, col = 4 }: SkeletonTableProps) => {
	const cols = Array.from({ length: col });
	const rows = Array.from({ length: row });

	return (
		<table className="w-full">
			<thead>
				<tr>
					{cols.map((_, i) => {
						if (i == 0) {
							return (
								<td key={i} style={{ width: `10%` }} className="px-1 py-2">
									<div className=" h-4 bg-secondary rounded-2xl animate-pulse"></div>
								</td>
							);
						}
						return (
							<td key={i} className="px-1 py-2 ">
								<div className=" h-4 bg-secondary rounded-2xl animate-pulse"></div>
							</td>
						);
					})}
				</tr>
			</thead>
			<tbody>
				{rows.map((_, i) => (
					<tr key={i} className="border border-r-0 border-l-0 border-secondary">
						{cols.map((_, c) => (
							<td key={c} className="px-1 py-2">
								<div className="h-4 bg-secondary rounded-2xl animate-pulse"></div>
							</td>
						))}
					</tr>
				))}
			</tbody>
		</table>
	);
};

export default SkeletonTable;
