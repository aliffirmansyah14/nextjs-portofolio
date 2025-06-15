import LogoutButton from "@/components/shared/logout-button";

const DashboardPage = async () => {
	return (
		<div className="min-h-screen w-full bg-background">
			<h1>dashboard page</h1>
			<LogoutButton />
		</div>
	);
};

export default DashboardPage;
