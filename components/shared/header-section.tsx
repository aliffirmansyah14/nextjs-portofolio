import { Badge } from "@/components/ui/badge";

const HeaderSection = ({
	badgeText,
	text,
}: {
	badgeText: string;
	text?: string;
}) => {
	return (
		<div className="space-y-4">
			<Badge variant="secondary" className="py-1 rounded-full">
				{badgeText}
			</Badge>
			{text && (
				<div className="flex flex-col md:flex-row md:justify-between md:items-end gap-4">
					<h2 className="max-w-[33rem] text-2xl md:text-4xl tracking-tight leading-none">
						<span className="text-muted-foreground ">
							{text.split(" ")[0]}{" "}
						</span>
						{text.split(" ").splice(1).join(" ")}
					</h2>
					<p className="text-base tracking-tight text-primary">{text}</p>
				</div>
			)}
		</div>
	);
};

export default HeaderSection;
