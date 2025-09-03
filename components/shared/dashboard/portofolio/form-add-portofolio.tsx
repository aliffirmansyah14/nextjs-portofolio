"use client";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogOverlay,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { use, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
	createPortofolioFormSchema,
	createPortofolioFormType,
	uploadImageSchema,
} from "@/lib/schema";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
} from "@/components/ui/form";
import SelectCategory from "./select-category";
import { createPortofolio, uploadImageToBlob } from "@/lib/action";
import UploadImage from "./upload-image";
import { CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import LoadingSpinner from "./loading-spinner";

type FormAddPortofolioProps = {
	categories: Promise<{ id: string; name: string }[]>;
};

const defaultValuePortofolio = {
	category: "",
	name: "",
	redirectUrl: "",
	tech: "",
};

const FormAddPortofolio = ({ categories }: FormAddPortofolioProps) => {
	const allCategories = use(categories);
	const [errors, setErrors] = useState<Record<string, unknown>>({});
	const [message, setMessage] = useState("");
	const [image, setImage] = useState<File>();

	const form = useForm<createPortofolioFormType>({
		resolver: zodResolver(createPortofolioFormSchema),
		defaultValues: defaultValuePortofolio,
	});

	const onSubmit = async () => {
		if (errors["image"]) return;
		setErrors({});
		setMessage("");
		let rawData = form.getValues();
		if (image) {
			const responseUpload = await uploadImageToBlob(image);
			if (responseUpload.success) {
				rawData = { ...rawData, imageUrl: responseUpload.url };
			}
		}
		const result = await createPortofolio(rawData);

		if (result.errors) {
			setErrors(result.errors);
		}
		setMessage(result.message);
		form.reset(defaultValuePortofolio);
		setImage(undefined);
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

	const handleOnCloseUploadFile = () => {
		setImage(undefined);
	};

	const onAlertClose = () => {
		setMessage("");
	};
	return (
		<Dialog>
			<DialogOverlay />
			<DialogTrigger asChild>
				<button className="hidden" id="trigger-button-add-portofolio" />
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px] rounded-xl">
				<DialogHeader>
					<DialogTitle>Add Portofolio</DialogTitle>
					<DialogDescription className="text-muted-foreground text-sm">
						Create data portofolio
					</DialogDescription>

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
				</DialogHeader>
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

						<UploadImage
							isPreviewOpen={image !== undefined}
							image={image}
							isError={errors["image"] !== undefined}
							onChange={handleOnChangeInputFile}
							onClose={handleOnCloseUploadFile}
						/>

						<DialogFooter>
							<DialogClose asChild>
								<Button
									variant="outline"
									disabled={form.formState.isSubmitting}
									className="rounded-xl"
								>
									Cancel
								</Button>
							</DialogClose>
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
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
};

export default FormAddPortofolio;

const AlertForm = ({
	message,
	onClose,
}: {
	message: string;
	onClose?: () => void;
}) => {
	const [active, setIsActive] = useState<boolean>(message !== "");
	useEffect(() => {
		const timout = setTimeout(() => {
			setIsActive(false);
			onClose?.();
		}, 3000);
		return () => clearTimeout(timout);
	}, []);
	return (
		<div
			className={cn(
				"bg-green-400/30 flex gap-x-2 py-3 px-2 rounded items-center",
				{
					hidden: !active,
				}
			)}
		>
			<CheckCircle2 className="size-8" />
			<p>{message}</p>
		</div>
	);
};
