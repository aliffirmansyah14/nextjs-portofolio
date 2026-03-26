import { useState, useEffect } from "react";

export function useActiveSection(sectionId?: string) {
	const [activeSection, setActiveSection] = useState("home");
	// const [isRendered, setIsRendered] = useState<boolean>(false);

	useEffect(() => {
		if (typeof window === "undefined") return; // Ensure this runs only on the client side

		if (window.innerWidth < 768) return;
		const sections = document.querySelectorAll("section[id]");

		const observerOptions = {
			root: null,
			rootMargin: "0px",
			threshold: 0.25,
		};

		const observerCallback = ([entries]: IntersectionObserverEntry[]) => {
			if (entries.isIntersecting) {
				setActiveSection(entries.target.id);
			}
			// const visibleSections = entries.filter(entry => entry.isIntersecting);
			// if (visibleSections.length > 0) {
			// 	const mostVisibleSection = visibleSections.reduce((prev, current) =>
			// 		prev.intersectionRatio > current.intersectionRatio ? prev : current
			// 	);
			// 	setActiveSection(mostVisibleSection.target.id);
			// }
		};

		const observer = new IntersectionObserver(
			observerCallback,
			observerOptions
		);

		sections.forEach(section => observer.observe(section));

		return () => observer.disconnect();
	}, []);

	// useEffect(() => {
	// 	if (isRendered) return;
	// 	if (activeSection === sectionId) {
	// 		setIsRendered(true);
	// 	}
	// }, [activeSection]);

	return activeSection;
}
