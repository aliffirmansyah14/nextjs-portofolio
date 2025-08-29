import SkeletonTable from "@/components/shared/skeleton-table";

import {
	Card,
	CardAction,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { getCountPortofolios } from "@/lib/api";

import { Suspense } from "react";
import PaginationTable from "@/components/shared/dashboard/portofolio/pagination";
import TablePortofolio from "@/components/shared/dashboard/portofolio/table-portofolio";
import ButtonAddPortofolio from "@/components/shared/dashboard/portofolio/button-add-portofolio";
import SearchInput from "@/components/shared/dashboard/portofolio/search-input";
import { getMinMax } from "@/lib/utils";
import { MAX_TAKE, MIN_TAKE } from "@/lib/constants";
import TakeSelect from "@/components/shared/dashboard/portofolio/take-select";

const PortofolioPage = async ({
	searchParams,
}: {
	searchParams: Promise<{ page?: string; take?: string; search?: string }>;
}) => {
	const { page = "1", take = "4", search = "" } = await searchParams;
	const takeParam = getMinMax(Number(take), MIN_TAKE, MAX_TAKE);

	const totalDataPortofolios = await getCountPortofolios(search);

	return (
		<Card className="gap-4 overflow-hidden">
			<CardHeader>
				<CardTitle>
					<h2 className=" text-3xl font-semibold">Portofolios</h2>
				</CardTitle>
				<CardAction>
					<ButtonAddPortofolio />
				</CardAction>
			</CardHeader>
			<CardContent className="overflow-auto border-t py-2 lg:scroll-w-sm lg:scroll-h-sm lg:scroll-track-dark">
				<Suspense
					key={`${page}_${take}_${search}`}
					fallback={<SkeletonTable row={4} col={6} />}
				>
					<TablePortofolio page={page} take={takeParam} search={search} />
				</Suspense>
			</CardContent>
			{/* <div className="mt-4 overflow-x-auto scroll-h-sm scroll-track-dark"></div> */}
			<CardFooter className="flex items-center md:justify-between w-full gap-x-2">
				<div className="order-2 ml-auto md:ml-0 md:order-1">
					<TakeSelect />
				</div>
				<div className=" md:ms-0 order-1 md:order-2">
					<PaginationTable limitData={totalDataPortofolios || 0} />
				</div>
				<div className="order-3">
					<SearchInput key={search} />
				</div>
			</CardFooter>
		</Card>
	);
};

export default PortofolioPage;
