"use client";
import { useActiveSection } from "@/hooks/useActiveSession";
import { cn } from "@/lib/utils";
import { LayoutDashboardIcon, MenuIcon, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import ProgressLink from "./progress-link";
import { useSession } from "next-auth/react";
import clsx from "clsx";

const links = [
	{ label: "HOME", href: "#home", sectionId: "home" },
	{ label: "ABOUT", href: "#about", sectionId: "about" },
	{ label: "PORTOFOLIO", href: "#portofolio", sectionId: "portofolio" },
];

const Navbar = () => {
	const { data: session } = useSession();
	const [isMenuVisible, setIsMenuVisible] = useState(false);
	const activeSection = useActiveSection(links[0].sectionId);

	const handleOnClickMenu = () => {
		setIsMenuVisible(prev => !prev);
		const body = document.getElementsByTagName("body")[0];
		isMenuVisible
			? (body.style = "overflow:auto")
			: (body.style = "overflow:hidden");
	};

	return (
		<header className="w-full border-b border-accent sticky top-0 bg-background z-10">
			<nav className="container mx-auto h-16 flex items-center justify-between px-6 md:px-16 lg:px-20">
				<Logo />
				<ul className="hidden md:flex justify-center items-center gap-6">
					{links.map((link, index) => {
						const isLinkActive = link.sectionId === activeSection;
						return <NavbarLink key={index} active={isLinkActive} {...link} />;
					})}
					{session ? (
						<ProgressLink href="/dashboard">
							<LayoutDashboardIcon />
						</ProgressLink>
					) : null}
				</ul>
				<MenuButton onClick={handleOnClickMenu} type="dekstop">
					<MenuIcon size={25} />
				</MenuButton>
			</nav>

			<NavigasiMenuMobile
				onClick={handleOnClickMenu}
				isLogin={session?.user !== undefined}
				className={`${
					isMenuVisible ? "z-10 opacity-100" : "opacity-0 pointer-events-none"
				}`}
			/>
		</header>
	);
};
export default Navbar;

type Logoprops = {
	size?: "sm" | "md" | "lg";
	disabledText?: boolean;
};

export const Logo = ({ size = "md", disabledText = false }: Logoprops) => {
	const logoVariant = {
		sm: {
			logo: "text-xl",
			text: "text-lg",
		},
		md: {
			logo: "text-2xl",
			text: "text-xl",
		},
		lg: {
			logo: "text-3xl",
			text: "text-2xl",
		},
	};
	return (
		<div className="flex items-end gap-1.5">
			<div className="size-8 rounded-full font-bold border-2 border-black dark:border-primary-foreground flex items-center justify-center">
				<p className={logoVariant[size].logo}>a</p>
			</div>
			{!disabledText && (
				<p className={`font-bold ${logoVariant[size].text}`}>alip.</p>
			)}
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
			className={clsx(
				"relative before:content-[''] before:opacity-0 before:w-2 before:h-0.5 before:absolute before:-bottom-1 before:bg-neutral-100 before:rounded-lg before:-translate-1/2 before:left-1/2 transition-opacity",
				{
					"before:opacity-100": active,
				}
			)}
		>
			<Link
				href={href}
				className={clsx("capitalize font-semibold text-sm transition-all", {
					"text-primary-foreground": active,
					"text-primary-foreground/60": !active,
				})}
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
	isLogin: boolean;
	className: string;
};

const NavigasiMenuMobile = ({
	onClick,
	className,
	isLogin,
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
				{isLogin && (
					<ProgressLink
						href="/dashboard"
						className="border-b block  px-2 py-1 capitalize hover:bg-accent active:bg-accent"
					>
						Dashboard
					</ProgressLink>
				)}
			</ul>
		</nav>
	);
};
