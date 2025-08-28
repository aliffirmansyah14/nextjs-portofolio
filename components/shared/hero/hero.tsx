import Section from "@/components/shared/layout/section-layout";
import Skills from "./skills";

const Hero = () => {
	return (
		<Section
			id="home"
			className="relative lg:min-h-[300px] pt-20 pb-0 lg:pt-40  lg:pb-0"
		>
			<div className="flex flex-col gap-y-20 md:gap-y-28 ">
				<h1 className="animate-fade-in max-w-3xl mx-auto text-3xl md:text-5xl lg:text-6xl font-semibold md:leading-none tracking-tighter text-center">
					<span className="block text-muted-foreground  font-light">
						Saya adalah web developer{" 	"}
					</span>
					<span>Frontend Jr.</span>
				</h1>

				<Skills />
			</div>
		</Section>
	);
};

export default Hero;
