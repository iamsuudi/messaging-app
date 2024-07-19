import Hero from "@/components/Hero";
import Page2 from "@/components/Page2";

function Home() {
	return (
		<div className="max-w-[100dvw] max-h-[100dvh] overflow-scroll app">
			<Hero />
			<Page2 />
			<p className="">footer</p>
		</div>
	);
}

export default Home;
