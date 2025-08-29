"use client";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogOverlay,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { createQueryString } from "@/lib/utils";
import { Search } from "lucide-react";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

const SearchInput = () => {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();
	const params = new URLSearchParams(searchParams.toString());
	const [text, setText] = useState<string>("");
	const [isOpen, setIsOpen] = useState(false);
	// const debaunceText = useDebounceValue(text, 1000);

	const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setText(e.target.value);
	};
	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			<DialogOverlay />
			<DialogTrigger asChild>
				<Button variant={"outline"} className="rounded-2xl flex ">
					<Search className="size-4" />
					<span className="hidden md:block">Search</span>
				</Button>
			</DialogTrigger>
			<DialogContent className="rounded-2xl bg-sidebar">
				<DialogTitle>Search potofolio</DialogTitle>
				<form
					onSubmit={e => {
						e.preventDefault();
						if (!text) {
							params.delete("search");
							router.push(`${pathname}?${params.toString()}`);
						} else {
							router.push(
								`${pathname}?${createQueryString(params, text, "search")}`,
								{
									scroll: false,
								}
							);
						}
						setText("");
						setIsOpen(false);
					}}
				>
					<Input
						type="text"
						placeholder="search here .."
						className="rounded-xl"
						name="text"
						value={text}
						onChange={e => handleOnChange(e)}
					/>
				</form>
			</DialogContent>
		</Dialog>
	);
};

export default SearchInput;
