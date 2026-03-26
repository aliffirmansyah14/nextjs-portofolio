"use client";
import { sidebarLinks } from "@/lib/constants";
import ProgressLink from "../../progress-link";
import { usePathname } from "next/navigation";

const Navlinks = () => {
	const pathname = usePathname();
	return (
		<ul className="px-2 flex-1 flex flex-col">
			{sidebarLinks.map((link, index) => {
				const isLinkActive = pathname === link.href;
				return <Navlink key={index} link={link} isActive={isLinkActive} />;
			})}
		</ul>
	);
};

export default Navlinks;

const Navlink = ({
	link,
	isActive,
}: {
	isActive: boolean;
	link: (typeof sidebarLinks)[0];
}) => {
	return (
		<ProgressLink
			href={link.href}
			className={`w-full p-2 flex items-center h-8 hover:bg-primary/30 rounded gap-2 [&>svg]:size-4 [&>svg]:shrink-0 ${
				isActive ? "bg-primary/40" : "bg-none"
			}`}
		>
			{<link.icon />}
			{link.label}
		</ProgressLink>
	);
};
