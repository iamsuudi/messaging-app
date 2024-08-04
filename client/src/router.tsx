import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import ErrorPage from "./routes/ErrorPage";
import Signin from "./routes/Signin";
import Home from "./routes/Home";
import HomeIn from "./routes/authenticated/Home";
import Profile from "./routes/authenticated/Profile";
import ChatsPage from "./routes/authenticated/Chats";
import GroupsPage from "./routes/authenticated/Groups";
import PersonalChat from "./routes/authenticated/PersonalChat";
import GroupChat from "./routes/authenticated/GroupChat";
import EditGroup from "./routes/authenticated/EditGroup";

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
					element: <ChatsPage />,
				},
				{
					path: "chats/:chatId",
					element: <PersonalChat />,
				},
				{
					path: "groups",
					element: <GroupsPage />,
				},
				{
					path: "groups/:groupId",
					element: <GroupChat />,
				},
				{
					path: "groups/:groupId/edit",
					element: <EditGroup />,
				},
				{
					path: "profile",
					element: <Profile />,
				},
			],
		},
	]);

	return <RouterProvider router={router} />;
}
