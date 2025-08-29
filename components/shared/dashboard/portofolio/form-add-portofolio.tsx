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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { use, useActionState } from "react";
import { createPortofolio } from "@/lib/action";
import SelectCategory from "./select-category";

type FormAddPortofolioProps = {
	categories: Promise<{ id: string; name: string }[]>;
};

const FormAddPortofolio = ({ categories }: FormAddPortofolioProps) => {
	const allCategories = use(categories);
	const [state, formAction, isPending] = useActionState(
		createPortofolio,
		undefined
	);

	return (
		<Dialog>
			<DialogOverlay />
			<DialogTrigger asChild>
				<button className="hidden" id="trigger-button-add-portofolio" />
			</DialogTrigger>

			<DialogContent className="sm:max-w-[425px] rounded-xl">
				<form action={formAction} className="space-y-4">
					<DialogHeader>
						<DialogTitle>Add Portofolio</DialogTitle>
						<DialogDescription className="text-muted-foreground text-sm">
							Create data portofolio
						</DialogDescription>
					</DialogHeader>
					<div className="grid gap-4">
						<div className="grid gap-3">
							<Label htmlFor="name">Name</Label>
							<Input
								type="text"
								id="name"
								name="name"
								placeholder="project wip"
								defaultValue={(state?.field["name"] as string) ?? ""}
								required
							/>
							{state?.error?.name && (
								<p className="text-red-500">{state.error.name} </p>
							)}
						</div>
						<div className="grid gap-3">
							<Label htmlFor="category">Category</Label>
							<SelectCategory
								defaultValue={state?.field["category"] as string}
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
								defaultValue={state?.field["tech"] as string}
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
									defaultValue={(state?.field["redirect"] as string) ?? ""}
									required
								/>
								{state?.error?.redirectUrl && (
									<p className="text-red-500">{state.error.redirectUrl} </p>
								)}
							</div>
						</div>
						<div className="grid gap-3">
							<Label htmlFor="image">Tech stack</Label>
							<Input type="file" id="image" name="image" accept="image/*" />
							{state?.error?.image && (
								<p className="text-red-500 text-xs">{state.error.image} </p>
							)}
						</div>
					</div>
					<DialogFooter>
						<DialogClose asChild>
							<Button variant="outline" className="rounded-xl">
								Cancel
							</Button>
						</DialogClose>
						<Button disabled={isPending} type="submit" className="rounded-xl">
							{isPending ? "Loading..." : "Submit"}
						</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
};

export default FormAddPortofolio;
