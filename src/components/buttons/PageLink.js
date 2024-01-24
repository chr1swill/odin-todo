import { ArrowComponent } from "../icons/Arrow";

/**
 * // TODO: MAY NOT WORK AFTER REFACTOR
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
 * @param { string } page - the page you want it to send you to
 * @param { string } title - text that will appear in the button
 */
export function PageLinkComponent(title, page) {
	const button = document.createElement("button");
	button.className =
		"flex flex-row items-center content-between border-text py-2 px-3 max-w-[100%]";
    const h3 = document.createElement("h3");
    h3.className = "text-text font-bold text-base";
    h3.textContent = title;
	button.append(h3, ArrowComponent());

	button.addEventListener("click", (event) => {
		event.preventDefault();
		changePage(page);// TODO: this may need some work after the refactor
	});

	return button;
}
