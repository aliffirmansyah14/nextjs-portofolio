"use client";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useActionPortofolio } from "@/store/action-portofolio";
import { EllipsisVertical } from "lucide-react";
import { PortofoliosType } from "../../portofolio/projects";
import { useRouter } from "next/navigation";

const ActionButtonPortofolioTable = ({
	portofolio,
}: {
	portofolio: PortofoliosType;
}) => {
	const router = useRouter();
	const setActionIdPortofolio = useActionPortofolio(
		state => state.setActionIdPortofolio
	);

	const handleClickEditButton = () => {
		router.push(`/dashboard/portofolio/edit/${portofolio.id}`);
	};
	const handleClickDeleteButton = () => {
		setActionIdPortofolio(portofolio.id);
		document.getElementById("trigger-delete-portofolio")?.click();
	};

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<button className="p-2 rounded-full hover:bg-accent/40">
					<EllipsisVertical className="size-4" />
				</button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="w-56" align="end">
				<DropdownMenuLabel>Action</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuItem asChild variant="update">
					<button
						onClick={handleClickEditButton}
						className="w-full text-green-500 cursor-pointer"
					>
						Edit
					</button>
				</DropdownMenuItem>
				<DropdownMenuItem asChild variant="destructive">
					<button
						onClick={handleClickDeleteButton}
						className="w-full text-red-500 cursor-pointer"
					>
						Delete
					</button>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export default ActionButtonPortofolioTable;
