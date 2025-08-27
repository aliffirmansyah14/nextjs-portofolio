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
import { portofoliosType } from "../../table-portofolio";
import { EllipsisVertical } from "lucide-react";
import { useShallow } from "zustand/react/shallow";

const ActionButtonPortofolioTable = ({
	portofolio,
}: {
	portofolio: portofoliosType;
}) => {
	const { setActionPortofolio, setActionIdPortofolio } = useActionPortofolio(
		useShallow(state => ({
			setActionPortofolio: state.setActionPortofolio,
			setActionIdPortofolio: state.setActionIdPortofolio,
		}))
	);

	const handleClickEditButton = () => {
		setActionPortofolio(portofolio);
		setActionIdPortofolio(portofolio.id);
		document.getElementById("trigger-edit-portofolio")?.click();
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
