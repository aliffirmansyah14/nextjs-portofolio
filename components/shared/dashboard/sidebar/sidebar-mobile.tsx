"use client";
import { usePathname } from "next/navigation";

import { useSideBarZ } from "@/store/sidebar";
import { useLayoutEffect } from "react";
import ProgressLink from "../../progress-link";
import SiderbarTriggerMobile from "./sidebar-trigger-mobile";
import { sidebarLinks, UsernameButton } from "./Sidebar";
import { Logo } from "../../navbar";

const SidebarMobile = () => {
	const isOpen = useSideBarZ(state => state.sidebar.mobile);
	const setInitIsOpen = useSideBarZ(state => state.setInitMobileSidebar);
	const pathname = usePathname();

	useLayoutEffect(() => {
		function isMobileUserAgent() {
			const userAgent = navigator.userAgent;
			// Common mobile/tablet indicators
			const mobileRegex =
				/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
			return mobileRegex.test(userAgent);
		}
		setInitIsOpen(isMobileUserAgent());
	}, []);

	return (
		<aside
			className={`${
				isOpen ? "translate-x-0" : `-translate-x-[300px]`
			} fixed lg:hidden z-40 h-[100dvh] top-0 bg-secondary w-[230px] md:w-[300px]  min-h-[100dvh] p-2 transition-all`}
		>
			<div className="flex flex-col h-full py-2">
				<header className="flex gap-2 items-center">
					<div className="px-2">
						<Logo size="sm" disabledText={true} />
					</div>
					<span className="font-semibold text-2xl">Admin</span>
					<div className="ml-auto">
						<SiderbarTriggerMobile />
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

export default SidebarMobile;
