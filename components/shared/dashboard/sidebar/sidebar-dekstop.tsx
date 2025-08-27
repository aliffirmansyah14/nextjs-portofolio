"use client";
import { usePathname } from "next/navigation";
import { useSideBarZ } from "@/store/sidebar";
import clsx from "clsx";
import { Logo } from "../../navbar";
import ProgressLink from "../../progress-link";
import { sidebarLinks } from "@/lib/constants";
import UsernameButton from "./username-button";

const SidebarDekstop = () => {
	const pathname = usePathname();

	return (
		<aside
			className={
				"md:sticky top-0 max-md:hidden bg-background h-[100dvh] min-h-[100dvh] "
			}
		>
			<div className="flex flex-col h-full py-4">
				<header className="flex gap-2 items-center">
					<div className="px-2">
						<Logo size="sm" />
					</div>
				</header>
				<nav className="mt-4 flex-1 flex flex-col">
					<div className="p-2 text-[13px] text-foreground/70 h-8">Menu</div>
					<ul className="px-2 flex-1 flex flex-col">
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
									{<link.icon />}
									{link.label}
								</ProgressLink>
							);
						})}
						<UsernameButton />
					</ul>
				</nav>
			</div>
		</aside>
	);
};

export default SidebarDekstop;
