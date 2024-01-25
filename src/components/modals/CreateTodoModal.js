import { DefaultInputComponent } from "../inputs/DefaultInput";
import { DefaultTextareaComponent } from "../inputs/DefaultTextarea";
import { DefaultDropdownComponent } from "../inputs/DefaultDropdown";
import { DefaultButtonComponent } from "../buttons/DefaultButton";
import { DialogComponent } from "./Dialog";
import { Todo, Priority } from "../../logic/todo";
/**
 *
 * code may work but it need to be refactored to make use without the DOMParser object
 * going to refactor to make component return real htmlElements
 *
 * */
export function TodoModalComponent() {
	try {
		const cancelBtn = DefaultButtonComponent("Cancel");
		const createBtn = DefaultButtonComponent("Create Todo", "submit", "sumbit");

		const btnContainer = document.createElement("div");
		btnContainer.className = "grid grid-col-2 gap-3";
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
        dialog.element().setAttribute("id", "todoModal")
		dialog.appendToForm(input.element());
		dialog.appendToForm(textarea.element());

		if (!dropdown) {
			throw new ReferenceError(
				"Error created componenet: dropdown is undefined",
			);
		}

		dialog.appendToForm(dropdown.element());
		dialog.appendToForm(btnContainer);

		cancelBtn.addEventListener("click", (e) => {
			e.preventDefault();
			dialog.close();
		});

		createBtn.addEventListener("click", (e) => {
			e.preventDefault();
			try {
				const todoName = input.value();
				const todoNote = textarea.value();

				const selectInDropdown = dropdown.selectElement();
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
			}
		});

		return dialog.element();
	} catch (error) {
		console.error(error);
		return;
	}
}
