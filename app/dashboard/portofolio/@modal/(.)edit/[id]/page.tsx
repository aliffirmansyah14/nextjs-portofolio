import FormEditPortofolio from "@/components/shared/dashboard/portofolio/form-edit-portofolio";
import Modal from "@/components/shared/modal";
import { getCategories, getPortofolioById } from "@/lib/api";
import {
	PortofolioType,
	selectedDataPortofolio,
} from "@/app/dashboard/portofolio/edit/[id]/page";
import { Suspense } from "react";
import LoadingSpinner from "@/components/shared/dashboard/portofolio/loading-spinner";

type EditModalProps = {
	params: Promise<{ id?: string }>;
};

const EditModal = async ({ params }: EditModalProps) => {
	const { id } = await params;

	if (!id) {
		return (
			<Modal title="Not Found Portofolio">
				<p className="text-xl">need params </p>
			</Modal>
		);
	}
	const portofolio = getPortofolioById(id, {
		...selectedDataPortofolio,
	}) as Promise<PortofolioType>;
	const categories = getCategories();
	// await new Promise(resolve => setTimeout(() => resolve, 3000));
	return (
		<Modal
			title="Form edit portofolio"
			description="Pastikan data sudah diisi dengan benar!"
		>
			<Suspense
				fallback={
					<div className="grid place-items-center">
						<LoadingSpinner className="text-white size-4" />
					</div>
				}
			>
				<FormEditPortofolio categories={categories} portofolio={portofolio} />
			</Suspense>
		</Modal>
	);
};
export default EditModal;
