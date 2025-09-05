import { getCategories } from "@/lib/api";
import FormDeletePortofolio from "./form-delete-portofolio";
import FormAddPortofolio from "./form-add-portofolio";
import { Suspense } from "react";
import LoadingSpinner from "./loading-spinner";

const FormPortofolio = async () => {
	const categories = getCategories();
	return (
		<>
			<Suspense
				fallback={
					<div className="absolute z-20 size-full top-0 flex bg-black/50 justify-center items-center">
						<LoadingSpinner className="size-4 text-white" />
					</div>
				}
			>
				<FormAddPortofolio categories={categories} />
				{/* <FormEditPortofolio categories={categories} /> */}
			</Suspense>
			<FormDeletePortofolio />
		</>
	);
};

export default FormPortofolio;
