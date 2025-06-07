import About from "@/components/shared/aboutme/about";
import Footer from "@/components/shared/footer/footer";
import Hero from "@/components/shared/hero/hero";
import Navbar from "@/components/shared/navbar";
import Portofolio from "@/components/shared/portofolio/portofolio";

export default function Home() {
	return (
		<>
			<Navbar />
			<main className="w-full">
				<Hero />
				<About />
				<Portofolio />
			</main>
			<footer className="w-full ">
				<div className="w-full h-px bg-gradient-to-r from-transparent via-border to-transparent"></div>
				<Footer />
			</footer>
		</>
	);
}
