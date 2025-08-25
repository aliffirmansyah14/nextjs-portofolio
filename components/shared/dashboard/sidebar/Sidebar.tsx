"use client";
import { ChevronUp, LayoutDashboardIcon, SwatchBook } from "lucide-react";

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { signOut, useSession } from "next-auth/react";
import { useState } from "react";
import { AuthError } from "next-auth";
import clsx from "clsx";
import { useSideBarZ } from "@/store/sidebar";
import ProgressLink from "../../progress-link";

export const sidebarLinks = [
	{ href: "/dashboard", label: "dashboard", icon: <LayoutDashboardIcon /> },
	{ href: "/dashboard/portofolio", label: "portofolio", icon: <SwatchBook /> },
];

export const OverlaySidebar = () => {
	const setIsOpen = useSideBarZ(state => state.setMobileSidebar);
	const isOpen = useSideBarZ(state => state.sidebar.mobile);
	return (
		<div
			className={`${
				isOpen ? "fixed" : "hidden"
			} lg:hidden lg:pointer-events-none z-30 top-0 bottom-0 w-full bg-black/70`}
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

// export const SidebarTrigger = ({
// 	iconStyle = "size-6",
// 	isMobile = false,
// 	leftAction,
// 	callback,
// }: {
// 	iconStyle?: string;
// 	isMobile?: boolean;
// 	leftAction?: boolean;
// 	callback?: () => void;
// }) => {
// 	const mobile = useSideBarZ(state => state.sidebar.mobile);
// 	const dekstop = useSideBarZ(state => state.sidebar.dekstop);
// 	const setIsMobileSidebar = useSideBarZ(state => state.setMobileSidebar);
// 	const setIsDekstopSidebar = useSideBarZ(state => state.setDekstopSidebar);

// 	// const setDashboardAcive = () => {
// 	// 	const main = document.getElementById("dashboard-content");
// 	// 	console.log("dekstop");
// 	// 	if (!main) return;
// 	// 	setIsDekstopSidebar();
// 	// 	if (main.classList.contains("dashboard-active")) {
// 	// 		main.classList.remove("dashboard-active");
// 	// 		return;
// 	// 	}
// 	// 	main.classList.add("dashboard-active");
// 	// 	return;
// 	// };

// 	return (
// 		<button
// 			role="button"
// 			onClick={e => {
// 				e.preventDefault();
// 				callback?.();
// 				leftAction && !isMobile && setIsMobileSidebar();
// 			}}
// 			className={clsx(
// 				"py-1 px-2 flex items-center gap-2 hover:bg-primary/30 rounded cursor-pointer",
// 				{
// 					"md:hidden block": isMobile,
// 					"md:block hidden": !isMobile,
// 				}
// 			)}
// 		>
// 			{(mobile === true && isMobile) || (dekstop === true && !isMobile) ? (
// 				<SidebarClose className={iconStyle} />
// 			) : (
// 				<SidebarOpen className={iconStyle} />
// 			)}
// 			{/* <span>{isOpen ? "close" : "open"}</span> */}
// 		</button>
// 	);
// };

export const UsernameButton = () => {
	const { data: session } = useSession();

	const [isLoading, setIsloading] = useState<boolean>(false);

	const handleOnClickLogout = async (
		e: React.MouseEvent<HTMLButtonElement>
	) => {
		e.preventDefault();
		try {
			setIsloading(true);
			await signOut();
		} catch (error) {
			if (error instanceof AuthError) {
				switch (error.type) {
					case "SignOutError":
						throw new Error("Logout error");
					default:
						throw new Error("Something Error");
				}
			}
			throw error;
		}
	};

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<footer className="mt-auto py-1 md:px-2 flex justify-between hover:bg-primary/30 rounded ">
					<span>{session?.user.name ? session.user.name : "Loading..."}</span>
					<ChevronUp />
				</footer>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="w-56" align="end">
				<DropdownMenuLabel>My account</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuItem>
					<ProgressLink href="/" className="w-full cursor-pointer">
						Home page
					</ProgressLink>
				</DropdownMenuItem>
				<DropdownMenuItem asChild>
					<button
						onClick={handleOnClickLogout}
						disabled={isLoading}
						className="w-full cursor-pointer"
					>
						Logout
					</button>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};
