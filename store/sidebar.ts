import { create } from "zustand";

interface SidebarState {
	sidebar: {
		dekstop: boolean;
		mobile: boolean;
	};
}
interface SidebarAction {
	setDekstopSidebar: () => void;
	setMobileSidebar: () => void;
	setInitMobileSidebar: (isOpen: boolean) => void;
}

export const useSideBarZ = create<SidebarState & SidebarAction>()(set => ({
	sidebar: {
		dekstop: true,
		mobile: false,
	},
	setDekstopSidebar: () => {
		set(state => ({
			sidebar: {
				...state.sidebar,
				dekstop: !state.sidebar.dekstop,
			},
		}));
	},
	setMobileSidebar: () => {
		set(state => ({
			sidebar: {
				...state.sidebar,
				mobile: !state.sidebar.mobile,
			},
		}));
	},
	setInitMobileSidebar: isOpen => {
		set(state => ({
			sidebar: {
				...state.sidebar,
				mobile: !isOpen,
			},
		}));
	},
}));
