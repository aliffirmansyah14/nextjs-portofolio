"use client";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DialogDescription } from "@radix-ui/react-dialog";
import { Plus } from "lucide-react";
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
	// console.log(state?.error);

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant="outline" className="rounded-xl">
					Add <Plus />
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px] rounded-xl">
				<form action={formAction} className="space-y-4">
					<DialogHeader>
						<DialogTitle>Add Portofolio</DialogTitle>
						<DialogDescription className="text-muted-foreground text-sm">
							create data portofolio{" "}
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
								// defaultValue={(state?.field["name"] as string) ?? ""}
								required
							/>
							{/* {state?.error?.name && (
								<p className="text-red-500">{state.error.name} </p>
							)} */}
						</div>
						<div className="grid gap-3">
							<Label htmlFor="category">Category</Label>
							<SelectCategory categories={allCategories} />
						</div>
						<div className="grid gap-3">
							<Label htmlFor="tech">Tech stack</Label>
							<Input
								type="text"
								id="tech"
								name="tech"
								placeholder="react js"
								required
							/>
						</div>
						<div className="grid gap-3">
							<Label htmlFor="image">Tech stack</Label>
							<Input
								type="file"
								id="image"
								name="image"
								accept="image/*"
								required
							/>
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
