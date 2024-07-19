import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import ErrorPage from "./routes/ErrorPage";
import Signin from "./routes/Signin";
import Home from "./routes/Home";
import HomeIn from "./routes/authenticated/Home";

export default function Router() {
	const router = createBrowserRouter([
		{
			path: "/",
			element: <App />,
			errorElement: <ErrorPage />,
			children: [
				{
					index: true,
					element: <Home />,
				},
				{
					path: "auth/signin",
					element: <Signin />,
				},
			],
		},
		{
			path: "/home",
			element: <HomeIn />
		}
	]);

	return <RouterProvider router={router} />;
}
