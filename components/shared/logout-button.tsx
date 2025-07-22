"use client";
import { Button, ButtonProps } from "@/components/ui/button";
import { AuthError } from "next-auth";
import { signOut } from "next-auth/react";
import { useState } from "react";

const LogoutButton = ({ className, ...rest }: ButtonProps) => {
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
						return {
							message: "Signout Error",
						};
					default:
						return {
							message: "Something error",
						};
				}
			}
			throw error;
		}
	};

	return (
		<Button
			onClick={handleOnClickLogout}
			disabled={isLoading}
			className={className}
			{...rest}
		>
			{!isLoading ? "Logout" : "Loading..."}
		</Button>
	);
};

export default LogoutButton;
