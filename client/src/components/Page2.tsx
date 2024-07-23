import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { ScrollTrigger } from "gsap/all";
gsap.registerPlugin(ScrollTrigger);

export default function Page2() {
	const page2 = useRef<HTMLDivElement>(null);
	gsap.defaults({ duration: 3 });

	useGSAP(() => {
		gsap.to(".page2 .ai-span", {
			scrollTrigger: {
				trigger: ".page2",
				start: "top 20%",
				end: "top 10%",
				scrub: 4,
			},
			duration: 1,
			ease: "power2.inOut",
			backgroundSize: "100% 100%",
		});
		// gsap.from(".page2", {
		// 	scrollTrigger: {
		// 		trigger: ".container",
		// 		start: "top bottom",
		// 		end: "top 70%",
		// 		scrub: 2,
		// 		// pin: true,
		// 		// pinSpacing: false,
		// 	},
		// 	ease: "power1.in",
		// 	duration: 1,
		// 	y: "30%",
		// 	scale: 0.8,
		// 	opacity: 0.8,
		// });
	}, {});

	return (
		<div
			ref={page2}
			className="absolute top-0 left-0 flex items-center justify-center w-screen h-screen px-5 text-gray-800 bg-gray-100 page page2">
			<div className="flex flex-col items-center justify-center gap-5">
				<p className="flex gap-2">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth={1.0}
						stroke="currentColor"
						className="p-1 rounded-full bg-white/50 size-8">
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418"
						/>
					</svg>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth={1.0}
						stroke="currentColor"
						className="p-1 rounded-full bg-white/50 size-8">
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
						/>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M15.91 11.672a.375.375 0 0 1 0 .656l-5.603 3.113a.375.375 0 0 1-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112Z"
						/>
					</svg>
				</p>
				<p className="max-w-screen-md sm:text-4xl text-2xl sm:leading-[3rem] leading-10 tracking-wide text-center ">
					Your world, your chat - empowered by Dalo. Enjoy a
					personalized messaging experience
					<span style={{}} className="px-3 rounded-full ai-span">
						that keeps you connected with the people
					</span>
					who matter most.
				</p>
			</div>
		</div>
	);
}
