import { AddButtonComponent } from "../buttons/AddButton";

function showCreateListModal() {
	try {
		/**@type{ HTMLDialogElement | null }*/
		const dialog = document.querySelector("#listModal");
		if (!dialog) {
			throw new ReferenceError(
				"Was not able to show dialog element: could not find id listModal",
			);
		}

		dialog.show();
	} catch (error) {
		console.error(error);
	}
}

function showCreateTodoModal() {
	try {
		/**@type{ HTMLDialogElement | null }*/
		const dialog = document.querySelector("#todoModal");
		if (!dialog) {
			throw new ReferenceError(
				"Was not able to show dialog element: could not find id todoModal",
			);
		}

		dialog.show();
	} catch (error) {
		console.error(error);
	}
}

/**
 * Create a simple Action Bar
 * @requires { showCreateListModal, showCreateTodoModal } - which have not been build yet so the event handles will not work
 */
export function ActionBarComponent() {
	const CLASSES_TO_REMOVE = ["bg-primary", "hover:bg-secondary", "rounded"];
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
		showCreateListModal();
	});

	addTodoBtn.addEventListener("click", (e) => {
		e.preventDefault();
		showCreateTodoModal();
	});

	return buttonContainer;
}
