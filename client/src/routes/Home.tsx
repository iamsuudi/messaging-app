import Hero from "@/components/Hero";
import Page2 from "@/components/Page2";
import Page3 from "@/components/Page3";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
gsap.registerPlugin(ScrollTrigger);

function Home() {
	gsap.defaults({ duration: 3 });
	const t1 = gsap.timeline();

	useGSAP(() => {
		t1
			.to(".page2 .ai-span", {
				duration: 2,
				ease: "power2.inOut",
				backgroundSize: "100% 100%",
			})
			.from(".page3", {
				ease: "power1.in",
				duration: 1,
				y: "100%",
				scale: 2,
				opacity: 0,
			})
			.to(".page3 .ai-span", {
				duration: 1,
				ease: "power2.inOut",
				backgroundSize: "100% 100%",
			});

		ScrollTrigger.create({
			animation: t1,
			pin: true,
			anticipatePin: 1,
			trigger: ".container",
			start: "top top",
			scrub: 5,
		});
	}, {});

	return (
		<div className="">
			<Hero />
			<div className="container relative w-screen h-screen overflow-x-hidden app">
				<Page2 />
				<Page3 />
			</div>
			{/* <p className="w-screen h-96">footer</p> */}
		</div>
	);
}

export default Home;
