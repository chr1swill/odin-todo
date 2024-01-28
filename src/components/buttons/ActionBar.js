import { AddButtonComponent } from "../buttons/AddButton";
import { showListModal, showTodoModal } from "../modals/Dialog";

/**
 * Create a simple Action Bar
 * @requires { showListModal, showTodoModal } - which have not been build yet so the event handles will not work
 */
export function ActionBarComponent() {
	const CLASSES_TO_REMOVE = ["bg-primary", "hover:bg-secondary"];
	const CLASSES_TO_ADD = ["bg-[none]", "hover:bg-primary"];

	const addListBtn = AddButtonComponent("Add List");
	const addTodoBtn = AddButtonComponent("Add Todo");

	for (let i = 0; i < CLASSES_TO_REMOVE.length; i++) {
		addListBtn.classList.remove(CLASSES_TO_REMOVE[i]);
		addTodoBtn.classList.remove(CLASSES_TO_REMOVE[i]);
	}

	for (let i = 0; i < CLASSES_TO_ADD.length; i++) {
		addListBtn.classList.add(CLASSES_TO_ADD[i]);
		addTodoBtn.classList.add(CLASSES_TO_ADD[i]);
	}

	const buttonContainer = document.createElement("div");
	buttonContainer.className = "grid grid-cols-2 gap-3 h-4 rounded max-w-[100%]";
	buttonContainer.append(addListBtn, addTodoBtn);

	// TODO: Add ability to add list and todo
	addListBtn.addEventListener("click", (e) => {
		e.preventDefault();
		showListModal();
	});

	addTodoBtn.addEventListener("click", (e) => {
		e.preventDefault();
		showTodoModal();
	});

	return buttonContainer;
}
