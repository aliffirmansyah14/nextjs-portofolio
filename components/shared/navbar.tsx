import { cn } from "@/lib/utils";
import Link from "next/link";
// import { useSearchParams } from "next/navigation";

const links = [
	{ label: "HOME", href: "#home", section: "home" },
	{ label: "PROJECT", href: "#project", section: "project" },
	{ label: "ABOUT", href: "#about", section: "about" },
];

export const Navbar = () => {
	return (
		<header className="w-full">
			<div className="container mx-auto h-16 flex items-center justify-between px-6">
				<p className=" gradient-color font-bold text-2xl bg-clip-text text-transparent">
					Portofolio
				</p>
				<ul className="flex justify-center items-center gap-6">
					{links.map((link, index) => {
						const isLinkActive = index === 0;
						return <NavbarLink key={index} active={isLinkActive} {...link} />;
					})}
				</ul>
			</div>
		</header>
	);
};

type NavbarLinkProps = {
	label: string;
	href: string;
	section: string;
	active: boolean;
};

const NavbarLink = ({ section, href, label, active }: NavbarLinkProps) => {
	return (
		<li
			key={section}
			className={cn(
				"relative before:content-[''] before:opacity-0 before:w-2 before:h-0.5 before:absolute before:-bottom-1 before:bg-neutral-100 before:rounded-lg before:-translate-1/2 before:left-1/2 transition-opacity",
				active ? "before:opacity-100" : ""
			)}
		>
			<Link
				href={href}
				className={cn(
					"capitalize font-semibold text-sm transition-all",
					active
						? "bg-gradient-to-r via-0% via-[#BC3CD8] to-[#C54B8C] text-transparent bg-clip-text"
						: ""
				)}
			>
				{label}
			</Link>
		</li>
	);
};
