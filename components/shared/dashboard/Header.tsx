"use client";
import { SidebarTrigger } from "./Sidebar";
import { cn } from "@/lib/utils";

type HeaderProps = {
	text: string;
	textStyle?: string;
};

const Header = ({ text, textStyle }: HeaderProps) => {
	return (
		<header className="flex gap-1">
			<SidebarTrigger leftAction={true} />
			<SidebarTrigger isMobile={true} />
			<h1 className={cn("text-2xl font-semibold", textStyle)}>{text}</h1>
		</header>
	);
};

export default Header;
