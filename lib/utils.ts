import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function isDesktopUserAgent() {
	const userAgent = navigator.userAgent;
	// Common mobile/tablet indicators
	const mobileRegex =
		/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
	return !mobileRegex.test(userAgent);
}
