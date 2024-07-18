import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Link } from "react-router-dom";

export default function ErrorPage() {
	return (
		<div className="min-w-[100dvw] min-h-[100dvh] flex items-center justify-center">
			<Card className="flex flex-col items-center border-none">
				<CardHeader>
					<CardTitle className="text-4xl font-bold">Error Occurred 404!</CardTitle>
					<CardDescription>
						We couldn't load the page you are requesting.
					</CardDescription>
				</CardHeader>
				<CardContent>
					<Button>
						<Link to={"/"}>Go back to home page</Link>
					</Button>
				</CardContent>
				<CardFooter>
					{/* <p>Card Footer</p> */}
				</CardFooter>
			</Card>
		</div>
	);
}
