"use client";
import { Pie, PieChart } from "recharts";

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from "@/components/ui/chart";
import { ChartCardProps } from "./category-chart-card";
import { use } from "react";

export const description = "A simple pie chart";

// const chartConfig = {
// 	visitors: {
// 		label: "Visitors",
// 	},
// 	chrome: {
// 		label: "Chrome",
// 		color: "var(--chart-1)",
// 	},
// } satisfies ChartConfig;

const ChartPieCategory = ({ fetchCategory }: ChartCardProps) => {
	const countCategoriesWithCount = use(fetchCategory);
	const chartData = countCategoriesWithCount?.map(data => {
		return {
			category: data.name,
			total: data._count.projects,
			fill: `var(--color-${data.name.replace(/\s+/g, "")})`,
			// fill: "var(--color-htmlcss)",
		};
	});
	let chartConfig: ChartConfig = {
		total: {
			label: "Total",
		},
	};

	countCategoriesWithCount?.forEach((data, i) => {
		chartConfig = {
			...chartConfig,
			[data.name.replace(/\s+/g, "")]: {
				//ilangin sapasi
				label: data.name,
				color: `var(--chart-${i + 1})`,
			},
		};
	});

	return (
		<Card className="flex flex-col">
			<CardHeader className="items-center pb-0">
				<CardTitle>Kategori Chart</CardTitle>
				<CardDescription>January - desember 2025</CardDescription>
			</CardHeader>
			<CardContent className="flex-1 pb-0">
				<ChartContainer
					config={chartConfig}
					className="mx-auto aspect-square max-h-[250px]"
				>
					<PieChart>
						<ChartTooltip
							cursor={false}
							content={<ChartTooltipContent hideLabel />}
						/>
						<Pie data={chartData} dataKey="total" nameKey="category" />
					</PieChart>
				</ChartContainer>
			</CardContent>
		</Card>
	);
};

export default ChartPieCategory;
