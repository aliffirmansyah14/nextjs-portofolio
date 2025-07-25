"use client";
import { isDesktopUserAgent } from "@/lib/utils";
import { createContext, use, useState } from "react";

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
	const [isOpen, setIsOpen] = useState<boolean>(isDesktopUserAgent() ?? false);

	return (
		<SidebarContext value={{ isOpen, setIsOpen }}>{children}</SidebarContext>
	);
};

export { useSidebar, SidebarProvider };
