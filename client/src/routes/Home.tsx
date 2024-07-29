import Hero from "@/components/Hero";
import Page2 from "@/components/Page2";
import Page3 from "@/components/Page3";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import { useEffect, useRef } from "react";
import Page4 from "@/components/page4";
gsap.registerPlugin(ScrollTrigger);
import Lenis from "lenis";
import Page5 from "@/components/Page5";
import Page6 from "@/components/page6";
import Page7 from "@/components/page7";
import { useTheme } from "@/components/theme-provider";

function Home() {
	const pages = useRef(null);
	const lenis = new Lenis({ smoothWheel: true });
	const { setTheme } = useTheme();
	useEffect(() => {
		setTheme("light");
	}, [setTheme]);

	useGSAP(
		() => {
			gsap.defaults({ duration: 1 });
			function raf(time: number) {
				lenis.raf(time);
				requestAnimationFrame(raf);
			}

			requestAnimationFrame(raf);

			gsap.from(".page2 svg", {
				ease: "power4.in",
				rotate: 360,
				repeat: -1,
				scrollTrigger: {
					trigger: ".page2",
					scrub: true,
					start: "top bottom",
					end: "top top",
				},
			});

			const t1 = gsap.timeline();
			t1.to(".page2 .ai-span", {
				ease: "power2.inOut",
				backgroundSize: "100% 100%",
			})
				.to(".page2", {
					scale: 0,
					opacity: 0,
					background: "none",
					yPercent: 10,
				})
				.from(".page3", {
					ease: "power4.in",
					scale: 0,
					opacity: 1,
					background: "none",
					yPercent: -10,
				})
				.to(".page3 .ai-span", {
					ease: "power2.inOut",
					backgroundSize: "100% 100%",
				})
				.to(".page3", {
					scale: 1,
					opacity: 0,
					background: "none",
					yPercent: 10,
				})
				.from(".page4", {
					scale: 0,
					opacity: 1,
					background: "none",
					yPercent: -10,
				})
				.to(".page4", {
					scale: 1,
					opacity: 0,
					background: "none",
					yPercent: 10,
				})
				.from(".page5", {
					scale: 0,
					opacity: 0,
					background: "none",
					yPercent: -10,
				})
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
						stagger: 0.5,
					}
				);

			ScrollTrigger.create({
				animation: t1,
				trigger: ".pages",
				start: "top top",
				scrub: true,
				pin: true,
				end: "+=2000",
				anticipatePin: 1,
				// markers: true,
			});

			/* page 6 animations */
			gsap.utils.toArray(".page6 .card-right").forEach((card) => {
				gsap.from(card as unknown as gsap.DOMTarget, {
					xPercent: -50,
					yPercent: 50,
					opacity: 0.5,
					stagger: 1,
					scrollTrigger: {
						trigger: card as unknown as gsap.DOMTarget,
						scrub: 4,
						start: "top 90%",
						end: "top 60%",
					},
				});
			});
			gsap.utils.toArray(".page6 .card-left").forEach((card) => {
				gsap.from(card as unknown as gsap.DOMTarget, {
					xPercent: 50,
					yPercent: 50,
					opacity: 0.5,
					stagger: 1,
					scrollTrigger: {
						trigger: card as unknown as gsap.DOMTarget,
						scrub: 4,
						start: "top 90%",
						end: "top 60%",
					},
				});
			});

			/* page 7 animations */
			gsap.from(".page7", {
				scale: 0.9,
				yPercent: 10,
				scrollTrigger: {
					trigger: ".page7",
					start: "top 80%",
					end: "top 30%",
					scrub: true,
				},
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
			<Page7 />
			<p className="w-screen bg-red-300 h-96">footer</p>
			<p className="w-screen bg-blue-300 h-96">footer</p>
			<p className="w-screen bg-green-300 h-96">footer</p>
			<p className="w-screen bg-yellow-300 h-96">footer</p>
			<p className="w-screen bg-purple-300 h-96">footer</p>
		</div>
	);
}

export default Home;
