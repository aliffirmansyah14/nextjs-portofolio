"use client";

import { cn } from "@/lib/utils";
import SiderbarTriggerMobile from "./sidebar/sidebar-trigger-mobile";

type HeaderProps = {
	text: string;
	textStyle?: string;
};

const Header = ({ text, textStyle }: HeaderProps) => {
	return (
		<header className="flex gap-1">
			<SiderbarTriggerMobile />
			<h1 className={cn("text-2xl font-semibold", textStyle)}>{text}</h1>
		</header>
	);
};

export default Header;
