"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authenticate } from "@/lib/action";
import { useActionState } from "react";

const LoginPage = () => {
	const [state, formAction, isPending] = useActionState(
		authenticate,
		undefined
	);
	return (
		<div className="min-h-screen w-full sm:py-20 ">
			<main className="mx-auto max-w-md border border-accent rounded-lg p-8 pb-12">
				<h1 className="mb-5 text-center font-semibold text-lg sm:text-2xl">
					Login
				</h1>
				<form className="space-y-4" action={formAction}>
					<div className="space-y-2">
						<Label>Email</Label>
						<Input type="email" name="email" placeholder="user@mail.com" />
						{state?.error?.email && (
							<p className="text-red-500">{state.error.email} </p>
						)}
					</div>
					<div className="space-y-2">
						<Label>Password</Label>
						<Input type="password" name="password" placeholder="********" />
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
				<div
					className="flex h-8 items-end space-x-1"
					aria-live="polite"
					aria-atomic="true"
				>
					{state?.message && (
						<p className="text-sm text-red-500">{state.message}</p>
					)}
				</div>
			</main>
		</div>
	);
};

export default LoginPage;
