import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import ErrorPage from "./routes/ErrorPage";
import Signin from "./routes/Signin";
import Home from "./routes/Home";
import HomeIn from "./routes/authenticated/Home";
import Profile from "./routes/authenticated/Profile";
import Chats from "./routes/authenticated/Chats";
import Groups from "./routes/authenticated/Groups";
import PersonalChat from "./routes/authenticated/PersonalChat";

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
					path: "auth2",
					element: <Signin />,
				},
			],
		},
		{
			path: "/home",
			element: <HomeIn />,
			children: [
				{
					index: true,
					element: <Chats />,
				},
				{
					path: "profile",
					element: <Profile />,
				},
				{
					path: "groups",
					element: <Groups />,
				},
				{
					path: "chats/:chatId",
					element: <PersonalChat />,
				},
			],
		},
	]);

	return <RouterProvider router={router} />;
}
