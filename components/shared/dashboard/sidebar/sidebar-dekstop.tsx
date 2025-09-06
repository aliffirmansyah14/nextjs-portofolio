import { Logo } from "../../logo";
import Navlinks from "./navlinks";
import UsernameButton from "./username-button";

const SidebarDekstop = () => {
	return (
		<aside
			className={
				"md:sticky top-0 max-md:hidden bg-background h-[100dvh] min-h-[100dvh] "
			}
		>
			<div className="flex flex-col h-full py-4">
				<header className="flex gap-2 items-center">
					<div className="px-2">
						<Logo size="sm" />
					</div>
				</header>
				<nav className="mt-4 flex-1 flex flex-col">
					<div className="p-2 text-[13px] text-foreground/70 h-8">Menu</div>
					<Navlinks />
					<div className="px-2">
						<UsernameButton />
					</div>
				</nav>
			</div>
		</aside>
	);
};

export default SidebarDekstop;
