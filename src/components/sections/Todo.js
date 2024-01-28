import { CheckBoxComponent } from "../inputs/CheckBox";
import { Priority } from "../../logic/todo";
import { HorizontalDividerComponent } from "../icons/HorizontalDivider";
import { Todo } from "../../logic/todo";

/**
 * Checks if all arguments are null.
 *
 * @param {...(string|number|boolean|null)} args - The arguments to check.
 * @returns { boolean } True if all arguments are null, false otherwise.
 *
 */
function checkAllArgumentsNull() {
	let i = 0;
	while (i < arguments.length) {
		if (arguments[i] !== null) {
			return false;
		}
		i++;
	}
	return true;
}

/**
 * @param { string | null } todoId
 * @param { string | null } todoTitle
 * @param { string | null } todoNote
 * @param { number | null } todoPriority
 * @param { boolean | null} todoComplete
 * @param { string | null } todoList
 *
 * */
export function TodoComponent(
	todoId = null,
	todoTitle = null,
	todoNote = null,
	todoPriority = null,
	todoComplete = null,
	todoList = null,
) {
	const container = document.createElement("div");
	container.className = "flex flex-row gap-2 justify-center place-items-center";

	const hr = HorizontalDividerComponent();

	if (
		checkAllArgumentsNull(
			todoId,
			todoTitle,
			todoNote,
			todoPriority,
			todoComplete,
			todoList,
		)
	) {
		// TODO: Temp fix, made a wrapper but styles are not perfect fix but the look of the whole todo componet

		const todoWrap = document.createElement("div");
		todoWrap.className = "w-full";

		container.setAttribute("data-todo-id", "empty");
		const checkBox = CheckBoxComponent();

		const wrapper = document.createElement("div");
		wrapper.className = "w-full";

		const h3 = document.createElement("h3");
		h3.className = "h-3";

		const contentPlaceholder = document.createElement("div");
		contentPlaceholder.className = "h-4";

		wrapper.appendChild(h3);
		wrapper.appendChild(contentPlaceholder);

		container.appendChild(checkBox);
		container.appendChild(wrapper);

		todoWrap.appendChild(container);
		todoWrap.appendChild(hr);

		return todoWrap;
	} else {
		let priority;
		switch (todoPriority) {
			case Priority.HIGH:
				priority = "!!!";
				break;
			case Priority.MEDIUM:
				priority = "!!";
				break;
			case Priority.LOW:
				priority = "!";
				break;
			default:
				priority = "";
				break;
		}

		if (todoComplete === null) {
			todoComplete = false;
		}

		container.setAttribute("data-todo-id", `${todoId === null ? "" : todoId}`);

		const checkBox = CheckBoxComponent(false, todoComplete);

		const wrapper = document.createElement("div");
		wrapper.className = "flex flex-col gap-2";

		const title = document.createElement("h3");
		title.className = "text-text text-xl font-bold";
		title.textContent = todoTitle;

		const noteAndContentWrapper = document.createElement("div");
		noteAndContentWrapper.className =
			"flex flex-row gap-1 justify-center content-between text-text font-medium text-xs";

		const note = document.createElement("p");
		note.textContent = `${todoNote === null ? "" : todoNote}`;

		const listAndPriorityWrapper = document.createElement("div");
		listAndPriorityWrapper.className = "flex flex-row gap-2";

		const list = document.createElement("p");
		list.className = `${todoList === null ? "" : "bg-secondary rounded-lg text-text font-semibold"}`;
		list.textContent = `${todoList === null ? "" : todoList}`;

		const displayPriority = document.createElement("p");
		displayPriority.className = `${priority === "" ? "" : "text-red-500"}`;
		displayPriority.textContent = priority;

		listAndPriorityWrapper.appendChild(list);
		listAndPriorityWrapper.appendChild(displayPriority);

		noteAndContentWrapper.appendChild(note);
		noteAndContentWrapper.appendChild(listAndPriorityWrapper);

		wrapper.appendChild(title);
		wrapper.appendChild(noteAndContentWrapper);

		container.appendChild(checkBox);
		container.appendChild(wrapper);
		container.appendChild(hr);

		return container;
	}
}

export function RenderTodosFromStorage() {
	const allTodos = Todo.allInstances;
	if (!allTodos || allTodos.length === 0) {
		return TodoComponent();
	}

	const fragment = document.createDocumentFragment();
	for (let i = 0; i < allTodos.length; i++) {
		fragment.appendChild(
			TodoComponent(
				allTodos[i].id,
				allTodos[i].title,
				allTodos[i].note,
				allTodos[i].priority,
				allTodos[i].complete,
				allTodos[i].list,
			),
		);
	}

	const listOfTodoWrapper = document.createElement("div");
	listOfTodoWrapper.className = "w-full";
	listOfTodoWrapper.appendChild(fragment);

	return listOfTodoWrapper;
}
