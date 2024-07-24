import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import { useRef } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { ThumbsUpIcon, TrendingUpIcon, Users } from "lucide-react";
gsap.registerPlugin(ScrollTrigger);

export default function Page7() {
	const page7 = useRef(null);

	useGSAP(() => {
		gsap.from(".page7", {
			scale: 0.5,
			opacity: 0,
			scrollTrigger: {
				trigger: ".page7",
				start: "top 80%",
				end: "top 30%",
				scrub: true,
			},
		});
	}, {});

	return (
		<div
			ref={page7}
			className="flex items-center justify-center w-screen min-h-screen gap-20 px-5 py-20 text-gray-800 bg-white page7">
			<div className="relative flex flex-wrap items-center justify-center w-full max-w-lg p-10 bg-gray-100 lg:max-w-screen-xl lg:justify-between gap-y-32 md:p-20 rounded-3xl sm:p-16">
				<div className="flex flex-col justify-around w-full max-w-md gap-10 ">
					<div className="text-3xl font-bold leading-10 tracking-wider max-w-80 lg:font-medium lg:max-w-lg lg:text-5xl">
						Increase The Number Of Your Connections
					</div>
					<p className="text-sm max-w-96">
						Stay connected, stay informed, and stay secure with Dalo
						ChatApp. Our advanced features and robust security
						ensure that you can communicate with peace of mind. We
						keep your conversations safe and accessible at all
						times.
					</p>
					<div className="flex justify-center gap-5 w-fit h-fit">
						<Avatar className="p-1 bg-white rounded-full size-8 icon">
							<AvatarImage src="love.png" />
							<AvatarFallback>Message</AvatarFallback>
						</Avatar>
						<Avatar className="p-1 bg-white rounded-full size-8 icon">
							<AvatarImage src="headset.png" />
							<AvatarFallback>Headphone</AvatarFallback>
						</Avatar>
						<Avatar className="p-2 bg-white rounded-full size-8 icon">
							<AvatarImage src="cable.png" />
							<AvatarFallback>Connect</AvatarFallback>
						</Avatar>
					</div>
				</div>
				<div className="">
					<div className="absolute flex items-center gap-3 p-2 px-3 text-black bg-white rounded-lg shadow-lg top-[40%] left-[50%] z-10">
						<div className="flex items-center justify-center w-12 h-12 bg-black rounded-md shadow-lg">
							<TrendingUpIcon
								className="size-7"
								stroke="white"
								strokeWidth={1}
								strokeOpacity={0.8}
							/>
						</div>
						<div className="flex flex-col text-xl w-28">
							60%{" "}
							<span className="text-xs">
								Increase in your connections
							</span>
						</div>
					</div>

					<div
						className="relative flex flex-col w-64 gap-2 p-4 text-white h-[25rem] rounded-3xl img-div"
						style={{
							backgroundImage: "Url('pic2.jpg')",
							backgroundSize: "cover",
							backgroundPosition: "center",
						}}>
						<div className="absolute flex items-center justify-center w-12 h-12 bg-black rounded-md shadow-lg top-8 -left-8">
							<ThumbsUpIcon
								className="size-7"
								stroke="white"
								strokeWidth={1}
								strokeOpacity={0.8}
							/>
						</div>

						<div className="absolute flex items-center justify-center w-8 h-8 bg-white rounded-md shadow-2xl top-24 -left-8">
							<Users
								className="size-4"
								stroke="black"
								strokeWidth={1}
							/>
						</div>

						<div className="flex justify-end gap-3 mb-auto">
							<span className="flex items-center justify-center w-8 h-8 font-serif text-xl font-bold rounded-full bg-white/50">
								T
							</span>
							<Avatar className="p-1 bg-white rounded-full backdrop-blur-sm size-8 icon">
								<AvatarImage src="headset.png" />
								<AvatarFallback>Headphone</AvatarFallback>
							</Avatar>
						</div>

						<div className="flex items-center justify-between w-full bg-white rounded-full">
							<button className="flex items-center w-full gap-5 p-2 text-sm text-black">
								<Avatar className="p-1 size-8">
									<AvatarImage src="google.png" />
									<AvatarFallback>Gmail</AvatarFallback>
								</Avatar>
								<span>Leave us a review!</span>
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
