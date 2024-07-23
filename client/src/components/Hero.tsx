import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import { useRef } from "react";
gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
	const hero = useRef(null);

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
					width: 0,
					ease: "elastic.in",
				});

			gsap.to(".scroll-one", {
				translateY: "50%",
				duration: 1,
				opacity: 1,
				scale: 1,
				ease: "bounce.inOut",
				delay: 1.5,
			});
			gsap.to(".scroll-one", {
				translateY: "50%",
				duration: 1.5,
				repeat: -1,
				ease: "power1.inOut",
				delay: 1.5,
			});

			gsap.to(".scroll-two", {
				translateY: "-50%",
				duration: 1,
				opacity: 1,
				scale: 1,
				ease: "bounce.inOut",
				delay: 2,
			});
			gsap.to(".scroll-two", {
				translateY: "-50%",
				duration: 2,
				repeat: -1,
				ease: "power1.inOut",
				delay: 2,
			});
			
			gsap.from(".side-icon", {
				stagger: 0.3,
				delay: 1,
				duration: 1,
				scale: 0,
				y: "100%",
				ease: "bounce.in",
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
						<div className="flex gap-5">
							<div className="flex items-center gap-3 p-1 text-white bg-black rounded-full h-fit link">
								<Link to={"/auth/signin"} className="pl-4 pr-3">
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
							</div>
							<div className="flex items-center gap-3 p-1 bg-gray-100 rounded-full h-fit link">
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
							</div>
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

			<div className="hidden items-center gap-10 xl:hidden  w-[40rem]">
				<div className="flex flex-col justify-center h-full gap-5">
					<Avatar className="p-1 size-14 from-rose-400 via-rose-300 to-sky-300 bg-gradient-to-br side-icon">
						<AvatarImage src="love.png" />
						<AvatarFallback>Message</AvatarFallback>
					</Avatar>
					<Avatar className="p-1 size-14 from-rose-400 via-rose-300 to-sky-300 bg-gradient-to-br side-icon">
						<AvatarImage src="headset.png" />
						<AvatarFallback>Headphone</AvatarFallback>
					</Avatar>
					<Avatar className="p-2 size-14 from-rose-400 via-rose-300 to-sky-300 bg-gradient-to-br side-icon">
						<AvatarImage src="cable.png" />
						<AvatarFallback>Connect</AvatarFallback>
					</Avatar>
				</div>

				<div className="flex justify-between w-full h-screen">
					<div className="flex flex-col gap-5 overflow-hidden">
						<ScrollPanelOne />
						<ScrollPanelOne />
					</div>
					<div className="flex flex-col gap-5 overflow-hidden">
						<ScrollPanelTwo />
						<ScrollPanelTwo />
					</div>
				</div>
			</div>
		</div>
	);
}

function ScrollItem() {
	return (
		<div
			className="flex flex-col gap-2 p-4 text-white w-60 h-96 rounded-3xl"
			style={{
				backgroundImage: "Url('pic3.jpg')",
				backgroundSize: "cover",
				backgroundPosition: "center",
			}}>
			<div className="flex justify-end gap-3 mb-auto">
				<span className="flex items-center justify-center w-8 h-8 font-serif text-xl font-bold rounded-full bg-white/50">
					T
				</span>
				<Avatar className="p-1 bg-white backdrop-blur-sm size-8">
					<AvatarImage src="headset.png" />
					<AvatarFallback>Headphone</AvatarFallback>
				</Avatar>
			</div>
			<p className="flex items-center gap-2 text-sm">
				<span className="p-1 rounded-full from-rose-500 via-rose-400 to-sky-400 bg-gradient-to-br side-icon">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth={1.0}
						stroke="currentColor"
						className="size-3">
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
						/>
					</svg>
				</span>
				<span>Hi Hanan,</span>
			</p>
			<p className="flex items-center gap-2 text-sm">
				<span className="p-1 rounded-full from-rose-500 via-rose-400 to-sky-400 bg-gradient-to-br">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth={1.0}
						stroke="currentColor"
						className="size-3">
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
						/>
					</svg>
				</span>
				<span>How are you doing?</span>
			</p>
			<p className="flex items-center gap-2 mb-1 text-sm">
				<span className="p-1 rounded-full from-rose-500 via-rose-400 to-sky-400 bg-gradient-to-br">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth={1.0}
						stroke="currentColor"
						className="size-3">
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
						/>
					</svg>
				</span>
				<span>Is that possible?</span>
			</p>
			<div className="flex items-center justify-between w-full text-sm">
				<p className="w-40 px-4 py-2 border-2 rounded-full backdrop-blur-sm bg-white/20 border-white/30">
					Type here...
				</p>
				<div className="flex items-center justify-center w-10 h-10 rounded-full from-rose-500 via-rose-400 to-sky-400 bg-gradient-to-br">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth={1.5}
						stroke="currentColor"
						className="size-5">
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M12 18.75a6 6 0 0 0 6-6v-1.5m-6 7.5a6 6 0 0 1-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 0 1-3-3V4.5a3 3 0 1 1 6 0v8.25a3 3 0 0 1-3 3Z"
						/>
					</svg>
				</div>
			</div>
		</div>
	);
}

function ScrollPanelOne() {
	return (
		<div className="flex flex-col gap-5 scale-0 -translate-y-1/2 opacity-0 scroll-one">
			<ScrollItem />
			<ScrollItem />
			<ScrollItem />
			<ScrollItem />
		</div>
	);
}

function ScrollPanelTwo() {
	return (
		<div className="flex flex-col-reverse gap-5 scale-0 -translate-y-1/2 opacity-0 scroll-two">
			<ScrollItem />
			<ScrollItem />
			<ScrollItem />
			<ScrollItem />
		</div>
	);
}
