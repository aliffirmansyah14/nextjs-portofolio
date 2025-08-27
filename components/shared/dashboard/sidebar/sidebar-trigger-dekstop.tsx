"use client";
import { useSideBarZ } from "@/store/sidebar";
import { SidebarClose, SidebarOpen } from "lucide-react";

const SiderbarTriggerDesktop = () => {
	const dekstop = useSideBarZ(state => state.sidebar.dekstop);
	const setIsDekstopSidebar = useSideBarZ(state => state.setDekstopSidebar);
	const setOverFlowHiddenBody = () => {
		const isHidden = document.body.style["overflow"] === "hidden";
		if (isHidden) {
			document.body.style["overflow"] = "auto";
		}
	};

	return (
		<div className="hidden lg:block">
			<button
				role="button"
				onClick={e => {
					e.preventDefault();
					setOverFlowHiddenBody();
					setIsDekstopSidebar();
				}}
				className={
					"py-1 px-2 flex items-center gap-2 hover:bg-primary/30 rounded cursor-pointer"
				}
			>
				{dekstop ? (
					<SidebarClose className={"size-6"} />
				) : (
					<SidebarOpen className={"size-6"} />
				)}
			</button>
		</div>
	);
};
export default SiderbarTriggerDesktop;
