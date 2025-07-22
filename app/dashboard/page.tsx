import { SidebarTrigger } from "@/components/shared/dashboard/Sidebar";

const DashboardPage = () => {
	return (
		<div className="container p-2 md:pl-2 md:pr-12">
			<header className="flex gap-1">
				<SidebarTrigger />
				<h1 className="text-2xl font-semibold">Dashboard</h1>
			</header>
			<div className="mt-4 grid grid-cols-3 gap-4">
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
			<div className="mt-5">
				<h2 className="font-semibold text-lg">Recent Updates</h2>
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
