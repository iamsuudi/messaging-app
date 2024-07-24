import {
	CableIcon,
	HandHeartIcon,
	MessageCircleIcon,
	MoveUpRightIcon,
	RocketIcon,
	ShieldCheckIcon,
} from "lucide-react";

interface CardType {
	header: string;
	title: string;
	text: string;
	icon: JSX.Element;
}

type Prop = { card: CardType };

function Card({ card }: Prop) {
	return (
		<div className="flex flex-wrap items-center justify-between w-full max-w-lg bg-transparent lg:max-w-screen-lg lg:shadow rounded-3xl">
			<div className="flex items-center w-full h-56 max-w-lg gap-5 p-4 sm:gap-10 sm:p-7 rounded-l-3xl card-left">
				<div className="flex items-center justify-center w-10 h-10 bg-black rounded-full shadow-lg sm:h-12 sm:w-12">
					{card.icon}
				</div>
				<div className="flex flex-col gap-3 sm:w-80 w-72">
					<h2 className="px-5 text-sm font-medium border rounded-full sm:text-md w-fit">
						{card.title}
					</h2>
					<p className="font-medium text-md sm:text-lg">
						{card.text}
					</p>
				</div>
			</div>

			<div className="flex flex-col items-center justify-center w-full h-56 max-w-lg gap-1 p-4 bg-gray-100 sm:px-32 rounded-3xl card-right">
				<h2 className="font-medium">We are here to</h2>
				<p className="text-2xl font-bold">{card.header}</p>
			</div>
		</div>
	);
}

const cards: CardType[] = [
	{
		header: "Elevate Engagement",
		title: "Unlock the Power of Communication",
		text: `Our innovative features and user-friendly 
			interface make it easier than ever to stay in touch with your loved ones.`,
		icon: (
			<HandHeartIcon
				className="size-7"
				stroke="white"
				strokeWidth={1}
				strokeOpacity={0.8}
			/>
		),
	},
	{
		header: "Maintain Real-Time Chat",
		title: "instant Chat",
		text: `Experience the convenience of real-time messaging with a platform built for your needs.`,
		icon: (
			<MessageCircleIcon
				className="size-7"
				stroke="white"
				strokeWidth={1}
				strokeOpacity={0.8}
			/>
		),
	},
	{
		header: "Connect beyond boundaries",
		title: "no boundaries",
		text: `Our chat app breaks down barriers and brings people closer together, no matter the distance.`,
		icon: (
			<CableIcon
				className="size-7"
				stroke="white"
				strokeWidth={1}
				strokeOpacity={0.8}
			/>
		),
	},
	{
		header: "Protect Your Privacy",
		title: "Communicate freely and securely",
		text: `Our advanced technology ensures that your conversations are always protected and private.`,
		icon: (
			<ShieldCheckIcon
				className="size-7"
				stroke="white"
				strokeWidth={1}
				strokeOpacity={0.8}
			/>
		),
	},
];

export default function Page6() {
	return (
		<div className="relative flex flex-col items-center w-screen min-h-screen gap-20 px-5 py-32 text-gray-800 bg-white page6">
			<div className="flex items-center justify-center w-full sm:justify-between">
				<div className="absolute flex items-center gap-3 p-1 pr-5 text-xs bg-white border rounded-full bottom-4 left-3 sm:relative diamond">
					<span className="p-1 bg-gray-200 rounded-full">
						<RocketIcon className="size-3" />
					</span>
					unlocking value
				</div>
				<h1 className="text-4xl font-medium md:text-5xl">
					Our Benefits
				</h1>
				<button className="absolute flex items-center px-2 text-xs bottom-5 right-3 sm:relative">
					Explore all{" "}
					<span className="px-1 mx-1 rounded-full sm:relative bg-gradient-to-r from-rose-300 to-rose-200">
						benefits
					</span>{" "}
					<MoveUpRightIcon strokeWidth={1} size={16} />{" "}
				</button>
			</div>

			{cards.map((card) => {
				return <Card key={card.header} card={card} />;
			})}
		</div>
	);
}
