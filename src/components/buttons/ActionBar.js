import { AddButtonComponent } from "../buttons/AddButton";

function showCreateListModal() {}

function showCreateTodoModal() {}

/**
 * Create a simple Action Bar
 * @requires { showCreateListModal, showCreateTodoModal } - which have not been build yet so the event handles will not work 
 */
export function ActionBarComponent() {
	const addListBtn = AddButtonComponent("Add List");
	addListBtn.className = "flex flex-row items-center";

	const addTodoBtn = AddButtonComponent("Add Todo");
	addTodoBtn.className = "flex flex-row items-center";

	const buttonContainer = document.createElement("div");
	buttonContainer.className = "grid grid-cols-2 gap-3 h-4 max-w-[100%]";
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
