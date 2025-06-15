import { Badge } from "@/components/ui/badge";

export type CategoryType = "reactjs" | "html css" | "laravel" | "all";

type TabsProps = {
	categories: Array<CategoryType>;
	onClick: (category: CategoryType) => void;
	isActive: CategoryType;
};

const Tabs = ({ categories, onClick, isActive }: TabsProps) => {
	return (
		<div className="flex items-center gap-2 mt-7 flex-nowrap overflow-x-auto">
			{categories.map((category, i) => {
				return (
					<div
						key={i}
						onClick={() => onClick(category)}
						className="cursor-pointer"
					>
						<Badge
							variant={isActive === category ? "default" : "outline"}
							className="rounded-2xl px-2 py-1 capitalize"
						>
							{category}
						</Badge>
					</div>
				);
			})}
		</div>
	);
};

export default Tabs;
