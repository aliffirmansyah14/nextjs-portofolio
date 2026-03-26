"use client";
import { useSideBarZ } from "@/store/sidebar";
import { SidebarClose, SidebarOpen } from "lucide-react";

const SiderbarTriggerMobile = () => {
	const mobile = useSideBarZ(state => state.sidebar.mobile);
	const setIsMobileSidebar = useSideBarZ(state => state.setMobileSidebar);

	const setOverFlowHiddenBody = () => {
		const isHidden = document.body.style["overflow"] === "hidden";
		if (isHidden && mobile) {
			document.body.style["overflow"] = "auto";
		} else if (!mobile) {
			document.body.style["overflow"] = "hidden";
		}
	};

	return (
		<div className="block md:hidden">
			<button
				role="button"
				onClick={e => {
					e.preventDefault();
					setOverFlowHiddenBody();
					setIsMobileSidebar();
				}}
				className={
					"py-1 px-2 flex items-center gap-2 hover:bg-primary/30 rounded cursor-pointer"
				}
			>
				{mobile ? (
					<SidebarClose className={"size-6"} />
				) : (
					<SidebarOpen className={"size-6"} />
				)}
			</button>
		</div>
	);
};

export default SiderbarTriggerMobile;
