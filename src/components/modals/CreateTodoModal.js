import { DefaultTextareaComponent } from "../inputs/DefaultTextarea";
import { DefaultInputComponent } from "../inputs/DefaultInput";
import { DefaultDropdownComponent } from "../inputs/DefaultDropdown";
import { DefaultButtonComponent } from "../buttons/DefaultButton";
import { DialogComponent, closeDialog } from "./Dialog";
import { Todo, Priority } from "../../logic/todo";
import { appendTodoFromStroageToElement } from "../sections/Todo";

/**
 *  @param {{ element: () => HTMLLabelElement, value: () => string }} input
 *  @param {{ element: () => HTMLLabelElement, value: () => string }} textarea
 *  @param {{ element: () => HTMLDivElement, selectElement: () => HTMLSelectElement } | null} dropdown
 *  @returns {null|void}
 */
function createTodoFromChosenValue(input, textarea, dropdown) {
	try {
		const todoName = input.value();
		const todoNote = textarea.value();
		const selectInDropdown = dropdown?.selectElement();
		if (!selectInDropdown) {
			throw new Error("Could not find select element inside of dropdown");
		}
		const todoPriority =
			selectInDropdown.options[selectInDropdown.selectedIndex]?.textContent;

		if (!todoName || !todoNote || !todoPriority) {
			throw new Error(
				"Todo was not created: Could not access properties of todo",
			);
		}

		const todo = new Todo();
		todo.title = todoName;
		todo.note = todoNote;
		switch (todoPriority.toString().trim().toLowerCase()) {
			case "none":
				todo.priority = Priority.NONE;
				break;
			case "low":
				todo.priority = Priority.LOW;
				break;
			case "medium":
				todo.priority = Priority.MEDIUM;
				break;
			case "high":
				todo.priority = Priority.HIGH;
				break;
			default:
				todo.priority = Priority.NONE;
		}
	} catch (error) {
		console.error(error);
		return null;
	}
}

/**
 *  @param {string} elementIdToAppendTo
 *  @param {{ element: () => HTMLLabelElement, value: () => string }} input
 *  @param {{ element: () => HTMLLabelElement, value: () => string }} textarea
 *  @param {{ element: () => HTMLDivElement, selectElement: () => HTMLSelectElement } | null} dropdown
 *  @returns {null|void}
 */
function handleClickOnCreateBtn(
	elementIdToAppendTo,
	input,
	textarea,
	dropdown,
) {
	try {
		createTodoFromChosenValue(input, textarea, dropdown);
		appendTodoFromStroageToElement(elementIdToAppendTo);
		closeDialog("todoModal");
	} catch (error) {
		console.error(error);
		return null;
	}
}

/**
 *  @param {HTMLButtonElement} createBtn
 *  @param {string} elementIdToAppendTo
 *  @param {{ element: () => HTMLLabelElement, value: () => string }} input
 *  @param {{ element: () => HTMLLabelElement, value: () => string }} textarea
 *  @param {{ element: () => HTMLDivElement, selectElement: () => HTMLSelectElement } | null} dropdown
 *  @returns {null|void}
 */
function setUpCreateBtn(
	createBtn,
	elementIdToAppendTo,
	input,
	textarea,
	dropdown,
) {
	/**@returns{null|void}*/
	const handleClick = () =>
		handleClickOnCreateBtn(elementIdToAppendTo, input, textarea, dropdown);
	createBtn?.addEventListener("click", handleClick);

	const observer = new MutationObserver((mutation) => {
		let i = 0;
		while (i < mutation.length) {
			if (!document.body.contains(createBtn)) {
				createBtn.removeEventListener("click", handleClick);
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
	const closeTodoModal = () => closeDialog("todoModal");
	cancelBtn?.addEventListener("click", closeTodoModal);

	const observer = new MutationObserver((mutation) => {
		let i = 0;
		while (i < mutation.length) {
			if (!document.body.contains(cancelBtn)) {
				cancelBtn.removeEventListener("click", closeTodoModal);
				observer.disconnect();
				break;
			}
			i++;
		}
	});

	observer.observe(document.body, { childList: true, subtree: true });
}

/**@param {string} elementIdToAppendTo - when the new list will be append after creating a todo sucessfully */
export function TodoModalComponent(elementIdToAppendTo) {
	try {
		const cancelBtn = DefaultButtonComponent("Cancel");
		const createBtn = DefaultButtonComponent("Create Todo", "submit", "sumbit");

		const btnContainer = document.createElement("div");
		btnContainer.className = "w-full grid grid-cols-2 gap-3";
		btnContainer.append(cancelBtn, createBtn);

		const input = DefaultInputComponent("Title", true);
		const textarea = DefaultTextareaComponent("Notes", true);
		const dropdown = DefaultDropdownComponent("Choose Priority", [
			"None",
			"Low",
			"Medium",
			"High",
		]);

		const dialog = DialogComponent();
		dialog.element().setAttribute("id", "todoModal");
		dialog.appendToForm(input.element());
		dialog.appendToForm(textarea.element());

		if (!dropdown) {
			throw new ReferenceError(
				"Error created component: dropdown was not defined",
			);
		}

		dialog.appendToForm(dropdown.element());
		dialog.appendToForm(btnContainer);

		setUpCancelBtn(cancelBtn);
		setUpCreateBtn(createBtn, elementIdToAppendTo, input, textarea, dropdown);

		return dialog.element();
	} catch (error) {
		console.error(error);
		return null;
	}
}
