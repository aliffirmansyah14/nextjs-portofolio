import Breadcrumbs from "@/components/shared/dashboard/Breadcrumbs";
import FormEditPortofolio from "@/components/shared/dashboard/portofolio/form-edit-portofolio";
import LoadingSpinner from "@/components/shared/dashboard/portofolio/loading-spinner";
import SiderbarTriggerMobile from "@/components/shared/dashboard/sidebar/sidebar-trigger-mobile";
import { Card, CardContent } from "@/components/ui/card";
import { getCategories, getPortofolioById } from "@/lib/api";
import { Prisma } from "@prisma/client";
import { redirect } from "next/navigation";
import { Suspense } from "react";

type EditPortofolioPageProps = {
	params: Promise<{ id?: string }>;
};
export const selectedDataPortofolio = {
	id: true,
	name: true,
	redirectUrl: true,
	category: {
		select: {
			id: true,
		},
	},
	tech: true,
	imageUrl: true,
};
export type PortofolioType = Prisma.ProjectGetPayload<{
	select: typeof selectedDataPortofolio;
}>;

const EditPortofolioPage = async ({ params }: EditPortofolioPageProps) => {
	const { id } = await params;
	if (!id) {
		redirect("/dashboard/portofolio");
	}
	const portofolio = getPortofolioById(id, {
		...selectedDataPortofolio,
	}) as Promise<PortofolioType>;
	const categories = getCategories();
	return (
		<>
			<header className="flex items-center mb-4">
				<SiderbarTriggerMobile />
				<Breadcrumbs
					list={[
						{ href: "/dashboard", label: "dashboard" },
						{ href: "/dashboard/portofolio", label: "portofolio" },
						{ href: "/dashboard/portofolio/edit", label: "edit" },
					]}
				/>
			</header>
			<Card>
				<CardContent>
					<Suspense
						fallback={
							<div className="h-[200px] flex justify-center items-center">
								<LoadingSpinner className="size-4" />
							</div>
						}
					>
						<FormEditPortofolio
							categories={categories}
							portofolio={portofolio}
						/>
					</Suspense>
				</CardContent>
			</Card>
		</>
	);
};

export default EditPortofolioPage;
