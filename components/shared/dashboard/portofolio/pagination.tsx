"use client";
import { Button } from "@/components/ui/button";
import { MAX_TAKE, MIN_TAKE } from "@/lib/constants";
import { createQueryString, getMinMax, getPagination } from "@/lib/utils";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { use } from "react";

type PaginationTableProps = {
	limitData: Promise<number | undefined>;
};

const PaginationTable = ({ limitData }: PaginationTableProps) => {
	const totalData = use(limitData);
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

	const pagination = getPagination(totalData || 0, pageParam, takeParam);

	const goTo = (to: number) => {
		router.push(
			`${pathname}?${createQueryString(params, to.toString(), "page")}`,
			{
				scroll: false,
			}
		);
	};

	return (
		<div className="flex justify-center items-center">
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
	);
};

export default PaginationTable;
