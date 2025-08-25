"use client";
import { usePathname } from "next/navigation";

import { useSideBarZ } from "@/store/sidebar";
import clsx from "clsx";
import { Logo } from "../../navbar";
import { sidebarLinks, UsernameButton } from "./Sidebar";
import ProgressLink from "../../progress-link";

const SidebarDekstop = () => {
	const isOpen = useSideBarZ(state => state.sidebar.dekstop);
	const pathname = usePathname();

	return (
		<aside
			className={clsx(
				"max-lg:hidden bg-background h-[100dvh] w-[230px] min-h-[100dvh]",
				{
					"sticky top-0": isOpen,
					hidden: !isOpen,
				}
			)}
		>
			<div className="flex flex-col h-full py-2">
				<header className="flex gap-2 items-center">
					<div className="px-2">
						<Logo size="sm" />
					</div>
				</header>
				<nav className="mt-4">
					<div className="p-2 text-[13px] text-foreground/70 h-8">Menu</div>
					<ul>
						{sidebarLinks.map((link, index) => {
							const isLinkActive = pathname === link.href;
							return (
								<ProgressLink
									href={link.href}
									key={index}
									className={`w-full p-2 flex items-center h-8 hover:bg-primary/30 rounded gap-2 [&>svg]:size-4 [&>svg]:shrink-0 ${
										isLinkActive ? "bg-primary/40" : "bg-none"
									}`}
								>
									{link.icon}
									{link.label}
								</ProgressLink>
							);
						})}
					</ul>
				</nav>
				<UsernameButton />
			</div>
		</aside>
	);
};

export default SidebarDekstop;
