"use client";
import { Button } from "@/components/ui/button";
import { startTransition, use, useState } from "react";
import { useForm } from "react-hook-form";
import {
	editPortofolioFormSchema,
	editPortofolioType,
	uploadImageSchema,
} from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import LoadingSpinner from "./loading-spinner";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import SelectCategory from "./select-category";
import { PortofolioType } from "@/app/dashboard/portofolio/edit/[id]/page";
import { useRouter } from "next/navigation";
import NotFoundButton from "../../not-found-button";
import UploadImage from "./upload-image";
import AlertForm from "./alert-form";
import {
	deleteImageInBlob,
	editPortofolio,
	uploadImageToBlob,
} from "@/lib/action";
import { Trash2 } from "lucide-react";

type FormEditPortofolioProps = {
	categories: Promise<{ id: string; name: string }[]>;
	portofolio: Promise<PortofolioType>;
};

const FormEditPortofolio = ({
	categories,
	portofolio,
}: FormEditPortofolioProps) => {
	const dataPortofolio = use(portofolio);
	const allCategories = use(categories);
	const router = useRouter();
	const [image, setImage] = useState<File | string | undefined>(
		dataPortofolio.imageUrl || undefined
	);
	const [errors, setErrors] = useState<Record<string, unknown>>({});
	const [message, setMessage] = useState("");
	const [isImageEdit, setIsImageEdit] = useState<boolean>(false);

	if (!dataPortofolio) {
		return (
			<div className="h-[250px] flex justify-center items-center">
				<NotFoundButton isRouteBack={true} />
			</div>
		);
	}

	const form = useForm<editPortofolioType>({
		resolver: zodResolver(editPortofolioFormSchema),
		defaultValues: {
			name: dataPortofolio.name,
			category: dataPortofolio.category.id,
			redirectUrl: dataPortofolio.redirectUrl,
			tech: dataPortofolio.tech.join(", "),
		},
	});

	const onSubmit = async () => {
		let newImageUrl = "";
		// check image ada apa nggk jika ada dihapus di blob
		if (dataPortofolio.imageUrl && dataPortofolio.imageUrl !== "") {
			const deleteOldImage = await deleteImageInBlob(dataPortofolio.imageUrl);
			if (!deleteOldImage.success) {
				setErrors(prev => ({
					...prev,
					deleteImage: ["error saat menghapus data lama"],
				}));
			}
		}
		// check kalo image baru di pilih, upload ke blob
		if (image instanceof File) {
			const uploadImage = await uploadImageToBlob(image);
			if (uploadImage.url) {
				newImageUrl = uploadImage.url;
			}
		}
		// kalo ada image baru atau dihapus image url fieldnya
		const rawData = {
			...form.getValues(),
			imageUrl:
				image instanceof File || image === undefined
					? newImageUrl
					: dataPortofolio.imageUrl,
		};

		// update portogolio data
		const responseEdit = await editPortofolio(rawData, dataPortofolio.id);
		if (!responseEdit.success) {
			setErrors(prev => ({
				...prev,
				...responseEdit.errors,
			}));
			return;
		}
		setMessage(responseEdit.message);
		form.reset(form.getValues());
	};

	const validateImage = (file: File) => {
		const parsed = uploadImageSchema.safeParse({ image: file });
		if (!parsed.success) {
			setErrors(prev => ({
				...prev,
				...parsed.error.flatten().fieldErrors,
			}));
			return false;
		}
		if (errors["image"]) {
			setErrors(prev => {
				delete prev["image"];
				return { ...prev };
			});
		}
		return true;
	};

	const handleOnChangeInputFile = (files: File[]) => {
		if (!files) return;
		if (files.length > 1) {
			setErrors({
				image: ["file hanya bisa 1 saja"],
			});
			return;
		}
		const isValid = validateImage(files[0]);
		if (isValid) {
			setImage(files[0]);
		}
	};

	const handleOnCloseUploadFile = async () => {
		setImage(undefined);
		setIsImageEdit(false);
	};

	const onAlertClose = () => {
		setMessage("");
	};

	return (
		<>
			<div className="space-y-2 mb-4">
				{message ? (
					<AlertForm message={message} onClose={onAlertClose} />
				) : null}
				{errors ? (
					<ul>
						{Object.keys(errors).map(error =>
							Array.isArray(errors?.[error as keyof typeof errors]) ? (
								(errors?.[error as keyof typeof errors] as Array<string>).map(
									e => (
										<li key={e}>
											<p className="text-red-400 text-sm">{e}</p>
										</li>
									)
								)
							) : (
								<li key={error}>
									<p className="text-red-400 text-sm">
										{errors[error as keyof typeof errors] as string}
									</p>
								</li>
							)
						)}
					</ul>
				) : null}
			</div>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
					<div className="grid md:grid-cols-2 gap-2">
						<FormField
							control={form.control}
							name="name"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Name</FormLabel>
									<FormControl>
										<Input placeholder="website keren" {...field} />
									</FormControl>
								</FormItem>
							)}
						/>
						<SelectCategory categories={allCategories} />
					</div>
					<FormField
						control={form.control}
						name="tech"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Tech stack</FormLabel>
								<FormControl>
									<Input placeholder="Mern stack, neon db" {...field} />
								</FormControl>
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="redirectUrl"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Redirect Url</FormLabel>
								<FormControl>
									<Input type="url" placeholder="https://" {...field} />
								</FormControl>
							</FormItem>
						)}
					/>
					{dataPortofolio.imageUrl && typeof image === "string" ? (
						<UploadImage
							isPreviewOpen={isImageEdit || dataPortofolio.imageUrl !== null}
							image={dataPortofolio.imageUrl}
							isError={errors["image"] !== undefined}
							onClose={handleOnCloseUploadFile}
							Icon={<Trash2 />}
						/>
					) : (
						<UploadImage
							isPreviewOpen={isImageEdit}
							image={image}
							isError={errors["image"] !== undefined}
							onChange={handleOnChangeInputFile}
							onClose={handleOnCloseUploadFile}
						/>
					)}

					<div className="flex gap-2">
						<Button
							variant="outline"
							disabled={form.formState.isSubmitting}
							className="ms-auto rounded-xl"
							type="button"
							onClick={() => {
								router.back();
							}}
						>
							Cancel
						</Button>

						<Button
							disabled={form.formState.isSubmitting}
							type="submit"
							className="rounded-xl"
						>
							{form.formState.isSubmitting ? (
								<>
									<span>
										<LoadingSpinner className="dark:text-white" />
									</span>
									Submitting...
								</>
							) : (
								"Submit"
							)}
						</Button>
					</div>
				</form>
			</Form>

			{/* <PreviewImage url={actionPortofolio?.imageUrl} /> */}
		</>
	);
};

export default FormEditPortofolio;

type PreviewImageProps = {
	url?: string | null;
};

// const PreviewImage = ({ url }: PreviewImageProps) => {
// 	const { actionPortofolio } = useActionPortofolio();
// 	return (
// 		<Dialog>
// 			<DialogOverlay className="bg-black/50 z-[60]" />
// 			<DialogTrigger asChild>
// 				<button
// 					className="hidden pointer-events-none"
// 					id="trigger-view-image"
// 				/>
// 			</DialogTrigger>
// 			<DialogContent className="z-[60]">
// 				<DialogHeader>
// 					<DialogTitle className="capitalize">
// 						{actionPortofolio?.name} Image
// 					</DialogTitle>
// 					<DialogDescription
// 						className="text-muted-foreground text-sm"
// 						aria-describedby="preview photo"
// 					>
// 						preview
// 					</DialogDescription>
// 				</DialogHeader>
// 				<div className="mt-4">
// 					<Image
// 						width={200}
// 						height={100}
// 						src={url ?? "https://placehold.co/400x200"}
// 						alt="image url"
// 						className="mx-auto w-auto h-auto"
// 					/>
// 				</div>
// 			</DialogContent>
// 		</Dialog>
// 	);
// };
