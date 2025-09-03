"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

export type ResponseUploadType = {
	message?: string;
	errors?: Record<string, unknown>;
	success: boolean;
	url?: string;
};
// const initialResponse: ResponseUploadType = {
// 	success: false,
// };

type UploadImageProps = {
	isError: boolean;
	onChange: (file: File[]) => void;
	isPreviewOpen: boolean;
	image?: File;
	onClose: () => void;
	// onError?: (response: ResponseUploadType) => void;
	// onSucess?: () => void;
};

const UploadImage = ({
	onChange,
	isError,
	image,
	isPreviewOpen,
	onClose,
}: UploadImageProps) => {
	// const [_, startTransition] = useTransition();
	// const [result, setResult] = useState<ResponseUploadType>(initialResponse);
	const { getRootProps, getInputProps } = useDropzone({
		onDrop: onChange,
	});

	// const valiadteImage = (file: File) => {
	// 	const parsed = uploadImageSchema.safeParse({ image: file });
	// 	if (!parsed.success) {
	// 		setResult({
	// 			errors: { ...parsed.error.flatten().fieldErrors },
	// 			success: false,
	// 		});
	// 		setImage(undefined);
	// 		setPreviewImage("");
	// 		return;
	// 	}
	// 	setImage(file);
	// 	setPreviewImage(URL.createObjectURL(file));
	// };

	// const handleOnUploadChange = (e: React.ChangeEvent<HTMLInputElement>) => {
	// 	if (!e.target.files) return;
	// 	const file = e.target.files[0];
	// 	valiadteImage(file);
	// };

	// const handleUploadingImage = async () => {
	// 	if (!image) return;
	// 	startTransition(async () => {
	// 		const response = await uploadImageToBlob(image);
	// 		if (response.success) {
	// 			onSucess?.();
	// 			return;
	// 		}
	// 		onError?.(response as ResponseUploadType);
	// 		// setResult(response as ResponseType);
	// 	});
	// };

	const handleOnClickClose = () => {
		onClose();
	};
	// const dialogOnClose = () => {
	// 	setResult(initialResponse);
	// 	setPreviewImage("");
	// };

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
				<div className="w-full flex justify-between bg-secondary gap-x-2 py-2 px-3 border border-input ">
					<div className="flex-1 flex  gap-x-2">
						<Image
							width={50}
							height={50}
							src={URL.createObjectURL(image as File)}
							alt="preview-image"
							className="h-[50px] rounded"
						/>
						<div className="space-y-1">
							<p className="text-sm">{image?.name}</p>
							<p className="text-sm">{image?.size && image?.size / 8} kb</p>
						</div>
					</div>
					<Button
						type="button"
						variant={"ghost"}
						className="size-6 rounded-full"
						onClick={() => handleOnClickClose()}
					>
						<X className="size-4" />
					</Button>
				</div>
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
