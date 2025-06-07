import { cn } from "@/lib/utils";
import Image from "next/image";

type skill = {
	imageUrl?: string;
	name: string;
};

const listSkill: skill[] = [
	{
		name: "Next Js",
		imageUrl: "/nextjs.svg",
	},
	{
		name: "React Js",
		imageUrl: "/reactjs.svg",
	},
	{
		name: "Node Js",
		imageUrl: "/nodejs.svg",
	},
	{
		name: "Javascript",
		imageUrl: "/javascript.svg",
	},
	{
		name: "Typescript",
		imageUrl: "/typescript.svg",
	},
	{
		name: "Java",
		imageUrl: "/java.svg",
	},
	{
		name: "PHP",
		imageUrl: "/php.svg",
	},
	{
		name: "Laravel",
		imageUrl: "/laravel.svg",
	},

	{
		name: "Html",
		imageUrl: "/html.svg",
	},
	{
		name: "CSS",
		imageUrl: "/css.svg",
	},
	{
		name: "MySql",
		imageUrl: "/mysql.svg",
	},
];

const Skills = () => {
	return (
		<div className="w-full max-w-2xl mx-auto relative flex gap-x-4 overflow-hidden inset-0 pointer-events-none [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-200px),transparent_100%)]">
			{[1, 2].map(num => {
				return (
					<div
						key={num}
						className={cn(
							"whitespace-nowrap flex gap-x-4",
							num === 1
								? "animate-marquee"
								: "animate-marquee-2 ms-4 absolute top-0"
						)}
						aria-hidden={num % 2 === 0}
					>
						{listSkill.map(skill => {
							return (
								<div
									key={skill.name}
									className="bg-secondary px-3 py-2 rounded-xl flex gap-x-2 items-center"
								>
									<div className="dark:invert-100 size-[25px] relative">
										<Image
											src={skill?.imageUrl || "/nextjs.svg"}
											alt="icon-image"
											className="size-full"
											sizes="(max-width: 700px) 100%,80% "
											priority
											quality={75}
											fill
										/>
									</div>
									<p className="capitalize text-xs">{skill.name}</p>
								</div>
							);
						})}
					</div>
				);
			})}
		</div>
	);
};

export default Skills;
