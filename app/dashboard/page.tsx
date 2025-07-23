import Header from "@/components/shared/dashboard/Header";

const DashboardPage = () => {
	return (
		<div className="container p-2 md:pl-2 md:pr-12">
			<Header text="Dashboard" />
			<div className="md:px-2 mt-4 grid grid-cols-3 gap-4">
				<div className="h-[100px] bg-primary rounded-2xl px-4 py-2">
					<p className="font-semibold md:text-lg">Total Portofolio </p>
					<p>40</p>
				</div>
				<div className="h-[100px] bg-primary rounded-2xl px-4 py-2">
					<p className="font-semibold md:text-lg">Total Portofolio </p>
					<p>40</p>
				</div>
				<div className="h-[100px] bg-primary rounded-2xl px-4 py-2">
					<p className="font-semibold md:text-lg">Total Portofolio </p>
					<p>40</p>
				</div>
			</div>
			<div className="md:px-2 mt-5">
				<h2 className="font-semibold text-lg ">Recent Updates</h2>
				<table className="w-full">
					<tbody>
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
		</div>
	);
};

export default DashboardPage;
