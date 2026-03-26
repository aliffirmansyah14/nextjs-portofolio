import {
	Card,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { getCountPortofolios } from "@/lib/api";
import { ArrowUpRight } from "lucide-react";
import ErrorCard from "./error-card";

const PortofolioCard = async () => {
	const countProjects = await getCountPortofolios();
	if (countProjects === undefined) {
		return <ErrorCard />;
	}
	return (
		<Card>
			<CardHeader>
				<CardDescription>Total Project</CardDescription>
				<CardTitle className="text-3xl">{countProjects}</CardTitle>
			</CardHeader>
			<CardFooter className="flex-col items-start">
				<div className="line-clamp-1 flex gap-2 font-medium">
					Steady performance increase
					<ArrowUpRight />
				</div>
				<div className="text-muted-foreground">Meets growth projections</div>
			</CardFooter>
		</Card>
	);
};

export default PortofolioCard;
