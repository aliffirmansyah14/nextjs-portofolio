"use client";
import Section from "@/components/shared/layout/section-layout";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const AboutMe = () => {
	const ref = useRef<HTMLDivElement | null>(null);
	const [inView, setInView] = useState<boolean>(false);

	useEffect(() => {
		if (!ref.current || inView) return;
		const observer = new IntersectionObserver(
			entries => {
				const [entry] = entries;
				setInView(entry.isIntersecting);
			},
			{
				root: null,
				threshold: 0.2,
			}
		);
		observer.observe(ref.current);

		return () => {
			if (ref.current) observer.unobserve(ref.current);
		};
	}, [ref, inView]);

	return (
		<Section id="about">
			<div
				className={cn(
					"mt-12 grid md:grid-cols-2 items-center gap-x-24 transition-all duration-1000 md:translate-y-40 md:opacity-0",
					{
						"md:translate-y-0 md:opacity-100": inView,
					}
				)}
				ref={ref}
			>
				<div className="flex-1">
					<p className="text-muted-foreground tracking-tight font-mono">
						A BIT ABOUT ME
					</p>
					<strong className="text-2xl lg:text-4xl">Alif Firmansyah</strong>
					<p className="mt-4 max-w-xl text-muted-foreground tracking-tighter text-lg md:text-xl lg:text-2xl">
						I am a Frontend web developer who is passionate about creating
						beautiful and joyful digital experiences. Besides design, I love
						music, games and travelling.
					</p>
				</div>
				<div className="hidden md:grid grid-cols-2 gap-3 items-center">
					<div className="">
						<figure className="relative w-full h-[350px]">
							<Image
								src="/hobbies/games.jpg"
								alt="about me img"
								className="object-cover rounded-2xl"
								sizes="(max-width: 700px) 100vw ,300px"
								priority
								fill
							/>
						</figure>
					</div>
					<div className="space-y-3">
						<figure className="relative w-full h-[250px]">
							<Image
								src="/hobbies/music.jpg"
								alt="about me img"
								className="object-cover rounded-2xl"
								sizes="(max-width: 700px) 100vw, 300px"
								priority
								fill
							/>
						</figure>
						<figure className="relative w-full h-[250px]">
							<Image
								src="/hobbies/travel.jpg"
								alt="about me img"
								className="object-cover rounded-2xl"
								sizes="(max-width: 700px) 100vw, 300px"
								priority
								fill
							/>
						</figure>
					</div>
				</div>
			</div>
		</Section>
	);
};

export default AboutMe;
