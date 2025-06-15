"use client";
import { useProgressBar } from "@/context/ProgressBarContext";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { startTransition } from "react";

type ProgressLinkProps = {
	href: string;
	children: React.ReactNode;
} & React.ComponentProps<"a">;

const ProgressLink = ({ href, children, ...rest }: ProgressLinkProps) => {
	const router = useRouter();
	const progress = useProgressBar();

	const navigateToDestination = (e: React.MouseEvent<HTMLAnchorElement>) => {
		e.preventDefault();
		progress.start();

		startTransition(() => {
			if (href) {
				router.push(href);
			}
			progress.done();
		});
	};

	return (
		<Link href={href} onClick={navigateToDestination} {...rest}>
			{children}
		</Link>
	);
};

export default ProgressLink;
