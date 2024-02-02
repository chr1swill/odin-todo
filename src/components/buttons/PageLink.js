import { ArrowComponent } from "../icons/Arrow";

/**
 * // TODO: MAY NOT WORK AFTER REFACTOR
 *
 * Changes the inner HTML of the main content container.
 * @param { HTMLElement | Node } htmlContent - HTML content to display.
 * @returns { void | null }
 */
function changePage(htmlContent) {
	try {
		const content = document.getElementById("main-content");
		if (!content) {
			throw new Error(
				"Unable to change page content: No 'main-content' element found",
			);
		}

		while (content.firstChild) {
			content.removeChild(content.firstChild);
		}

		content.appendChild(htmlContent);
	} catch (error) {
		console.error(error);
		return null;
	}
}

/**
 * @param {HTMLButtonElement} button
 * @param {HTMLButtonElement | Node} page
 */
function setUpButton(button, page) {
	const goToNextPage = () => changePage(page);
	button.addEventListener("click", goToNextPage);

	const observer = new MutationObserver((mutation) => {
		let i = 0;
		while (i < mutation.length) {
			if (!document.body.contains(button)) {
				button.removeEventListener("click", goToNextPage);
				observer.disconnect();
				break;
			}
			i++;
		}
	});
	observer.observe(document.body, { childList: true, subtree: true });
}

/**
 *
 * Creates a button that sends you to a different page
 * @param { string } title - text that will appear in the button
 * @param { HTMLElement | Node } page - the page you want it to send you to
 * @returns {HTMLButtonElement | null}
 */
export function PageLinkComponent(title, page) {
	try {
		const button = document.createElement("button");
		button.className =
			"flex flex-row place-items-center content-between border-text py-2 px-3 max-w-[100%]";
		const h3 = document.createElement("h3");
		h3.className = "text-text font-bold text-base";
		h3.textContent = title;
		button.append(h3, ArrowComponent());

		setUpButton(button, page);

		return button;
	} catch (error) {
		console.error(error);
		return null;
	}
}
