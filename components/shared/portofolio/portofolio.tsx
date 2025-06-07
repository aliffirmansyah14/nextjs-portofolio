import Section from "@/components/shared/layout/section-layout";
import HeaderSection from "../header-section";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const Portofolio = () => {
	return (
		<Section id="portofolio">
			<HeaderSection
				badgeText="Portofolio"
				text={`Explore my portofolio of creative solutions`}
			/>
			<div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
				{[...Array(9).keys()].map(i => {
					return <Project key={i} />;
				})}
			</div>
		</Section>
	);
	("");
};

export default Portofolio;

const Project = () => {
	return (
		<article
			style={{
				background: "url('https://placehold.co/400x200')",
				backgroundPosition: "center",
				backgroundSize: "cover",
				backgroundRepeat: "no-repeat",
			}}
			className="h-[220px] rounded-2xl bg-secondary relative cursor-pointer group overflow-hidden "
		>
			<div className=" absolute inset-0 bg-black/40 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity">
				<div className="size-full flex flex-col justify-end">
					<Link href={"/"} className="px-6 py-4 space-y-3">
						<div className="flex gap-x-1">
							<Badge variant="default" className="rounded-full px-2 py-1">
								Next js
							</Badge>
							<Badge variant="default" className="rounded-full px-2 py-1">
								Tailwind
							</Badge>
						</div>
						<div className="flex justify-between items-center">
							<p className="text-lg max-w-2/3">Ainimelist - Web anime list </p>
							<ArrowRight size={40} className="-rotate-45" />
						</div>
					</Link>
				</div>
			</div>
		</article>
	);
};
