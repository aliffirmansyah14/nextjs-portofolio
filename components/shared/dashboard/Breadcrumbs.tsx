import { ChevronRight } from "lucide-react";
import ProgressLink from "../progress-link";
import { Fragment } from "react";

type listBreadCrumbs = {
	href: string;
	label: string;
};

type BreadcrumbsProps = {
	list: listBreadCrumbs[];
};

const Breadcrumbs = ({ list }: BreadcrumbsProps) => {
	return (
		<ul className="flex gap-0.5 items-center">
			{list.map((l, i) => {
				if (i === list.length - 1) {
					return (
						<li key={i} className="text-sm">
							{l.label}
						</li>
					);
				}
				return (
					<Fragment key={i}>
						<li className="text-sm text-muted-foreground hover:text-white transition-colors">
							<ProgressLink href={l.href}>{l.label}</ProgressLink>
						</li>
						<ChevronRight className="size-4" />
					</Fragment>
				);
			})}
		</ul>
	);
};

export default Breadcrumbs;
