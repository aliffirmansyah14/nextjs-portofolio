import { Badge } from "@/components/ui/badge";
import { Prisma } from "@prisma/client";

export type CategoriesType = Prisma.CategoryGetPayload<{
	select: {
		name: true;
	};
}>;

type TabsProps = {
	categories: CategoriesType[];
	onClick: (category: CategoriesType["name"]) => void;
	isActive: CategoriesType["name"];
};

const Tabs = ({ categories, onClick, isActive }: TabsProps) => {
	// categories.unshift({ name: "all" });
	return (
		<div className="flex items-center gap-2 mt-7 flex-nowrap overflow-x-auto">
			{categories.map((category, i) => {
				return (
					<div
						key={i}
						onClick={() => onClick(category.name)}
						className="cursor-pointer"
					>
						<Badge
							variant={isActive === category.name ? "default" : "outline"}
							className="rounded-2xl px-2 py-1 capitalize"
						>
							{category.name}
						</Badge>
					</div>
				);
			})}
		</div>
	);
};

export default Tabs;
