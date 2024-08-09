import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import { useRef } from "react";
import { ArrowUpIcon } from "lucide-react";
gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
	const hero = useRef<HTMLDivElement>(null);
	const navigate = useNavigate();

	useGSAP(
		() => {
			const t1 = gsap.timeline({ defaults: { duration: 0.5 } });

			t1.from(".link", {
				stagger: 0.2,
				y: "50%",
				opacity: 0,
				scale: 0.5,
				duration: 1,
				ease: "back.in",
			})
				.from(".h1", {
					y: "10%",
					opacity: 0,
					scale: 0.9,
					ease: "power3.in",
				})
				.from(".p", {
					y: "20%",
					opacity: 0,
					scale: 0.9,
					ease: "power3.in",
				})
				.from(".hero-footer", {
					opacity: 0,
					xPercent: 100,
					ease: "elastic.in",
				});
		},
		{ scope: hero }
	);

	return (
		<div
			ref={hero}
			className="flex flex-wrap items-center justify-center w-full h-screen px-5 gap-x-10 gap-y-40">
			<div className="flex flex-col items-center w-full h-screen max-w-2xl pb-10">
				<div className="flex items-center w-full h-full">
					<div className="flex flex-col gap-7 max-w-96 sm:max-w-md">
						<p className="text-5xl sm:text-7xl h1">
							Empower communication viva DaloChat
						</p>
						<p className="text-sm  max-w-[22rem] text-black/50 p">
							<span className="text-black">
								Instant, real-time
							</span>{" "}
							communication, providing both{" "}
							<span className="text-black">
								visual connection
							</span>{" "}
							and{" "}
							<span className="text-black">
								immedaite answers
							</span>{" "}
							to users chats
						</p>
						<div className="z-10 flex gap-5">
							<button
								className="flex items-center gap-3 p-1 text-white bg-black rounded-full h-fit link"
								onClick={() => navigate("/auth2")}>
								<Link to={"/auth2"} className="pl-4 pr-3">
									Join
								</Link>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									strokeWidth={1.0}
									stroke="black"
									className="p-2 bg-white rounded-full size-8">
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25"
									/>
								</svg>
							</button>
							<button className="flex items-center gap-3 p-1 bg-gray-100 rounded-full h-fit link">
								<Link to={""} className="pl-4 pr-3 text-black">
									Learn More
								</Link>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									strokeWidth={1.0}
									stroke="black"
									className="p-2 bg-white rounded-full size-8">
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25"
									/>
								</svg>
							</button>
						</div>
					</div>
				</div>

				<div className="flex items-center w-full gap-5 overflow-scroll text-sm app hero-footer">
					<span className="hidden px-3 py-1 bg-gray-100 rounded-full sm:inline-block">
						Performant
					</span>
					<span className="hidden px-3 py-1 rounded-full sm:inline-block from-rose-400 via-rose-300 to-sky-300 bg-gradient-to-r">
						Revolutionary
					</span>
					<span className="hidden px-3 py-1 bg-gray-100 rounded-full sm:inline-block">
						Progressive
					</span>
					<span className="flex items-center gap-2 ml-auto">
						DaloChat.com
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth={1.5}
							stroke="currentColor"
							className="size-3">
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244"
							/>
						</svg>
					</span>
				</div>
			</div>
			<Button
				className="fixed z-30 rounded-lg bottom-3 right-3"
				onClick={() => {
					if (hero.current) {
						hero.current.scrollIntoView({ behavior: "smooth" });
					}
				}}>
				<ArrowUpIcon className="size-5" />
			</Button>
		</div>
	);
}
