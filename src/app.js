import './assets/styles.css'
import { RenderHomePage } from "./views/home";

function pageRouter() {
	try {
		const mainContent = document.querySelector("#main-content");

		if (!mainContent) {
			throw new ReferenceError("Could not find with id: main-content");
		}

		mainContent.appendChild(RenderHomePage());
	} catch (error) {
		console.error(error);
	}
}

pageRouter();
