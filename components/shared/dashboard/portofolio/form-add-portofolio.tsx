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

const FormAddPortofolio = () => {
	console.log("dialog");
	return (
		<Dialog>
			<form>
				<DialogTrigger asChild>
					<Button variant="outline" className="rounded-xl">
						Add <Plus />
					</Button>
				</DialogTrigger>
				<DialogContent className="sm:max-w-[425px] rounded-xl">
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
							/>
						</div>
						<div className="grid gap-3">
							<Label htmlFor="tech">Tech stack</Label>
							<Input id="tech" name="tech" placeholder="react js" />
						</div>
					</div>
					<DialogFooter>
						<DialogClose asChild>
							<Button variant="outline" className="rounded-xl">
								Cancel
							</Button>
						</DialogClose>
						<Button type="submit" className="rounded-xl">
							Save changes
						</Button>
					</DialogFooter>
				</DialogContent>
			</form>
		</Dialog>
	);
};

export default FormAddPortofolio;
