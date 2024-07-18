import React from "react";
import ReactDOM from "react-dom/client";
import "@fontsource/roboto";
import '@fontsource/caveat-brush';
import "./index.css";
import Router from "./router.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<Router />
	</React.StrictMode>
);
