import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function formatDateToIndonesia(
	date: Date,
	options?: Intl.DateTimeFormatOptions
) {
	const defaultOptions = {
		year: "numeric",
		month: "numeric",
		day: "numeric",
		hour: "numeric",
		minute: "numeric",
		second: "numeric",
	} as Intl.DateTimeFormatOptions;
	const formatter = new Intl.DateTimeFormat("id-ID", options ?? defaultOptions);
	return formatter.format(date);
}

export const setOverFlowHBody = () => {
	if (typeof window === undefined) return;
	const isHidden = document.body.style["overflow"] === "hidden";
	if (isHidden) {
		document.body.style["overflow"] = "auto";
	}
};

export function createQueryString(
	params: URLSearchParams,
	value: string,
	key: string
) {
	params.set(key, value);
	return params.toString();
}

export function getMinMax(from: number, min: number, max: number) {
	return Math.max(Math.min(max, from), min);
}

export function getPagination(totalData: number, page: number, take: number) {
	const limitPage = Math.ceil(totalData / take);

	if (limitPage <= 1) return null;

	if (limitPage < 4)
		return Array.from({ length: limitPage }).map((_, i) => i + 1);

	if (limitPage - 3 < page) return [1, limitPage - 2, limitPage - 1, limitPage];

	return [1, "separator", page - 1, page, page + 1, "separator", limitPage];
}
