import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { ScrollTrigger } from "gsap/all";
gsap.registerPlugin(ScrollTrigger);

export default function Page3() {
	const page3 = useRef<HTMLDivElement>(null);
	gsap.defaults({ duration: 3 });

	useGSAP(() => {
		gsap.to(".page3 .ai-span", {
			scrollTrigger: {
				trigger: ".page3",
				start: "top 20%",
				end: "top 10%",
				scrub: 2,
				toggleActions: "restart none reverse none"
			},
			duration: 1,
			ease: "power2.inOut",
			backgroundSize: "100% 100%",
		});
		// gsap.from(".page3", {
		// 	scrollTrigger: {
		// 		trigger: ".page3",
		// 		start: "top bottom",
		// 		end: "+=20%",
		// 		scrub: 2,
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
			ref={page3}
			className="absolute top-0 left-0 flex items-center justify-center w-screen h-screen px-5 text-gray-800 bg-gray-100 page page3">
			<div className="flex items-center justify-center">
				<p className="max-w-screen-md sm:text-4xl text-2xl sm:leading-[3rem] leading-10 tracking-wide text-center font-black">
					Introducing <span className="px-3 rounded-full ai-span">Live Chat</span> of
					The Future.
				</p>
			</div>
		</div>
	);
}
