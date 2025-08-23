import { create } from "zustand";
import { portofoliosType } from "@/components/shared/table-portofolio";
interface PortofolioState {
	actionPortofolio: portofoliosType | null;
	actionIdPortofolio: string | null;
}

interface PortofolioAction {
	setActionPortofolio: (portofolio: portofoliosType | null) => void;
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
