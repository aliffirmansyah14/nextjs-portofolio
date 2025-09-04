import { create } from "zustand";
interface PortofolioState {
	actionIdPortofolio: string | null;
}

interface PortofolioAction {
	setActionIdPortofolio: (id: string | null) => void;
}

export const useActionPortofolio = create<PortofolioState & PortofolioAction>()(
	set => ({
		actionIdPortofolio: null,
		setActionIdPortofolio: id =>
			set(() => ({
				actionIdPortofolio: id,
			})),
	})
);
