"use client";
import { cn } from "@/lib/utils";
import { CheckCircle2 } from "lucide-react";
import { useEffect, useState } from "react";

const AlertForm = ({
	message,
	onClose,
}: {
	message: string;
	onClose?: () => void;
}) => {
	const [active, setIsActive] = useState<boolean>(message !== "");
	useEffect(() => {
		const timout = setTimeout(() => {
			setIsActive(false);
			onClose?.();
		}, 3000);
		return () => clearTimeout(timout);
	}, []);
	return (
		<div
			className={cn(
				"bg-green-400/30 flex gap-x-2 py-3 px-2 rounded items-center",
				{
					hidden: !active,
				}
			)}
		>
			<CheckCircle2 className="size-8" />
			<p>{message}</p>
		</div>
	);
};
export default AlertForm;
