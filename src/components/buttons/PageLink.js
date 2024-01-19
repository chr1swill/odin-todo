import { ArrowComponent } from "../icons/Arrow";

/**
 *
 * Changes the inner HTML of the main content container.
 * @param { string } htmlContent - HTML content to display.
 * @returns { void }
 */
function changePage(htmlContent) {
	try {
		const content = document.getElementById("main-content");
		if (!content) {
			throw new Error(
				"Unable to change page content: No 'main-content' element found",
			);
		}
		content.innerHTML = htmlContent;
	} catch (error) {
		console.error(error);
	}
}
/**
 *
 * Creates a button that sends you to a different page
 * @param { string } page - page the button sends you to
 * @param { string } title - Title of the button
 */
export function PageLinkComponent(title, page) {
	const button = document.createElement("button");
	button.className =
		"flex flex-row items-center content-between bg-background py-2 px-3 max-w-[100%]";
	button.innerHTML = `<h3 class="text-text font-bold text-base">${title}</h3>${ArrowComponent()}`;

	button.addEventListener("click", (event) => {
		event.preventDefault(); // Prevent the default button behavior
		changePage(page);
	});

	return button.outerHTML;
}
