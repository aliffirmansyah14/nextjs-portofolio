"use server";
import { ProjectType } from "@/components/shared/portofolio/project";

const projects: ProjectType[] = [
	{
		tech: ["Next JS", "Tailwind CSS"],
		imageUrl: "https://placehold.co/400x200",
		name: "React-js chatting",
		redirectUrl: "https://github.com/aliffirmansyah14/",
		category: "reactjs",
	},
	{
		tech: ["Next JS", "Tailwind CSS"],
		imageUrl: "https://placehold.co/400x200",
		name: "React-js chatting",
		redirectUrl: "https://github.com/aliffirmansyah14/",
		category: "reactjs",
	},
	{
		tech: ["Next JS", "Tailwind CSS"],
		imageUrl: "https://placehold.co/400x200",
		name: "React-js chatting",
		redirectUrl: "https://github.com/aliffirmansyah14/",
		category: "reactjs",
	},
	{
		tech: ["Next JS", "Tailwind CSS"],
		imageUrl: "https://placehold.co/400x200",
		name: "React-js chatting",
		redirectUrl: "https://github.com/aliffirmansyah14/",
		category: "reactjs",
	},
	{
		tech: ["Next JS", "Tailwind CSS"],
		imageUrl: "https://placehold.co/400x200",
		name: "React-js chatting",
		redirectUrl: "https://github.com/aliffirmansyah14/",
		category: "html css",
	},
	{
		tech: ["Next JS", "Tailwind CSS"],
		imageUrl: "https://placehold.co/400x200",
		name: "React-js chatting",
		redirectUrl: "https://github.com/aliffirmansyah14/",
		category: "laravel",
	},
];

export const getProjects = async (delay: number = 1000) => {
	await new Promise<typeof projects>(resolve => {
		setTimeout(resolve, delay);
	});
	return projects;
};
