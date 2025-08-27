"use client";
import { useSideBarZ } from "@/store/sidebar";

const OverlaySidebar = () => {
	const setIsOpen = useSideBarZ(state => state.setMobileSidebar);
	const isOpen = useSideBarZ(state => state.sidebar.mobile);
	return (
		<div
			className={`${
				isOpen ? "fixed" : "hidden"
			} md:hidden lg:pointer-events-none z-30 top-0 bottom-0 w-full bg-black/70`}
			onClick={() => {
				const isHidden = document.body.style["overflow"] === "hidden";
				if (isHidden && isOpen) {
					document.body.style["overflow"] = "auto";
				} else if (!isOpen) {
					document.body.style["overflow"] = "hidden";
				}
				setIsOpen();
			}}
		></div>
	);
};

export default OverlaySidebar;
