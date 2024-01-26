import './assets/styles.css'
import { RenderHomePage } from "./views/home";

function pageRouter() {
    document.body.className = "grid grid-cols-1 place-items-center mx-40 my-10"

	try {
		const mainContent = document.querySelector("#main-content");
		if (!mainContent || mainContent === undefined) {
			throw new ReferenceError("Could not find with id: main-content");
		}

        mainContent.className = "w-[calc(100%-4rem)]"

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
