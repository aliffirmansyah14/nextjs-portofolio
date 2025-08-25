"use client";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogOverlay,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DialogDescription } from "@radix-ui/react-dialog";
import { startTransition, use, useEffect, useState } from "react";
import SelectCategory from "./select-category";
import { useActionPortofolio } from "@/store/action-portofolio";
import Image from "next/image";
import clsx from "clsx";
import { editPortofolio } from "@/lib/action";
import { useResettableActionState } from "@/hooks/useResettableActionState";

type FormEditPortofolioProps = {
	categories: Promise<{ id: string; name: string }[]>;
};

const FormEditPortofolio = ({ categories }: FormEditPortofolioProps) => {
	const [isImageEdit, setIsImageEdit] = useState<boolean>(false);
	const allCategories = use(categories);
	const { actionPortofolio, setActionPortofolio, actionIdPortofolio } =
		useActionPortofolio();
	const [state, formAction, isPending, reset] = useResettableActionState(
		editPortofolio.bind(null, actionIdPortofolio),
		undefined
	);
	useEffect(() => {
		console.log("state...");
	}, [isImageEdit]);

	return (
		<>
			<Dialog>
				<DialogOverlay />
				<DialogTrigger asChild>
					<button
						className="hidden pointer-events-none"
						id="trigger-edit-portofolio"
					/>
				</DialogTrigger>
				<DialogContent
					className={clsx(
						"sm:max-w-[425px] rounded-x flex flex-col max-h-[95%] sm:max-h-max"
					)}
					showCloseButton={false}
				>
					<form
						action={formData => {
							startTransition(async () => {
								await formAction(formData);
							});
							setActionPortofolio(null);
						}}
						className="space-y-4"
					>
						<DialogHeader>
							<DialogTitle>Edit Portofolio</DialogTitle>
							<DialogDescription
								className="text-muted-foreground text-sm"
								aria-describedby="edit-portoflio"
							>
								Edit data portofolio
							</DialogDescription>
						</DialogHeader>
						<div className="grid gap-4 pr-2 sm:pr-0 flex-1 overflow-y-auto scroll-w-sm scroll-track-dark ">
							<div className="grid gap-3">
								<Label htmlFor="name">Name</Label>
								<Input
									type="text"
									id="name"
									name="name"
									placeholder="project wip"
									defaultValue={
										(state?.field["name"] as string) ||
										"" ||
										actionPortofolio?.name
									}
									// required
								/>
								{state?.error?.name && (
									<p className="text-red-500 text-xs">{state.error.name} </p>
								)}
							</div>
							<div className="grid gap-3">
								<Label htmlFor="category">Category</Label>
								<SelectCategory
									defaultValue={
										(state?.field["category"] as string) ||
										actionPortofolio?.category.id ||
										""
									}
									categories={allCategories}
								/>
							</div>
							<div className="grid gap-3">
								<Label htmlFor="tech">Tech stack</Label>
								<Input
									type="text"
									id="tech"
									name="tech"
									placeholder="react js"
									required
									defaultValue={
										(state?.field["tech"] as string) ||
										actionPortofolio?.tech.join(", ") ||
										""
									}
								/>
								{state?.error?.tech && (
									<p className="text-red-500">
										{state.error.tech.map(t => (t += " "))}
									</p>
								)}
							</div>
							<div className="grid gap-4">
								<div className="grid gap-3">
									<Label htmlFor="redirectUrl">Project Url</Label>

									<Input
										type="text"
										id="redirectUrl"
										name="redirect"
										placeholder="https://github....."
										defaultValue={
											(state?.field["redirect"] as string) ||
											actionPortofolio?.redirectUrl ||
											""
										}
										required
									/>

									{state?.error?.redirectUrl && (
										<p className="text-red-500">{state.error.redirectUrl} </p>
									)}
								</div>
							</div>
							<div className="grid gap-3">
								<Label htmlFor="image">Image Url</Label>
								<div className="flex gap-2">
									<Input
										type="text"
										name="imageName"
										placeholder="https://github....."
										defaultValue={
											(state?.field["imageName"] as string) ||
											actionPortofolio?.imageUrl ||
											""
										}
										hidden
									/>
									{!isImageEdit && (
										<div className="w-full flex gap-2">
											<div
												className="flex-1"
												onClick={() => setIsImageEdit(true)}
											>
												<Input
													type="text"
													defaultValue={
														(state?.field["image"] as string) ||
														actionPortofolio?.imageUrl ||
														"tidak ada foto"
													}
													disabled
												/>
											</div>

											<Button
												type="button"
												variant="outline"
												className="rounded-xl"
												onClick={() =>
													document.getElementById("trigger-view-image")?.click()
												}
											>
												view
											</Button>
										</div>
									)}

									{isImageEdit && (
										<>
											<Input
												type="file"
												id="image"
												name="image"
												accept="image/*"
											/>
											<Button
												type="button"
												variant="outline"
												className="rounded-xl"
												onClick={() => setIsImageEdit(false)}
											>
												cancel
											</Button>
										</>
									)}
								</div>
								{state?.error?.image && (
									<p className="text-red-500 text-xs">{state.error.image} </p>
								)}
							</div>
						</div>
						<DialogFooter className="mt-5">
							<DialogClose
								asChild
								onClick={() => {
									setIsImageEdit(false);
									startTransition(() => reset());
								}}
							>
								<Button
									variant="outline"
									className="rounded-xl"
									id="btn-close-edit"
								>
									Cancel
								</Button>
							</DialogClose>
							<Button type="submit" className="rounded-xl" disabled={isPending}>
								{isPending ? "Loading..." : "Submit"}
							</Button>
						</DialogFooter>
					</form>
				</DialogContent>
			</Dialog>

			<PreviewImage url={actionPortofolio?.imageUrl} />
		</>
	);
};

export default FormEditPortofolio;

type PreviewImageProps = {
	url?: string | null;
};

const PreviewImage = ({ url }: PreviewImageProps) => {
	const { actionPortofolio } = useActionPortofolio();
	return (
		<Dialog>
			<DialogOverlay className="bg-black/50 z-[60]" />
			<DialogTrigger asChild>
				<button
					className="hidden pointer-events-none"
					id="trigger-view-image"
				/>
			</DialogTrigger>
			<DialogContent className="z-[60]">
				<DialogHeader>
					<DialogTitle className="capitalize">
						{actionPortofolio?.name} Image
					</DialogTitle>
					<DialogDescription
						className="text-muted-foreground text-sm"
						aria-describedby="preview photo"
					>
						preview
					</DialogDescription>
				</DialogHeader>
				<div className="mt-4">
					<Image
						width={200}
						height={100}
						src={url ?? "https://placehold.co/400x200"}
						alt="image url"
						className="mx-auto w-auto h-auto"
					/>
				</div>
			</DialogContent>
		</Dialog>
	);
};
