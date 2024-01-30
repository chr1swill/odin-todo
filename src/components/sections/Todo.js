import { CheckBoxComponent } from "../inputs/CheckBox";
import { Priority } from "../../logic/todo";
import { HorizontalDividerComponent } from "../icons/HorizontalDivider";
import { FakeTextInputComponent } from "../inputs/FakeTextInput";
import { FakeTextTextareaComponent } from "../inputs/FakeTextTextarea";
import { Todo } from "../../logic/todo";

/**@param { number | null } todoPriority */
function PriorityComponent(todoPriority) {
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

	return displayPriority;
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
	try {
		const container = document.createElement("div");
		container.className =
			"flex flex-row gap-2 justify-center place-items-center";
		container.setAttribute("data-todo-id", todoId || "empty");

		const checkBox = CheckBoxComponent(false, todoComplete || false);
		const title = FakeTextInputComponent(todoTitle, "title");
		const note = FakeTextTextareaComponent(
			todoNote,
			"note",
			"SM",
			"LIGHT",
			false,
		);
		if (!note) {
			throw new Error(
				"Could note create note: error occured will trying to create it please investigate.",
			);
		}
		const priority = PriorityComponent(todoPriority);
		const list = FakeTextInputComponent(
			todoList,
			"list",
			"XS",
			"SEMIBOLD",
			false,
		);
		const hr = HorizontalDividerComponent();

		const wrapper = document.createElement("div");
		wrapper.className = "w-full flex flex-col gap-2";

		const noteAndContentWrapper = document.createElement("div");
		noteAndContentWrapper.className =
			"flex flex-row gap-1 justify-center content-between";

		const listAndPriorityWrapper = document.createElement("div");
		listAndPriorityWrapper.className = "flex flex-row items-end gap-2";

		listAndPriorityWrapper.appendChild(list);
		listAndPriorityWrapper.appendChild(priority);
		noteAndContentWrapper.appendChild(note);
		noteAndContentWrapper.appendChild(listAndPriorityWrapper);
		wrapper.appendChild(title);
		wrapper.appendChild(noteAndContentWrapper);
		wrapper.appendChild(hr);
		container.appendChild(checkBox);
		container.appendChild(wrapper);

		return container;
	} catch (error) {
		console.error(error);
		return null;
	}
}

export function RenderTodosFromStorage() {
    try {
	const allTodos = Todo.allInstances;
	if (!allTodos || allTodos.length === 0) {
		return TodoComponent();
	}

	const fragment = document.createDocumentFragment();
	for (let i = 0; i < allTodos.length; i++) {
		const todo = TodoComponent(
			allTodos[i].id,
			allTodos[i].title,
			allTodos[i].note,
			allTodos[i].priority,
			allTodos[i].complete,
			allTodos[i].list,
		);
		if (!todo) {
			throw new Error(
				`Todo Component could not be created for list of Todos, Failed on increment: ${i}`,
			);
		}
		fragment.appendChild(todo);
	}

	const listOfTodoWrapper = document.createElement("div");
	listOfTodoWrapper.className = "w-full";
	listOfTodoWrapper.appendChild(fragment);

	return listOfTodoWrapper;
    } catch(error) {
        console.error
        return null
    }
}
