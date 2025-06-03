import Image from "next/image";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

const Hero = ({ className }: { className?: string }) => {
	return (
		<section
			className={cn(
				"h-[calc(100vh-4rem)] container mx-auto pt-20 md:pt-32 lg:pt-40",
				className
			)}
		>
			<div className="h-full px-4 md:px-6 grid grid-rows-[1fr_40px_20px] place-content-center">
				<h1 className="animate-fade-in mx-auto text-center max-w-6xl text-4xl md:text-5xl lg:text-6xl font-semibold leading-normal">
					<span className="text-muted-foreground tracking-tighter font-light">
						I’m a designer specialising in{" "}
					</span>
					UI/UX{" "}
					<span className="text-muted-foreground tracking-tighter font-light">
						and
					</span>{" "}
					Interaction Design
				</h1>
				<Button
					variant={"link"}
					className="mx-auto cursor-pointer size-10 p-0 animate-scroll-button"
				>
					<Image
						alt="arrow-down"
						src={"/arrow-down.svg"}
						width={40}
						height={40}
					/>
				</Button>
			</div>
		</section>
	);
};

export default Hero;
