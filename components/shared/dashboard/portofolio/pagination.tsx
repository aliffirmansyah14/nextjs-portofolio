"use client";
import { Button } from "@/components/ui/button";
import { MAX_TAKE, MIN_TAKE } from "@/lib/constants";
import { createQueryString, getMinMax, getPagination } from "@/lib/utils";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import TakeSelect from "./take-select";
import SearchInput from "./search-input";

type PaginationTableProps = {
	limitData: number;
};

const PaginationTable = ({ limitData }: PaginationTableProps) => {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();
	const params = new URLSearchParams(searchParams.toString());
	const pageParam = Number(params.get("page")) || 1;
	const takeParam = getMinMax(
		Number(params.get("take")) || 4,
		MIN_TAKE,
		MAX_TAKE
	);

	const pagination = getPagination(limitData, pageParam, takeParam);

	const goTo = (to: number) => {
		router.push(
			`${pathname}?${createQueryString(params, to.toString(), "page")}`,
			{
				scroll: false,
			}
		);
	};

	return (
		<div className="flex items-center md:justify-between w-full gap-x-2">
			{/* <DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button variant="outline" className="rounded-xl">
						Take 4
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent>
					<DropdownMenuItem>5</DropdownMenuItem>
					<DropdownMenuItem>6</DropdownMenuItem>
					<DropdownMenuItem>7</DropdownMenuItem>
					<DropdownMenuItem>8</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu> */}
			<div className="w-fit order-2 md:order-1 max-md:ml-auto">
				<TakeSelect key={takeParam} take={takeParam} />
			</div>
			<div className="flex justify-center items-center order-1 md:order-2">
				{!pagination ? (
					<></>
				) : (
					pagination.map((page, i) => {
						const styleRounded =
							i === 0
								? "rounded-tl-xl rounded-bl-xl"
								: "rounded-tr-xl rounded-br-xl";
						if (typeof page === "string") {
							return (
								<Button key={i} variant={"outline"} disabled asChild>
									<div className="w-[10px]">...</div>
								</Button>
							);
						}
						return (
							<Button
								key={i}
								variant={"outline"}
								className={styleRounded}
								onClick={() => goTo(page)}
								disabled={page === pageParam}
							>
								{page}
							</Button>
						);
					})
				)}
			</div>
			<div className="order-3 ">
				<SearchInput />
			</div>
			{/* <TakeSelect take={takeParam} /> */}
		</div>
	);
};

export default PaginationTable;
