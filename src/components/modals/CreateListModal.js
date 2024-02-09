import { DefaultInputComponent } from "../inputs/DefaultInput";
import { DefaultButtonComponent } from "../buttons/DefaultButton";
import { DialogComponent, closeDialog } from "./Dialog";
import { ListController, processListCreation } from "../../logic/list";
import { rerenderPageLinks } from "../buttons/PageLink";

/**
 * @param {{element: () => HTMLLabelElement, value: () => string, inputElement: () => HTMLInputElement}} input
 * @returns {void|null}
 */
function createNewList(input) {
	try {
		const listCreated = processListCreation(input.value());
		if (!listCreated) {
			throw new Error("Failed to created list an error occured in the process");
		}

		input.inputElement().value = "";
		closeDialog("listModal");
		const navBar = document.querySelector("[data-nav-bar]");
		if (!navBar) {
			throw new ReferenceError(
				"Could not find a nav element with the with attribute: data-nav-bar",
			);
		}
		const lc = new ListController();
		const cleanUp = lc.matchListRefsToTodoRefs();
		if (!cleanUp) {
			throw new Error(
				"Failed to clean up referenced to todo that do not have list value match list name.",
			);
		}

		rerenderPageLinks(navBar);
	} catch (error) {
		console.error(error);
		return null;
	}
}

/**
 * @param {HTMLButtonElement} createBtn
 * @param {{element: () => HTMLLabelElement, value: () => string, inputElement: () => HTMLInputElement}} input
 */
function setUpCreateBtn(createBtn, input) {
	const handleCreateNewList = () => createNewList(input);
	createBtn?.addEventListener("click", handleCreateNewList);

	const observer = new MutationObserver((mutation) => {
		let i = 0;
		while (i < mutation.length) {
			if (!document.body.contains(createBtn)) {
				createBtn.removeEventListener("click", handleCreateNewList);
				observer.disconnect();
				break;
			}
			i++;
		}
	});

	observer.observe(document.body, { childList: true, subtree: true });
}

/**@param {HTMLButtonElement} cancelBtn */
function setUpCancelBtn(cancelBtn) {
	const handleClosingDialog = () => closeDialog("listModal");
	cancelBtn?.addEventListener("click", handleClosingDialog);

	const observer = new MutationObserver((mutation) => {
		let i = 0;
		while (i < mutation.length) {
			if (!document.body.contains(cancelBtn)) {
				cancelBtn.removeEventListener("click", handleClosingDialog);
				observer.disconnect();
				break;
			}
			i++;
		}
	});

	observer.observe(document.body, { childList: true, subtree: true });
}

export function ListModalComponet() {
	const cancelBtn = DefaultButtonComponent("Cancel");
	const createBtn = DefaultButtonComponent("Create List", "submit", "sumbit");

	const btnContainer = document.createElement("div");
	btnContainer.className = "w-full grid grid-cols-2 gap-3";
	btnContainer.append(cancelBtn, createBtn);

	const input = DefaultInputComponent("List Name", true);

	const dialog = DialogComponent();
	dialog.element().setAttribute("id", "listModal");
	dialog.appendToForm(input.element());
	dialog.appendToForm(btnContainer);

	setUpCancelBtn(cancelBtn);
	setUpCreateBtn(createBtn, input);

	return dialog.element();
}
