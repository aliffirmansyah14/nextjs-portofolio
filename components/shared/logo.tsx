type Logoprops = {
	size?: "sm" | "md" | "lg";
	disabledText?: boolean;
};

export const Logo = ({ size = "md", disabledText = false }: Logoprops) => {
	const logoVariant = {
		sm: {
			logo: "text-xl",
			text: "text-lg",
		},
		md: {
			logo: "text-2xl",
			text: "text-xl",
		},
		lg: {
			logo: "text-3xl",
			text: "text-2xl",
		},
	};
	return (
		<div className="flex items-end gap-1.5">
			<div className="size-8 rounded-full font-bold border-2 border-black dark:border-primary-foreground flex items-center justify-center">
				<p className={logoVariant[size].logo}>a</p>
			</div>
			{!disabledText && (
				<p className={`font-bold ${logoVariant[size].text}`}>alip.</p>
			)}
		</div>
	);
};
