import { DefaultInputComponent } from "../inputs/DefaultInput";
import { DefaultButtonComponent } from "../buttons/DefaultButton";
import { DialogComponent, closeDialog } from "./Dialog";
import { ListController } from "../../logic/list";

/**
 * @param {{element: () => HTMLLabelElement, value: () => string, inputElement: () => HTMLInputElement}} input
 * @returns {void|null}
 */
function createNewList(input) {
	try {
		const listName = input.value();
		if (!listName) {
			throw new ReferenceError(
				"List was not created: Could not access access the value from inside the input",
			);
		}

		if (listName.trim() === "") {
			throw Error(
				"Invalid list name was provided, an attempt was made to create an list named an empty string",
			);
		}

		const lc = new ListController();
		lc.createList(listName.trim());
		input.inputElement().value = "";
		closeDialog("listModal");

		console.log(lc.getAllList());
		console.log(lc.getCurrentListNames());
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
