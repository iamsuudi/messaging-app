import app from "./app";
import { PORT } from "./utils/config";

app.listen(PORT, () => {
	console.log(`Server is listening on port ${PORT}`);
});
