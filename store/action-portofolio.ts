import { PortofoliosType } from "@/components/shared/portofolio/projects";
import { create } from "zustand";
interface PortofolioState {
	actionPortofolio: PortofoliosType | null;
	actionIdPortofolio: string | null;
}

interface PortofolioAction {
	setActionPortofolio: (portofolio: PortofoliosType | null) => void;
	setActionIdPortofolio: (id: string | null) => void;
}

export const useActionPortofolio = create<PortofolioState & PortofolioAction>()(
	set => ({
		actionPortofolio: null,
		actionIdPortofolio: null,
		setActionPortofolio: portofolio =>
			set(() => ({
				actionPortofolio: portofolio,
			})),
		setActionIdPortofolio: id =>
			set(() => ({
				actionIdPortofolio: id,
			})),
	})
);
