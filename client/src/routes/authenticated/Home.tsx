import { Link } from "react-router-dom";

export default function HomeIn() {
	return (
		<div className="flex flex-col w-screen h-screen">
			<nav className="w-full p-2 bg-gray-100">
				<span>Logo</span>
			</nav>
			<div className="flex w-full h-full">
				<aside className="flex flex-col gap-3 p-2">
					<Link to={""} className="px-3 py-1 border bg-slate-200">Chats</Link>
					<Link to={""} className="px-3 py-1 border bg-slate-200">Updates</Link>
					<Link to={""} className="px-3 py-1 border bg-slate-200">Communities</Link>
					<Link to={""} className="px-3 py-1 border bg-slate-200">Calls</Link>
				</aside>
				<div className="w-full h-full border">text here</div>
			</div>
		</div>
	);
}
