"use client";
import { ChevronUp } from "lucide-react";

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { signOut, useSession } from "next-auth/react";
import { useState } from "react";
import { AuthError } from "next-auth";
import ProgressLink from "../../progress-link";
import { setOverFlowHBody } from "@/lib/utils";

export const UsernameButton = () => {
	const { data: session } = useSession();
	const [isLoading, setIsloading] = useState<boolean>(false);

	const handleOnClickLogout = async (
		e: React.MouseEvent<HTMLButtonElement>
	) => {
		e.preventDefault();
		try {
			setIsloading(true);
			await signOut();
		} catch (error) {
			if (error instanceof AuthError) {
				switch (error.type) {
					case "SignOutError":
						throw new Error("Logout error");
					default:
						throw new Error("Something Error");
				}
			}
			throw error;
		}
	};

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<button className="mt-auto px-2 hover:bg-primary/30 rounded w-full">
					<div className="py-1 w-full  flex justify-between">
						<span>{session?.user.name ? session.user.name : "Loading..."}</span>
						<ChevronUp />
					</div>
				</button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="w-56" align="start">
				<DropdownMenuLabel>My account</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuItem>
					<ProgressLink
						href="/"
						className="w-full cursor-pointer"
						callback={() => setOverFlowHBody()}
					>
						Home page
					</ProgressLink>
				</DropdownMenuItem>
				<DropdownMenuItem asChild variant="destructive">
					<button
						onClick={handleOnClickLogout}
						disabled={isLoading}
						className="w-full cursor-pointer"
					>
						Logout
					</button>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export default UsernameButton;
