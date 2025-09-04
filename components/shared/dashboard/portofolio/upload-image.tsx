"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { Trash2, X } from "lucide-react";
import { cn } from "@/lib/utils";
import PreviewImage from "./preview-image";

export type ResponseUploadType = {
	message?: string;
	errors?: Record<string, unknown>;
	success: boolean;
	url?: string;
};

type UploadImageProps = {
	isError?: boolean;
	onChange?: (file: File[]) => void;
	isPreviewOpen: boolean;
	image?: File | string;
	onClose?: () => void;
	Icon?: React.ReactNode;
};

const UploadImage = ({
	Icon,
	onChange,
	isError,
	image,
	isPreviewOpen,
	onClose,
}: UploadImageProps) => {
	const { getRootProps, getInputProps } = useDropzone({
		onDrop: onChange,
	});

	const handleOnClickClose = () => {
		onClose?.();
	};

	return (
		<div>
			{!isPreviewOpen && image === undefined ? (
				<>
					<div
						className={cn(
							"py-10 border-2 border-dashed rounded bg-accent/10 hidden md:block",
							{
								"border-red-500": isError,
							}
						)}
						{...getRootProps()}
					>
						<Input type="file" {...getInputProps()} />
						<Button
							type="button"
							variant={"outline"}
							className="mx-auto w-fit block"
						>
							Drag here or open file
						</Button>
					</div>
					<div {...getRootProps()}>
						<Input
							type="file"
							// onChange={handleOnUploadChange}
							{...getInputProps()}
						/>
						<Button
							type="button"
							variant={"outline"}
							className="w-full md:hidden"
						>
							open file
						</Button>
					</div>
				</>
			) : (
				<PreviewImage image={image} onClose={handleOnClickClose} Icon={Icon} />
			)}
		</div>

		// <Dialog
		// 	onOpenChange={open => {
		// 		if (!open) {
		// 			dialogOnClose();
		// 		}
		// 	}}
		// >
		// 	<DialogTrigger asChild>
		// 		<Button type="button" variant="outline" className="w-full">
		// 			Upload Image
		// 		</Button>
		// 	</DialogTrigger>
		// 	<DialogOverlay />
		// 	<DialogContent aria-describedby="upload-image">
		// 		<DialogHeader>
		// 			<DialogTitle>Upload Image</DialogTitle>
		// 			<DialogDescription>accept all image file</DialogDescription>
		// 			<div aria-label="result-message">
		// 				{result && <p className="text-sm">{result.message}</p>}
		// 				{result.errors &&
		// 					Object.keys(result.errors).map(error =>
		// 						Array.isArray(
		// 							result.errors?.[error as keyof typeof result.errors]
		// 						)
		// 							? (
		// 									result.errors[
		// 										error as keyof typeof result.errors
		// 									] as Array<string>
		// 							  ).map(e => (
		// 									<p key={e} className="text-red-600 text-sm">
		// 										{e}
		// 									</p>
		// 							  ))
		// 							: null
		// 					)}
		// 			</div>
		// 		</DialogHeader>
		// 		<div
		// 			className="py-10 border-2 border-dashed rounded bg-accent/10"
		// 			{...getRootProps()}
		// 		>
		// 			<Input
		// 				type="file"
		// 				className="w-fit mx-auto"
		// 				// onChange={handleOnUploadChange}
		// 				{...getInputProps()}
		// 			/>
		// 			<Button
		// 				type="button"
		// 				variant={"outline"}
		// 				className="mx-auto w-fit block"
		// 			>
		// 				Drag here or open file
		// 			</Button>
		// 		</div>
		// 		{previewImage && (
		// 			<div className="w-full flex justify-center">
		// 				<Image
		// 					width={100}
		// 					height={100}
		// 					src={previewImage}
		// 					alt="preview-image"
		// 					className="w-auto h-[200px]"
		// 				/>
		// 			</div>
		// 		)}
		// 		<Button
		// 			disabled={isPending || result.errors !== undefined}
		// 			className="w-full"
		// 			type="button"
		// 			onClick={handleUploadingImage}
		// 		>
		// 			{isPending ? (
		// 				<>
		// 					<LoadingSpinner /> Uploading..
		// 				</>
		// 			) : (
		// 				"Submit"
		// 			)}
		// 		</Button>
		// 	</DialogContent>
		// </Dialog>
	);
};

export default UploadImage;
