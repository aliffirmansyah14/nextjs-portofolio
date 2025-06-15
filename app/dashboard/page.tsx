import { auth } from "@/auth";
import LogoutButton from "@/components/shared/logout-button";

const DashboardPage = async () => {
	const session = await auth();

	return (
		<div className="min-h-screen w-full bg-background">
			<h1>dashboard page {session?.user.name}</h1>
			<LogoutButton />
		</div>
	);
};

export default DashboardPage;
