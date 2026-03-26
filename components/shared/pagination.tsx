"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Button } from "../ui/button";
import { use } from "react";
import { OFFSET_DATA } from "@/lib/constants";
import { ArrowLeft, ArrowRight } from "lucide-react";

const Pagination = ({
	itemCount,
	onNext,
	onBack,
	page,
}: {
	onNext: () => void;
	onBack: () => void;
	itemCount: Promise<number | undefined>;
	page: number;
}) => {
	const totalData = use(itemCount);
	if (!totalData) return <></>;

	const limitPage = Math.ceil(totalData / OFFSET_DATA);

	if (limitPage < 2) return <></>;

	if (page > limitPage) return <></>;

	const handleClickArrow = (arrow: "left" | "right") => {
		if (arrow === "right") {
			onNext();
			return;
		}
		onBack();
	};

	return (
		<div className="flex gap-1 items-center">
			{[1, 2].map(i => {
				const arrow = i === 2 ? "right" : "left";
				if (arrow === "right") {
					return (
						<Button
							key={i}
							aria-label="next-button"
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
							aria-label="back-button"
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
