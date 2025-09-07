"use client";

import { useSideBarZ } from "@/store/sidebar";
import SiderbarTriggerMobile from "./sidebar-trigger-mobile";
import UsernameButton from "@/components/shared/dashboard/sidebar/username-button";
import { Logo } from "../../logo";
import Navlinks from "./navlinks";

const SidebarMobile = () => {
	const isOpen = useSideBarZ(state => state.sidebar.mobile);

	return (
		<aside
			className={`${
				isOpen ? "translate-x-0" : `-translate-x-[300px]`
			} fixed md:hidden z-40 h-[100dvh] top-0 bg-sidebar w-[250px] min-h-[100dvh] p-2 transition-all`}
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
				<nav className="mt-4 flex-1">
					<div className="p-2 text-[13px] text-foreground/70 h-8">Menu</div>
					<Navlinks />
				</nav>
				<div className="px-2">
					<UsernameButton />
				</div>
			</div>
		</aside>
	);
};

export default SidebarMobile;
