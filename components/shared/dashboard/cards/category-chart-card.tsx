"use client";

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import {
	ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from "@/components/ui/chart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { use } from "react";

// const chartData = [
// 	{ month: "January", desktop: 186, mobile: 80 },
// 	{ month: "February", desktop: 305, mobile: 200 },
// 	{ month: "March", desktop: 237, mobile: 120 },
// 	{ month: "April", desktop: 73, mobile: 190 },
// 	{ month: "May", desktop: 209, mobile: 130 },
// 	{ month: "June", desktop: 214, mobile: 140 },
// ];

const chartConfig = {
	total: {
		label: "Total",
		color: "#60a5fa",
	},
} satisfies ChartConfig;

export type ChartCardProps = {
	fetchCategory: Promise<
		| {
				name: string;
				_count: {
					projects: number;
				};
		  }[]
		| undefined
	>;
};

const CategoryChartCard = ({ fetchCategory }: ChartCardProps) => {
	const countCategoriesWithCount = use(fetchCategory);
	const chartData = countCategoriesWithCount?.map(data => {
		return {
			name: data.name,
			total: data._count.projects,
		};
	});

	return (
		<Card>
			<CardHeader>
				<CardTitle>Kategori</CardTitle>
			</CardHeader>
			<CardContent className="flex-1">
				<ChartContainer config={chartConfig} className="h-full w-full">
					<BarChart accessibilityLayer data={chartData}>
						<CartesianGrid vertical={false} />
						<XAxis
							dataKey="name"
							tickLine={false}
							tickMargin={10}
							axisLine={false}
						/>
						<ChartTooltip content={<ChartTooltipContent />} />
						<Bar dataKey="total" fill="var(--color-total)" radius={4} />
					</BarChart>
				</ChartContainer>
			</CardContent>
		</Card>
	);
};

export default CategoryChartCard;
