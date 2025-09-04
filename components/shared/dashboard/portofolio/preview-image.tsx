import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import Image from "next/image";

const PreviewImage = ({
	image,
	onClose,
	Icon,
}: {
	Icon?: React.ReactNode;
	image: File | string | undefined;
	onClose: () => void;
}) => {
	const isImageFile = image instanceof File;
	return (
		<div className="w-full flex justify-between bg-secondary gap-x-5 py-2 px-3 border border-input ">
			<div className="flex-1 flex gap-x-2">
				<Image
					width={50}
					height={50}
					src={!isImageFile ? (image as string) : URL.createObjectURL(image)}
					alt="preview-image"
					className="h-[50px] rounded"
				/>
				<div className="space-y-1">
					<p className="text-sm">
						{!isImageFile ? image?.split("/")[3] : image.name}
					</p>
					{isImageFile && (
						<p className="text-sm">{image.size && image.size / 8} kb</p>
					)}
				</div>
			</div>
			<Button
				type="button"
				variant={"ghost"}
				className="size-6 rounded-full"
				onClick={onClose}
			>
				{Icon ? Icon : <X className="size-4" />}
			</Button>
		</div>
	);
};

export default PreviewImage;
