"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authenticate } from "@/lib/action";
import { useActionState, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import ProgressLink from "../progress-link";

const LoginForm = () => {
	const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
	const [state, formAction, isPending] = useActionState(
		authenticate,
		undefined
	);

	const handleOnClickVisiblePassword = () =>
		setIsPasswordVisible(prevState => !prevState);

	return (
		<div className="w-full max-w-md border border-accent rounded-lg p-8 pb-12">
			<h1 className="mb-5 text-center font-semibold text-lg sm:text-2xl">
				Login
			</h1>
			<form className="space-y-4" action={formAction}>
				<div className="space-y-2">
					<Label>Email</Label>
					<Input
						type="email"
						name="email"
						placeholder="user@mail.com"
						defaultValue={(state?.field["email"] as string) ?? ""}
					/>
					{state?.error?.email && (
						<p className="text-red-500">{state.error.email} </p>
					)}
				</div>
				<div className="space-y-2">
					<Label>Password</Label>
					<div className="relative">
						<Input
							className="pe-10"
							type={isPasswordVisible ? "text" : "password"}
							name="password"
							placeholder="********"
							defaultValue={(state?.field["password"] as string) ?? ""}
						/>
						<TogglePasswordButton
							isVisible={isPasswordVisible}
							onClick={handleOnClickVisiblePassword}
						/>
					</div>
					{state?.error?.password && (
						<p className="text-red-500">{state.error.password} </p>
					)}
				</div>
				<Button
					type="submit"
					variant="secondary"
					className="w-full"
					disabled={isPending}
				>
					{isPending ? "Submiting..." : "Submit"}
				</Button>
			</form>
			<ProgressLink className="mt-2 block" href="/">
				<p className="text-sm text-blue-500 hover:underline">Back to home</p>
			</ProgressLink>
			<div
				className="flex h-8 items-end space-x-1"
				aria-live="polite"
				aria-atomic="true"
			>
				{state?.message && (
					<p className="text-xs text-red-500">{state.message}</p>
				)}
			</div>
		</div>
	);
};

export default LoginForm;

type TogglePasswordButtonProps = {
	isVisible: boolean;
	onClick: () => void;
};
const TogglePasswordButton = ({
	isVisible,
	onClick,
}: TogglePasswordButtonProps) => {
	return (
		<button
			type="button"
			className="absolute inset-y-0 end-0 flex items-center z-10 px-3 cursor-pointer text-gray-400 rounded-e-md focus:outline-hidden focus:text-white"
			onClick={onClick}
			aria-label={isVisible ? "Hide password" : "Show password"}
			aria-pressed={isVisible}
			aria-controls="password"
		>
			{isVisible ? (
				<EyeOff size={20} aria-hidden="true" />
			) : (
				<Eye size={20} aria-hidden="true" />
			)}
		</button>
	);
};
