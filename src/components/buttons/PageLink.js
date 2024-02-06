import { ListController } from "../../logic/list";
import { toggleModalVisiblity } from "../modals/Dialog";
import { AddButtonComponent } from "./AddButton";

/**
 * // TODO: MAY NOT WORK AFTER REFACTOR
 *
 * @param {HTMLButtonElement} button
 * @returns { void | null }
 */
function changePage(button) {
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
		// render tile bar
		// render todos in list
		// render action bar
	} catch (error) {
		console.error(error);
		return null;
	}
}

/**
 * @param {HTMLButtonElement} button
 */
function setUpButton(button) {
	const goToNextPage = () => changePage(button);
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

/**@param {string} string */
function convertToKebab(string) {
	return string.trim().toLowerCase().replace(/\s+/g, "-");
}

/**@param {string} kebabCaseString */
function convertKebabToTitleCase(kebabCaseString) {
	const words = kebabCaseString.replace(/-/g, " ").split(" ");
	const capitalizedWords = words.map(
		(word) => word.charAt(0).toUpperCase() + word.slice(1),
	);
	return capitalizedWords.join(" ");
}

/**
 *
 * Creates a button that sends you to a different page
 * @param { string } listName - text that will appear in the button
 * @returns {HTMLButtonElement | null}
 */
export function PageLinkComponent(listName) {
	try {
		const button = document.createElement("button");
		button.className =
			"flex flex-row place-items-center content-between border-text py-2 px-3 max-w-[100%] text-text font-bold text-base";
		button.textContent = convertKebabToTitleCase(listName);
		button.setAttribute("data-page-target", listName);

		setUpButton(button);

		return button;
	} catch (error) {
		console.error(error);
		return null;
	}
}

/**@param {HTMLButtonElement} addList */
function setupAddListButton(addList) {
	const handleButtonClick = () => toggleModalVisiblity("listModal");
	addList?.addEventListener("click", handleButtonClick);

	const observer = new MutationObserver((mutation) => {
		let i = 0;
		while (i < mutation.length) {
			if (!document.body.contains(addList)) {
				addList.removeEventListener("click", handleButtonClick);
				observer.disconnect();
				break;
			}
			i++;
		}
	});
	observer.observe(document.body, { childList: true, subtree: true });
}

export function RenderNavBar() {
	try {
		const navBar = document.createElement("nav");
		navBar.className = "flex flex-row justify-end gap-2 w-full";
		const listController = new ListController();
		const listNames = listController.getListNames();
		if (listNames.length === 0) {
			const addList = AddButtonComponent("Add List");
			setupAddListButton(addList);
			navBar.appendChild(addList);
			return navBar;
		}

		const fragment = document.createDocumentFragment();
		let i = 0;
		while (i < listNames.length) {
			const pageLink = PageLinkComponent(listNames[i]);
			if (!pageLink) {
				throw new ReferenceError(
					"Could not create page link component, an attempt to reference element return a null value",
				);
			}
			fragment.appendChild(pageLink);
			i++;
		}

		navBar.appendChild(fragment);
		return navBar;
	} catch (error) {
		console.error(error);
		return null;
	}
}
