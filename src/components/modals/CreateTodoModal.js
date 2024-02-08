import { DefaultTextareaComponent } from "../inputs/DefaultTextarea";
import { DefaultInputComponent } from "../inputs/DefaultInput";
import { DefaultDropdownComponent } from "../inputs/DefaultDropdown";
import { DefaultButtonComponent } from "../buttons/DefaultButton";
import { DialogComponent, closeDialog } from "./Dialog";
import { TodoController, Priority } from "../../logic/todo";
import { appendTodoFromStroageToElement } from "../sections/Todo";
import { ArrowComponent } from "../icons/Arrow";

/**
 *  @param {{ element: () => HTMLLabelElement, value: () => string, inputElement: () => HTMLInputElement }} input
 *  @param {{ element: () => HTMLLabelElement, value: () => string, inputElement: () => HTMLTextAreaElement }} textarea
 *  @param {{ element: () => HTMLDivElement, selectElement: () => HTMLSelectElement, buttonElement: () => HTMLButtonElement} | null} dropdown
 *  @returns {string|null}
 */
function resetListModal(input, textarea, dropdown) {
	try {
		input.inputElement().value = "";
		textarea.inputElement().value = "";
		if (dropdown) {
			dropdown.buttonElement().textContent = "Choose Priority";
			dropdown.buttonElement().appendChild(ArrowComponent());
		}
		return "success";
	} catch (e) {
		console.error(e);
		return null;
	}
}

/**
 *  @param {{ element: () => HTMLLabelElement, value: () => string }} input
 *  @param {{ element: () => HTMLLabelElement, value: () => string }} textarea
 *  @param {{ element: () => HTMLDivElement, selectElement: () => HTMLSelectElement, buttonElement: () => HTMLButtonElement} | null} dropdown
 *  @returns {number|null}
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

		const tc = new TodoController();
		const newTodoId = tc.createTodo();
		if (!newTodoId) {
			throw new Error("Could not create a new todo, something went wrong");
		}
		const todo = tc.getTodo(newTodoId);
		if (!todo) {
			throw new ReferenceError(
				"Could not access you newly created todo, something went wrong",
			);
		}
		todo.title = todoName;
		todo.note = todoNote;
		switch (todoPriority.toString().trim()) {
			case "LOW":
				todo.priority = Priority.LOW;
				break;
			case "MEDIUM":
				todo.priority = Priority.MEDIUM;
				break;
			case "HIGH":
				todo.priority = Priority.HIGH;
				break;
			default:
				todo.priority = Priority.NONE;
		}
		const addTodoToStorage = tc.addTodo(todo);
		if (!addTodoToStorage) {
			throw new Error(
				"Something went wrong while trying to add you todo to local storage.",
			);
		}

		return 10;
	} catch (error) {
		console.error(error);
		return null;
	}
}

/**
 *  @param {string} elementIdToAppendTo
 *  @param {{ element: () => HTMLLabelElement, value: () => string, inputElement: () => HTMLInputElement }} input
 *  @param {{ element: () => HTMLLabelElement, value: () => string, inputElement: () => HTMLTextAreaElement }} textarea
 *  @param {{ element: () => HTMLDivElement, selectElement: () => HTMLSelectElement, buttonElement: () => HTMLButtonElement} | null} dropdown
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
		resetListModal(input, textarea, dropdown);
		closeDialog("todoModal");
	} catch (error) {
		console.error(error);
		return null;
	}
}

/**
 *  @param {HTMLButtonElement} createBtn
 *  @param {string} elementIdToAppendTo
 *  @param {{ element: () => HTMLLabelElement, value: () => string, inputElement: () => HTMLInputElement }} input
 *  @param {{ element: () => HTMLLabelElement, value: () => string, inputElement: () => HTMLTextAreaElement }} textarea
 *  @param {{ element: () => HTMLDivElement, selectElement: () => HTMLSelectElement, buttonElement: () => HTMLButtonElement} | null} dropdown
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
