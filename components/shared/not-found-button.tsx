"use client";
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon, Frown } from "lucide-react";
import { useRouter } from "next/navigation";

const NotFoundButton = () => {
	const router = useRouter();

	return (
		<Button
			variant={"outline"}
			className="rounded-2xl"
			onClick={() => router.back()}
		>
			<ArrowLeftIcon /> Not Found <Frown />
		</Button>
	);
};
export default NotFoundButton;
