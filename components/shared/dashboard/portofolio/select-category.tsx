"use client";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
const SelectCategory = ({
	categories,
	defaultValue,
}: {
	categories: { id: string; name: string }[];
	defaultValue?: string | undefined;
}) => {
	return (
		<Select name="category" defaultValue={defaultValue}>
			<SelectTrigger className="w-full">
				<SelectValue placeholder="Select a category" />
			</SelectTrigger>
			<SelectContent>
				<SelectGroup id="category-option">
					<SelectLabel>Category</SelectLabel>
					{categories.map(category => (
						<SelectItem key={category.id} value={category.id}>
							{category.name}
						</SelectItem>
					))}
				</SelectGroup>
			</SelectContent>
		</Select>
	);
};

export default SelectCategory;
