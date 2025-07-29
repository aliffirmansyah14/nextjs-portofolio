import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { CategoriesType } from "./tabs";

export type TechType =
	| "Next JS"
	| "Tailwind CSS"
	| "Node JS"
	| "React JS"
	| "Laravel";
export type ProjectType = {
	name: string;
	redirectUrl: string;
	imageUrl?: string;
	tech: TechType[];
	category: string;
};

type ProjectProps = ProjectType;

const Project = ({ name, redirectUrl, tech, imageUrl }: ProjectProps) => {
	return (
		<article
			style={{
				background: `url('${imageUrl ?? "https://placehold.co/400x200"}')`,
				backgroundPosition: "center",
				backgroundSize: "cover",
				backgroundRepeat: "no-repeat",
			}}
			className="h-[220px] rounded-2xl bg-secondary relative cursor-pointer group overflow-hidden "
		>
			<div className=" absolute inset-0 bg-black/40 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity">
				<div className="size-full flex flex-col justify-end">
					<Link href={redirectUrl ?? "/"} className="px-6 py-4 space-y-3">
						<div className="flex gap-x-1">
							{tech.map(t => (
								<Badge
									key={t}
									variant="default"
									className="rounded-full px-2 py-1"
								>
									{t}
								</Badge>
							))}
						</div>
						<div className="flex justify-between items-center">
							<p className="text-lg max-w-2/3">{name} </p>
							<ArrowRight size={40} className="-rotate-45" />
						</div>
					</Link>
				</div>
			</div>
		</article>
	);
};
export default Project;
