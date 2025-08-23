import {
	Card,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { getCountCategoriesWithCountProjects } from "@/lib/api";
import { ArrowUpRight } from "lucide-react";
import ErrorCard from "./error-card";

const CategoryCard = async () => {
	const categoriesWithCount = await getCountCategoriesWithCountProjects();

	if (categoriesWithCount === undefined) {
		return <ErrorCard />;
	}

	return (
		<Card>
			<CardHeader>
				<CardDescription>Total Kategori</CardDescription>
				<CardTitle className="text-3xl">
					{categoriesWithCount?.length}
				</CardTitle>
			</CardHeader>
			<CardFooter className="flex-col items-start">
				<div className="line-clamp-1 flex gap-2 font-medium">
					{categoriesWithCount && (
						<>
							Kategori{" "}
							{`${
								categoriesWithCount[0].name
							} ${categoriesWithCount[0]._count.projects.toString()}`}{" "}
							project
							<ArrowUpRight />
						</>
					)}
				</div>
				<div className="text-muted-foreground">Trending up this month</div>
			</CardFooter>
		</Card>
	);
};

export default CategoryCard;
