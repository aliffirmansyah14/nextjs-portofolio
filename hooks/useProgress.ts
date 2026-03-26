import { useEffect, useState } from "react";

const useProgress = () => {
	const [state, setState] = useState<"initial" | "in-progress" | "complete">(
		"initial"
	);
	const [value, setValue] = useState<number>(0);

	useEffect(() => {
		const progressInterval = setInterval(
			progressingValue,
			state === "in-progress" ? 600 : undefined
		);
		return () => clearInterval(progressInterval);
	}, [state]);

	useEffect(() => {
		let progressEnded: NodeJS.Timeout | string | number | undefined;
		if (value === 100) {
			progressEnded = setTimeout(() => {
				reset();
			}, 300);
		}

		return () => clearTimeout(progressEnded);
	}, [value]);

	const progressingValue = (interval: NodeJS.Timeout) => {
		if (state === "in-progress") {
			const randomValue = getRandomValue(1, 30);
			setValue(acc => Math.min(acc + randomValue, 100));
		} else if (state === "complete") {
			setValue(100);
			clearInterval(interval);
		}
	};
	const getRandomValue = (min: number, max: number) => {
		return Math.floor(Math.random() * (max - min + 1) + min);
	};

	const start = () => {
		setState("in-progress");
		setValue(0);
	};

	const reset = () => {
		setState("initial");
		setValue(0);
	};
	const done = () => {
		setState("complete");
	};
	return {
		state,
		value,
		start,
		reset,
		done,
	};
};

export default useProgress;
