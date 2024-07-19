import { Outlet } from "react-router-dom";
import NavBar from "./components/NavBar";

function App() {
	return (
		<div className="max-w-[100dvw] max-h-[100dvh] overflow-scroll app">
			<NavBar />
			<Outlet />
			<p className="">footer</p>
		</div>
	);
}

export default App;
