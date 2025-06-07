import Section from "@/components/shared/layout/section-layout";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const Footer = () => {
	return (
		<Section>
			<div className="flex justify-between items-center md:items-start">
				<h5 className="text-white text-2xl md:text-4xl lg:text-6xl max-w-lg">
					Let's Connect There
				</h5>
				<Link
					href={"/"}
					className="relative bg-accent rounded-full h-fit tracking-tighter cursor-pointer py-3 md:py-4 ps-14 md:ps-16 pe-3 md:pe-5 gap-2 group text-nowrap"
				>
					<div className="bg-background absolute w-[auto] left-1 md:left-2 top-1/2 -translate-y-1/2 group-hover:[width:calc(100%-8px)] md:group-hover:[width:calc(100%-16px)] rounded-full flex items-center justify-center p-3 transition-[width] duration-1000 group-active:[width:calc(100%-16px)]">
						<ArrowRight className="size-4 md:size-5" />
					</div>
					Hire Me Now!
				</Link>
			</div>
		</Section>
	);
};

export default Footer;
