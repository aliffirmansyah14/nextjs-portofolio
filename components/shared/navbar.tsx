"use client";
import { cn } from "@/lib/utils";
import { MenuIcon, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const links = [
	{ label: "HOME", href: "#home", sectionId: "home" },
	{ label: "PORTOFOLIO", href: "#portofolio", sectionId: "portofolio" },
	{ label: "ABOUT", href: "#about", sectionId: "about" },
];

const Navbar = () => {
	const [isMenuVisible, setIsMenuVisible] = useState(false);

	const handleOnClickMenu = () => {
		setIsMenuVisible(prev => !prev);
		const body = document.getElementsByTagName("body")[0];
		isMenuVisible
			? (body.style = "overflow:auto")
			: (body.style = "overflow:hidden");
	};

	return (
		<header className="w-full border-b border-accent">
			<nav className="container mx-auto h-16 flex items-center justify-between px-6 md:px-16 lg:px-20">
				<Logo />
				<ul className="hidden md:flex justify-center items-center gap-6">
					{links.map((link, index) => {
						const isLinkActive = index === 0;
						return (
							<NavbarLink
								key={link.sectionId}
								active={isLinkActive}
								{...link}
							/>
						);
					})}
				</ul>
				<MenuButton onClick={handleOnClickMenu} type="dekstop">
					<MenuIcon size={25} />
				</MenuButton>
			</nav>

			<NavigasiMenuMobile
				onClick={handleOnClickMenu}
				className={`${isMenuVisible ? "z-10 opacity-100" : "opacity-0"}`}
			/>
		</header>
	);
};
export default Navbar;

const Logo = () => {
	return (
		<div className="flex justify-center items-end gap-1.5">
			<div className="size-8 rounded-full font-bold border-2 border-primary-foreground flex items-center justify-center">
				<p className="text-2xl">a</p>
			</div>
			<p className=" font-bold text-xl">alip.</p>
		</div>
	);
};

type NavbarLinkProps = {
	label: string;
	href: string;
	sectionId: string;
	active: boolean;
};

const NavbarLink = ({ href, label, active }: NavbarLinkProps) => {
	return (
		<li
			className={cn(
				"relative before:content-[''] before:opacity-0 before:w-2 before:h-0.5 before:absolute before:-bottom-1 before:bg-neutral-100 before:rounded-lg before:-translate-1/2 before:left-1/2 transition-opacity",
				active ? "before:opacity-100" : ""
			)}
		>
			<Link
				href={href}
				className={cn(
					"capitalize font-semibold text-sm transition-all",
					active ? "text-primary-foreground" : "text-primary-foreground/60"
				)}
			>
				{label}
			</Link>
		</li>
	);
};

type MenuButtonProps = {
	children: React.ReactNode;
	onClick?: () => void;
	type: "mobile" | "dekstop";
};

const MenuButton = ({
	onClick,
	children,
	type = "dekstop",
}: MenuButtonProps) => {
	return (
		<button
			className={cn(
				"md:hidden p-2 flex items-center  rounded-xl cursor-pointer group",
				type === "dekstop" ? "hover:bg-accent active:bg-accent" : ""
			)}
			onClick={onClick}
		>
			{children}
		</button>
	);
};

type NavigasiMenuMobileProps = {
	onClick?: () => void;
	className: string;
};

const NavigasiMenuMobile = ({
	onClick,
	className,
}: NavigasiMenuMobileProps) => {
	return (
		<nav
			className={cn(
				"fixed md:hidden inset-0 -z-10 flex flex-col bg-sidebar-accent gap-4 opacity-0 transition-opacity",
				className
			)}
		>
			<div className="container mx-auto h-16 flex items-center justify-between px-6 md:px-16 lg:px-20">
				<Logo />
				<MenuButton onClick={onClick} type="mobile">
					<X
						size={25}
						className="text-primary group-hover:text-white group-active:text-white transition-colors"
					/>
				</MenuButton>
			</div>
			<ul className="space-y-3 px-4 ">
				{links.map((link, index) => {
					return (
						<Link
							key={index}
							href={link.href}
							className="border-b block  px-2 py-1 capitalize hover:bg-accent active:bg-accent"
						>
							{link.label.toLocaleLowerCase()}
						</Link>
					);
				})}
			</ul>
		</nav>
	);
};
