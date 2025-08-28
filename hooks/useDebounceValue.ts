"use client";
import { useEffect, useState } from "react";

const useDebounceValue = <T>(value: T, delay: number = 300) => {
	const [debounceValue, setDebounceValue] = useState(value);

	useEffect(() => {
		const timeout = setTimeout(() => {
			setDebounceValue(value);
		}, delay);
		return () => clearTimeout(timeout);
	}, [value]);

	return debounceValue;
};

export default useDebounceValue;
