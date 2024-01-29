import { CheckBoxComponent } from "../inputs/CheckBox";
import { Priority } from "../../logic/todo";
import { HorizontalDividerComponent } from "../icons/HorizontalDivider";
import { Todo } from "../../logic/todo";

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

	// TODO: Temp fix, made a wrapper but styles are not perfect fix but the look of the whole todo componet

	container.setAttribute(
		"data-todo-id",
		`${todoId === null ? "empty" : todoId}`,
	);

	/**@type {HTMLLabelElement}*/
	let checkBox;
	if (!todoComplete) {
		checkBox = CheckBoxComponent();
	} else {
		checkBox = CheckBoxComponent(false, todoComplete);
	}

	const wrapper = document.createElement("div");
	wrapper.className = "w-full flex flex-col gap-2";

	const title = document.createElement("h3");
	title.className = "min-h-[30px] text-text text-xl font-bold";
	title.textContent = `${todoTitle === null ? "" : todoTitle}`;

	const noteAndContentWrapper = document.createElement("div");
	noteAndContentWrapper.className =
		"flex flex-row gap-1 justify-center content-between text-text font-medium text-xs";

	const note = document.createElement("p");
	note.className = "min-h-[24px] text-text text-base font-medium";
	note.textContent = `${todoNote === null ? "" : todoNote}`;

	const listAndPriorityWrapper = document.createElement("div");
	listAndPriorityWrapper.className = "flex flex-row gap-2";

	const list = document.createElement("p");
	list.className = `${
		todoList === null ? "" : "bg-secondary rounded-lg text-text font-semibold"
	}`;
	list.textContent = `${todoList === null ? "" : todoList}`;

	/**@type { string }*/
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
	const displayPriority = document.createElement("p");
	displayPriority.className = "text-base text-red-500";
	displayPriority.textContent = priority;

	listAndPriorityWrapper.appendChild(list);
	listAndPriorityWrapper.appendChild(displayPriority);

	noteAndContentWrapper.appendChild(note);
	noteAndContentWrapper.appendChild(listAndPriorityWrapper);

	wrapper.appendChild(title);
	wrapper.appendChild(noteAndContentWrapper);
    wrapper.appendChild(hr)

	container.appendChild(checkBox);
	container.appendChild(wrapper);

	return container;
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
