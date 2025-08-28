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

const TakeSelect = ({ take }: { take: number }) => {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();
	const params = new URLSearchParams(searchParams.toString());

	const handleOnChangeSelect = (selected: string) => {
		const value = getMinMax(Number(selected), MIN_TAKE, MAX_TAKE);

		router.push(
			`${pathname}?${createQueryString(params, value.toString(), "take")}`,
			{
				scroll: false,
			}
		);
	};
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
