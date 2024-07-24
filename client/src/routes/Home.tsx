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
import Page5 from "@/components/Page5";
import Page6 from "@/components/page6";

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
			t1.to(".page2 .ai-span", {
				ease: "power2.inOut",
				backgroundSize: "100% 100%",
			})
				.from(".page3", {
					yPercent: -100,
					ease: "power4.in",
					opacity: 0,
					scale: 2,
				})
				.to(".page3 .ai-span", {
					ease: "power2.inOut",
					backgroundSize: "100% 100%",
				})
				.from(".page4", { xPercent: 100, scale: 0 })
				.from(".page5", { opacity: 0, scale: 0 })
				// .from('.page5 .diamond', {yPercent: -100, scale: 0})
				// .from('.page5 .face-to-face', {yPercent: -150, scale: 0, xPercent: 100})
				// .from('.page5 .extra', {yPercent: -150, scale: 0, xPercent: -100})
				// .from('.page5 .customer-satisfaction', {yPercent: 150, scale: 0})
				.from(
					[
						".diamond",
						".face-to-face",
						".extra",
						".customer-satisfaction",
					],
					{
						scale: 0,
						opacity: 0,
						// stagger: 0.5,
					}
				);

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
					<Page5 />
				</div>
			</div>
			<Page6 />
			<p className="w-screen bg-red-300 h-96">footer</p>
			<p className="w-screen bg-blue-300 h-96">footer</p>
			<p className="w-screen bg-green-300 h-96">footer</p>
			<p className="w-screen bg-yellow-300 h-96">footer</p>
			<p className="w-screen bg-purple-300 h-96">footer</p>
		</div>
	);
}

export default Home;
