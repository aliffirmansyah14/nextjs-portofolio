import { useState, useEffect } from "react";

export function useActiveSection(defaultValue: string) {
	const [activeSection, setActiveSection] = useState(defaultValue);

	useEffect(() => {
		if (typeof window === "undefined") return; // Ensure this runs only on the client side

		if (window.innerWidth < 768) return;
		const sections = document.querySelectorAll("section[id]");

		const observerOptions = {
			root: null,
			rootMargin: "0px",
			threshold: 0.5,
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

	return activeSection;
}
