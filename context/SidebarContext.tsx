"use client";
import { createContext, use, useLayoutEffect, useState } from "react";

type SidebarContextType = {
	isOpen: boolean;
	setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

const useSidebar = () => {
	const sidebar = use(SidebarContext);
	if (sidebar === undefined) {
		throw new Error("useSidebar must be used within the SidebarProvider");
	}
	return sidebar;
};

const SidebarProvider = ({ children }: { children: React.ReactNode }) => {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	useLayoutEffect(() => {
		function isDesktopUserAgent() {
			const userAgent = navigator.userAgent;
			// Common mobile/tablet indicators
			const mobileRegex =
				/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
			return !mobileRegex.test(userAgent);
		}
		setIsOpen(isDesktopUserAgent());
	}, []);

	return (
		<SidebarContext value={{ isOpen, setIsOpen }}>{children}</SidebarContext>
	);
};
// export function isDesktopUserAgent() {
// 	const userAgent = navigator.userAgent;
// 	// Common mobile/tablet indicators
// 	const mobileRegex =
// 		/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
// 	return !mobileRegex.test(userAgent);
// }

export { useSidebar, SidebarProvider };
