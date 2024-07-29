import { Outlet } from "react-router-dom";
import NavBar from "./components/NavBar";
import { ThemeProvider } from "./components/theme-provider";

function App() {
	return (
		<ThemeProvider defaultTheme="light">
			<div className="">
				<NavBar />
				<Outlet />
			</div>
		</ThemeProvider>
	);
}

export default App;
