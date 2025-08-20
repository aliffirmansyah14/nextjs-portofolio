import About from "@/components/shared/aboutme/about";
import Footer from "@/components/shared/footer/footer";
import Hero from "@/components/shared/hero/hero";
import Navbar from "@/components/shared/navbar";
import Portofolio from "@/components/shared/portofolio/portofolio";

export default async function Home({
	searchParams,
}: {
	searchParams: Promise<{ page?: string }>;
}) {
	const { page = "1" } = await searchParams;
	return (
		<>
			<Navbar />
			<main className="w-full">
				<Hero />
				<About />
				<Portofolio page={page} />
			</main>
			<div className="w-full h-px bg-gradient-to-r from-transparent via-border to-transparent"></div>
			<footer className="w-full ">
				<Footer />
			</footer>
		</>
	);
}
