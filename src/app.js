import './assets/styles.css'
import { RenderHomePage } from "./views/home";

function pageRouter() {
	try {
		const mainContent = document.querySelector("#main-content");
		if (!mainContent || mainContent === undefined) {
			throw new ReferenceError("Could not find with id: main-content");
		}

        const homePage = RenderHomePage()
        if (homePage === undefined) { 
            throw new ReferenceError("Could not render the homepage: an attept to create it return an undefined value")
        }

		mainContent.appendChild(homePage);
	} catch (error) {
		console.error(error);
	}
}

pageRouter();
