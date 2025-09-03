"use client";
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
} from "@/components/ui/form";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { createPortofolioFormType } from "@/lib/schema";
import { useFormContext } from "react-hook-form";
const SelectCategory = ({
	categories,
}: {
	categories: { id: string; name: string }[];
}) => {
	const form = useFormContext<createPortofolioFormType>();
	return (
		<FormField
			control={form.control}
			name="category"
			render={({ field }) => (
				<FormItem>
					<FormLabel>Category</FormLabel>
					<Select onValueChange={field.onChange} value={field.value}>
						<FormControl>
							<SelectTrigger className="w-full">
								<SelectValue placeholder="Select a category" />
							</SelectTrigger>
						</FormControl>
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
				</FormItem>
			)}
		/>
	);
};

export default SelectCategory;
