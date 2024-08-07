import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { GemIcon, SquareUser, Users } from "lucide-react";

export default function Page5() {
	return (
		<div className="absolute top-0 flex items-center justify-center w-screen h-screen px-5 text-gray-800 bg-gray-100 page page5">
			<div className="flex flex-col items-center justify-center gap-20 diamonnd">
				<div className="flex items-center gap-2 p-1 pr-3 text-sm bg-white rounded-full diamond">
					<span className="p-1 bg-gray-200 rounded-full">
						<GemIcon className="size-4" />
					</span>
					Fast and secure
				</div>

				<div
					className="relative flex flex-col w-64 gap-2 p-4 text-white h-[25rem] rounded-3xl img-div"
					style={{
						backgroundImage: "Url('https://images.pexels.com/photos/3783522/pexels-photo-3783522.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')",
						backgroundSize: "cover",
						backgroundPosition: "center",
					}}>
					<div className="absolute flex gap-3 p-3 text-black bg-white rounded-lg shadow-lg w-fit sm:-right-40 -right-10 -top-14 face-to-face">
						<div className="flex items-center justify-center w-12 h-12 bg-black rounded-md shadow-lg">
							<SquareUser
								className="size-7"
								stroke="white"
								strokeWidth={1}
								strokeOpacity={0.8}
							/>
						</div>
						<span className="w-24">Face-to-face experience</span>
					</div>

					<div className="absolute flex items-center gap-3 p-2 px-3 text-black bg-white rounded-lg shadow-lg -z-10 w-fit sm:-left-36 -left-10 sm:-bottom-16 -bottom-20 customer-satisfaction">
						<div className="flex items-center justify-center w-12 h-12 bg-black rounded-md shadow-lg">
							<Users
								className="size-7"
								stroke="white"
								strokeWidth={1}
								strokeOpacity={0.8}
							/>
						</div>
						<div className="flex flex-col text-xl w-28">
							40%{" "}
							<span className="text-xs">
								Increase in customer satisfaction
							</span>
						</div>
					</div>

					<div className="absolute hidden w-56 gap-3 p-3 text-sm text-black rounded-lg md:flex -left-64 bottom-20 extra">
						Innovative features and user-friendly interface make it
						easier than ever to stay in touch with your loved ones.
					</div>

					<div className="absolute hidden w-56 gap-3 p-3 text-4xl font-black text-black rounded-lg md:flex -left-60 bottom-56 ">
						Chat Smart
					</div>

					<div className="absolute hidden w-56 gap-3 p-3 text-4xl font-black text-black rounded-lg md:flex -right-60 bottom-56 ">
						Chat Dalo.
					</div>

					<div className="flex justify-end gap-3 mb-auto">
						<span className="flex items-center justify-center w-8 h-8 font-serif text-xl font-bold rounded-full bg-white/50">
							T
						</span>
						<Avatar className="p-1 bg-white rounded-full backdrop-blur-sm size-8">
							<AvatarImage src="headset.png" />
							<AvatarFallback>Headphone</AvatarFallback>
						</Avatar>
					</div>

					<div className="flex items-center justify-between w-full text-sm">
						<p className="px-5 py-3 font-bold text-center rounded-full w-44 backdrop-blur-sm bg-black/80">
							Say Hello
						</p>
						<div className="flex items-center justify-center rounded-full h-11 w-11 from-rose-500 via-rose-400 to-sky-400 bg-gradient-to-br">
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

				<div className="w-full gap-3 p-3 mt-10 text-sm text-black rounded-lg sm:hidden extra">
					Innovative features and user-friendly interface make it
					easier than ever to stay in touch with your loved ones.
				</div>
			</div>
		</div>
	);
}
