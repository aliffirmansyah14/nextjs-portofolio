import Section from "@/components/shared/layout/section-layout";
import {
	ArrowRight,
	FacebookIcon,
	InstagramIcon,
	TwitterIcon,
} from "lucide-react";
import Link from "next/link";
import { Logo } from "../navbar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

const informations = [
	{
		header: "Address",
		content: ["Lenteng Agung Jagakarsa", "Jakarta Indoensia"],
	},
	{
		header: "Email Address",
		tag: "a",
		content: ["aliffirmansyah1407@gmail.com", "aliffirmansyah1407@outlook.com"],
	},
	{
		header: "Phone Number",
		content: ["081290011530"],
	},
];

const Footer = () => {
	return (
		<Section className="pb-3 md:pb-3 xl:pb-3 lg:pb-3">
			<div className="flex justify-between flex-wrap gap-y-4 sm:flex-nowrap items-center md:items-start">
				<h5 className="text-white text-2xl md:text-4xl lg:text-6xl max-w-lg">
					Let's Connect There
				</h5>
				<ButtonHireMe />
			</div>
			<div className="grid grid-cols-1 xl:grid-cols-2 gap-y-5 mt-20 border-t border-accent py-10">
				<div className="space-y-4">
					<div className="space-y-2">
						<Logo size="lg" />
						<p className="text-muted-foreground/60 max-w-sm text-sm md:text-[16px]">
							a web developer specialising in frontend and website design
						</p>
					</div>
					<ul className="flex items-center gap-4">
						<Link href={"/"} className="group">
							<figure>
								<InstagramIcon
									size={20}
									className="group-hover:text-pink-500 transition-colors"
								/>
							</figure>
						</Link>
						<Link href={"/"} className="group">
							<figure>
								<TwitterIcon
									size={20}
									className="group-hover:text-blue-300 transition-colors"
								/>
							</figure>
						</Link>
						<Link href={"/"} className="group">
							<figure>
								<FacebookIcon
									size={20}
									className="group-hover:text-blue-600 transition-colors"
								/>
							</figure>
						</Link>
					</ul>
				</div>
				<InformationsCard />
			</div>
			<CopyRight />
		</Section>
	);
};

const ButtonHireMe = () => {
	return (
		<a
			href="mailto:aliffirmansyah1407@gmail.com"
			className="relative bg-accent rounded-full h-fit tracking-tighter cursor-pointer py-3 md:py-4 ps-14 md:ps-16 pe-3 md:pe-5 gap-2 group text-nowrap"
		>
			<div className="bg-background p-3 absolute w-[auto] left-1 md:left-2 top-1/2 -translate-y-1/2 group-hover:[width:calc(100%-8px)] md:group-hover:[width:calc(100%-16px)] rounded-full flex items-center justify-center transition-[width] duration-500 group-active:[width:calc(100%-16px)]">
				<ArrowRight className="size-4 md:size-5" />
			</div>
			Hire Me Now!
		</a>
	);
};

const InformationsCard = () => {
	return (
		<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-4 gap-x-6">
			{informations.map(information => {
				return (
					<Card
						className="bg-background border-0 py-0 gap-2"
						key={information.header}
					>
						<CardHeader className="text-nowrap text-sm px-0">
							{information.header}
						</CardHeader>
						<CardContent className="space-y-1 px-0">
							{information.content.map((content, i) => {
								const Comp = information.tag !== undefined ? "a" : "p";
								return (
									<Comp
										key={i}
										href={Comp === "a" ? `mailto:${content}` : undefined}
										className="text-nowrap text-muted-foreground/60 text-xs block"
									>
										{content}
									</Comp>
								);
							})}
						</CardContent>
					</Card>
				);
			})}
		</div>
	);
};

const CopyRight = () => {
	return (
		<div className="pt-3 border-t border-accent text-center">
			<p className="text-[9px] sm:text-[12px] md:text-sm text-nowrap">
				All right reserved @alip. design inspired by @Duwi - dribble
			</p>
		</div>
	);
};

export default Footer;
