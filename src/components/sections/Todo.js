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
			"flex flex-row gap-2 items-start justify-center place-items-center";
		container.setAttribute("data-todo-id", todoId || "empty");

        const isDisabled = arguments.length === 0 ? true : false
		const checkBox = CheckBoxComponent(isDisabled, todoComplete || false);
		const title = FakeTextTextareaComponent(todoTitle, "title");
        if (!title) {
			throw new Error(
				"Could not add todo title input: An error occured during it creation, please investivate.",
			);
        }

		const note = FakeTextTextareaComponent(
			todoNote,
			"note",
			"SM",
			"LIGHT",
			false,
		);
		if (!note) {
			throw new Error(
				"Could not add note input: An error occured during it creation, please investivate.",
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

		const emptyTodo = TodoComponent();
		if (!emptyTodo) {
			throw new Error(
				"Could not created empty todoComponent, resulted in a null value",
			);
		}
        // add an empty to the end of the list
		fragment.appendChild(emptyTodo);

		const listOfTodoWrapper = document.createElement("div");
		listOfTodoWrapper.className = "w-full";
		listOfTodoWrapper.appendChild(fragment);

		return listOfTodoWrapper;
	} catch (error) {
		console.error;
		return null;
	}
}

/**@param {string} elementId - id the corrisponse to the element you would like to select*/
export function appendTodoFromStroageToElement(elementId) {
	try {
		const todosInLocalStorage = RenderTodosFromStorage();
		if (!todosInLocalStorage) {
			throw new Error(
				"Could not render Todo from storage, an error occurs in the process",
			);
		}

		const listElement = document.getElementById(elementId);
		if (!listElement) {
			throw new ReferenceError(
				`Could not access wrapper for list of todo, element with id: ${elementId} is not currently in the DOM`,
			);
		}

        while (listElement.firstChild) {
            listElement.removeChild(listElement.firstChild)
        }

		listElement.appendChild(todosInLocalStorage);
	} catch (error) {
		console.log(error);
	}
}
