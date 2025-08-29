"use client";

import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogOverlay,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { deletePortofolioById } from "@/lib/action";
import { useActionPortofolio } from "@/store/action-portofolio";
import { useRef, useTransition } from "react";

const FormDeletePortofolio = () => {
	const { actionIdPortofolio } = useActionPortofolio();
	const [isPending, startTransition] = useTransition();
	const buttonCloseRef = useRef<HTMLButtonElement>(null);

	return (
		<Dialog>
			<DialogOverlay />
			<DialogTrigger asChild>
				<button
					id="trigger-delete-portofolio"
					className="hidden pointer-events-auto"
				/>
			</DialogTrigger>
			<DialogContent showCloseButton={false}>
				<form
					action={async formData => {
						startTransition(async () => {
							if (!actionIdPortofolio) return;
							await deletePortofolioById(formData);
						});
						buttonCloseRef.current?.click();
					}}
				>
					<input
						type="text"
						name="id"
						defaultValue={actionIdPortofolio || ""}
						className="hidden"
						aria-hidden
					/>
					<DialogHeader>
						<DialogTitle>Apakah anda yakin</DialogTitle>
						<DialogDescription
							className="text-muted-foreground text-sm"
							aria-describedby="delete-portoflio"
						>
							Aksi ini akan menghapus permanen data portofolio dari database
							server
						</DialogDescription>
					</DialogHeader>
					<DialogFooter>
						<DialogClose asChild>
							<Button
								ref={buttonCloseRef}
								variant="outline"
								className="rounded-xl"
							>
								Close
							</Button>
						</DialogClose>
						<Button
							variant="destructive"
							type="submit"
							className="rounded-xl"
							disabled={isPending}
						>
							{isPending ? "Deleting..." : "Delete"}
						</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
};
export default FormDeletePortofolio;
