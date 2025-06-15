import Section from "@/components/shared/layout/section-layout";
import Skills from "./skills";

const Hero = () => {
	return (
		<Section
			id="home"
			className="md:min-h-[calc(100vh-4rem)] relative pt-20 pb-0 lg:pt-40  lg:pb-0"
		>
			<div className="flex flex-col gap-y-28 ">
				<h1 className="animate-fade-in max-w-2xl mx-auto text-3xl md:text-5xl lg:text-6xl font-semibold md:leading-none tracking-tighter text-center">
					<span className="text-muted-foreground  font-light">
						I’m a web developer specialising in{" "}
					</span>
					Frontend <span className="text-muted-foreground font-light">and</span>{" "}
					Website design
				</h1>

				<Skills />
			</div>
		</Section>
	);
};

export default Hero;
