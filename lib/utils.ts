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
