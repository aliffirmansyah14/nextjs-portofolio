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
import { MAX_TAKE, MIN_TAKE } from "@/lib/constants";
import { createQueryString, getMinMax } from "@/lib/utils";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

const TakeSelect = () => {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();
	const params = new URLSearchParams(searchParams.toString());
	const take = getMinMax(Number(params.get("take")) || 4, MIN_TAKE, MAX_TAKE);

	const handleOnChangeSelect = useCallback(
		(selected: string) => {
			const value = Number(selected);

			router.push(
				`${pathname}?${createQueryString(params, value.toString(), "take")}`,
				{
					scroll: false,
				}
			);
		},
		[searchParams]
	);
	return (
		<Select
			onValueChange={value => handleOnChangeSelect(value)}
			defaultValue={take.toString()}
		>
			<SelectTrigger className="w-[60px] md:w-[70px] rounded-xl">
				<SelectValue placeholder="Show data 4" />
			</SelectTrigger>
			<SelectContent>
				<SelectGroup>
					<SelectLabel>Show data </SelectLabel>
					{Array.from({ length: MAX_TAKE - 3 }).map((_, i) => (
						<SelectItem key={i} value={(i + 1 + 3).toString()}>
							{i + 1 + 3}
						</SelectItem>
					))}
				</SelectGroup>
			</SelectContent>
		</Select>
	);
};
export default TakeSelect;
