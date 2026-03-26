"use client";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

const ButtonAddPortofolio = () => {
	return (
		<Button
			variant="outline"
			className="rounded-xl"
			onClick={() =>
				document.getElementById("trigger-button-add-portofolio")?.click()
			}
		>
			Add <Plus />
		</Button>
	);
};

export default ButtonAddPortofolio;
