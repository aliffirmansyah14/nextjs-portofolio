import { getCategories } from "@/lib/api";
import FormDeletePortofolio from "./form-delete-portofolio";
import FormAddPortofolio from "./form-add-portofolio";
import { Suspense } from "react";
import LoadingSpinner from "./loading-spinner";

const FormPortofolio = async () => {
	const categories = getCategories();
	return (
		<>
			<Suspense fallback={<LoadingSpinner />}>
				<FormAddPortofolio categories={categories} />
				{/* <FormEditPortofolio categories={categories} /> */}
			</Suspense>
			<FormDeletePortofolio />
		</>
	);
};

export default FormPortofolio;
