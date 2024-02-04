import './assets/styles.css'
import { RenderHomePage } from "./views/home";

function pageRouter() {
    document.body.className = "max-w-[1200px] grid grid-cols-1 mx-auto my-10 p-[2rem]"

	try {
		const mainContent = document.querySelector("#main-content");
		if (!mainContent || mainContent === undefined) {
			throw new ReferenceError("Could not find with id: main-content");
		}

        mainContent.className = "w-full"

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
