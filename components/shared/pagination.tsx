"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Button } from "../ui/button";
import { use } from "react";
import { OFFSET_DATA } from "@/lib/constants";
import { ArrowLeft, ArrowRight } from "lucide-react";

const Pagination = ({
	itemCount,
}: {
	itemCount: Promise<number | undefined>;
}) => {
	const totalData = use(itemCount);
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();
	const params = new URLSearchParams(searchParams.toString());
	const page = Number(params.get("page")) || 1;

	if (!totalData) return <></>;

	const limitPage = Math.ceil(totalData / OFFSET_DATA);

	if (limitPage < 2) return <></>;

	if (page > limitPage) return <GoBackButton />;

	const createQueryString = (to: number) => {
		params.set("page", to.toString());

		return params.toString();
	};

	const handleClickArrow = (arrow: "left" | "right") => {
		if (arrow === "right") {
			router.push(`${pathname}?${createQueryString(page + 1)}`, {
				scroll: false,
			});
			return;
		}
		router.push(`${pathname}?${createQueryString(page - 1)}`, {
			scroll: false,
		});
	};

	return (
		<div className="flex gap-1 items-center">
			{[1, 2].map(i => {
				const arrow = i === 2 ? "right" : "left";
				if (arrow === "right") {
					return (
						<Button
							key={i}
							variant="outline"
							className="rounded"
							disabled={page === limitPage}
							onClick={() => handleClickArrow(arrow)}
						>
							<ArrowRight />
						</Button>
					);
				} else {
					return (
						<Button
							key={i}
							variant="outline"
							className="rounded"
							disabled={page === 1}
							onClick={() => handleClickArrow(arrow)}
						>
							<ArrowLeft />
						</Button>
					);
				}
			})}
		</div>
	);
};

export default Pagination;

const GoBackButton = () => {
	const router = useRouter();
	const pathname = usePathname();
	console.log(pathname);
	return (
		<div className="mt-4 w-full flex justify-center items-center rounded">
			<Button
				variant={"ghost"}
				size={"sm"}
				className="rounded border-1"
				onClick={() => {
					router.push(`${pathname}?page=1`, {
						scroll: false,
					});
				}}
			>
				Go back
			</Button>
		</div>
	);
};
