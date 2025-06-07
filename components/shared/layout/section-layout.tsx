import { cn } from "@/lib/utils";

const Section = ({
	className,
	children,
	...props
}: {
	className?: string;
	children?: React.ReactNode;
} & React.ComponentProps<"section">) => {
	return (
		<section
			className={cn(
				"container mx-auto py-16 md:py-24 px-6 lg:px-16 xl:px-20",
				className
			)}
			{...props}
		>
			{children}
		</section>
	);
};

export default Section;
