"use client";
import useProgress from "@/hooks/useProgress";
import { createContext, use } from "react";

const ProgressBarContext = createContext<
	ReturnType<typeof useProgress> | undefined
>(undefined);

const useProgressBar = () => {
	const progress = use(ProgressBarContext);
	if (progress === undefined) {
		throw new Error(
			"useProgressBar must be used within the ProgressBarProvider"
		);
	}
	return progress;
};

const ProgressBarProvider = ({ children }: { children: React.ReactNode }) => {
	const progress = useProgress();
	return (
		<ProgressBarContext value={progress}>
			{progress.state !== "initial" && (
				<div
					className="fixed top-0 z-50 h-1 bg-gradient-to-r from-red-500 to-red-300 duration-300 transition-all ease-in-out"
					style={{ width: `${progress.value}%` }}
				/>
			)}
			{children}
		</ProgressBarContext>
	);
};

export { useProgressBar, ProgressBarProvider };
