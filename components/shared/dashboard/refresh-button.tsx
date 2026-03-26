"use client";

import { Button } from "@/components/ui/button";
import { useProgressBar } from "@/context/ProgressBarContext";
import useProgress from "@/hooks/useProgress";
import { cn } from "@/lib/utils";
import { Repeat } from "lucide-react";
import { useRouter } from "next/navigation";
import { startTransition } from "react";

const RefreshButton = ({ className }: { className?: string }) => {
	const router = useRouter();
	const { start, done } = useProgressBar();

	const handleOnClickButtonRefresh = () => {
		console.log("refreshing....");
		start();
		startTransition(() => {
			router.refresh();
		});
		done();
	};
	return (
		<Button
			variant={"outline"}
			className={cn("rounded-full", className)}
			onClick={handleOnClickButtonRefresh}
		>
			<Repeat className="size-4" />
		</Button>
	);
};

export default RefreshButton;
