"use client";
import {
	ChevronUp,
	LayoutDashboardIcon,
	SidebarClose,
	SidebarOpen,
	SwatchBook,
} from "lucide-react";
import { Logo } from "../navbar";
import ProgressLink from "../progress-link";
import { useSidebar } from "@/context/SidebarContext";
import { usePathname } from "next/navigation";
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

const sidebarLinks = [
	{ href: "/dashboard", label: "dashboard", icon: <LayoutDashboardIcon /> },
	{ href: "/dashboard/portofolio", label: "portofolio", icon: <SwatchBook /> },
];

const Sidebar = () => {
	const { isOpen } = useSidebar();
	const pathname = usePathname();
	const callbackTriggerSidebar = () => {
		const isHidden = document.body.style["overflow"] === "hidden";
		if (isHidden) {
			document.body.style["overflow"] === "auto";
		} else {
			document.body.style["overflow"] === "hidden";
		}
	};

	return (
		<>
			<aside
				className={`${
					isOpen ? "md:block" : "hidden"
				} md:relative fixed z-40 top-0 bottom-0 bg-secondary w-[230px] md:w-full md:max-w-[250px] min-h-[100dvh] p-2`}
			>
				<div className="flex flex-col h-full py-2">
					<header className="flex gap-2 items-center">
						<div className="px-2">
							<Logo size="sm" disabledText={true} />
						</div>
						<span className="font-semibold text-2xl">Admin</span>
						<div className="md:hidden block ms-auto" id="sidebar-trigger">
							<SidebarTrigger callback={callbackTriggerSidebar} />
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
			<OverlaySiderbar />
		</>
	);
};

export default Sidebar;

const OverlaySiderbar = () => {
	const { isOpen, setIsOpen } = useSidebar();
	return (
		<div
			className={`${
				isOpen ? "fixed" : "hidden"
			} md:hidden md:pointer-events-none z-40 top-0 bottom-0 w-full bg-black/70`}
			onClick={() => setIsOpen(prev => !prev)}
		></div>
	);
};

export const SidebarTrigger = ({
	iconStyle = "size-6",
	callback,
}: {
	iconStyle?: string;
	callback?: () => void;
}) => {
	const { isOpen, setIsOpen } = useSidebar();
	return (
		<button
			role="button"
			onClick={e => {
				e.preventDefault();
				callback?.();
				setIsOpen(prev => !prev);
			}}
			className="py-1 px-2 flex items-center gap-2 hover:bg-primary/30 rounded cursor-pointer"
		>
			{isOpen ? (
				<SidebarClose className={iconStyle} />
			) : (
				<SidebarOpen className={iconStyle} />
			)}
			{/* <span>{isOpen ? "close" : "open"}</span> */}
		</button>
	);
};

const UsernameButton = () => {
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
				<footer className="mt-auto py-1 px-2 flex justify-between hover:bg-primary/30 rounded ">
					<span>{session?.user.name}</span>
					<ChevronUp />
				</footer>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="w-56" align="end">
				<DropdownMenuLabel>My account</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuItem>Team</DropdownMenuItem>
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
