import Hero from "@/components/Hero";
import Page2 from "@/components/Page2";
import Page3 from "@/components/Page3";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import { useRef } from "react";
import Page4 from "@/components/page4";
gsap.registerPlugin(ScrollTrigger);
import Lenis from "lenis";

function Home() {
	const pages = useRef(null);
	const lenis = new Lenis();

	useGSAP(
		() => {
			gsap.defaults({ duration: 1 });
			function raf(time: number) {
				lenis.raf(time);
				requestAnimationFrame(raf);
			}

			requestAnimationFrame(raf);
			const t1 = gsap.timeline();
			t1.from(".page2", {
				yPercent: 20,
				ease: "power4.in",
				scale: 0.8,
			})
				.to(".page2 .ai-span", {
					ease: "power2.inOut",
					backgroundSize: "100% 100%",
				})
				.from(".page3", {
					yPercent: 100,
					ease: "power4.in",
					opacity: 0,
					scale: 2,
				})
				.to(".page3 .ai-span", {
					ease: "power2.inOut",
					backgroundSize: "100% 100%",
				})
				.from(".page4", { xPercent: 100, scale: 0 });

			ScrollTrigger.create({
				animation: t1,
				trigger: ".pages",
				start: "top top",
				scrub: true,
				pin: true,
				end: "+=4000",
				anticipatePin: 1,
			});
		},
		{ scope: pages }
	);

	return (
		<div ref={pages} className="w-screen overflow-x-hidden app">
			<Hero />
			<div className="pages-wrapper">
				<div className="relative flex w-screen h-screen pages app">
					<Page2 />
					<Page3 />
					<Page4 />
				</div>
			</div>
			<p className="w-screen bg-red-300 h-96">footer</p>
			<p className="w-screen bg-blue-300 h-96">footer</p>
			<p className="w-screen bg-green-300 h-96">footer</p>
			<p className="w-screen bg-yellow-300 h-96">footer</p>
			<p className="w-screen bg-purple-300 h-96">footer</p>
		</div>
	);
}

export default Home;
