"use client";
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon, Frown } from "lucide-react";
import { useRouter } from "next/navigation";

const NotFoundButton = ({ isRouteBack }: { isRouteBack?: boolean }) => {
	const router = useRouter();

	return (
		<Button
			variant={"outline"}
			className="rounded-2xl"
			onClick={() => {
				if (!isRouteBack) return;
				router.back();
			}}
		>
			{isRouteBack && <ArrowLeftIcon />} Not Found <Frown />
		</Button>
	);
};
export default NotFoundButton;
