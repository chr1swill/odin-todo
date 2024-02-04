import { CheckBoxComponent } from "../inputs/CheckBox";
import { Priority } from "../../logic/todo";
import { HorizontalDividerComponent } from "../icons/HorizontalDivider";
import { FakeTextInputComponent } from "../inputs/FakeTextInput";
import { FakeTextTextareaComponent } from "../inputs/FakeTextTextarea";
import { Todo } from "../../logic/todo";
import { ListController } from "../../logic/list";

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
 * @param {HTMLDivElement} container
 */
function rerenderTodoList(container) {
	const renderedTodoListWrapper = container?.parentElement;
	if (!renderedTodoListWrapper) {
		throw new ReferenceError(
			"Could not access parent element of the todo, an attempt to access it resulted in a null value",
		);
	}
	appendTodoFromStroageToElement(renderedTodoListWrapper);
}

/**
 * TODO: Add logic to handle changing the prioity, then add case to change for real
 *
 * @param {Event} e
 * @param {Todo} todo
 * @param {{element: HTMLLabelElement, input: HTMLInputElement}} checkBox
 * @param {{element: HTMLLabelElement, textarea: HTMLTextAreaElement}} title
 * @param {{element: HTMLLabelElement, textarea: HTMLTextAreaElement}} note
 * @param {{element: HTMLLabelElement, input: HTMLInputElement}} list
 */
function checkWhichElementEventWasOn(e, todo, checkBox, title, note, list) {
	switch (e.target) {
		case checkBox.input:
			todo.complete = checkBox.input.checked;
			break;
		case title.textarea:
			todo.title = title.textarea.value.trim();
			break;
		case note.textarea:
			todo.note = note.textarea.value.trim();
			break;
		case list.input:
			try {
				const List = new ListController();
				const createdListOrErr = List.createList(list.input.value);
				if (createdListOrErr === null) {
					throw new Error(
						`An Error occured while attempting to a created a list named: ${list.input.value}`,
					);
				}
				todo.list = list.input.value;
			} catch (error) {
				console.error(error);
				return null;
			}
			break;
		default:
			console.warn(
				"Event target has not been regester, no logic to handle change to element: ",
				e.target,
			);
	}
}

/**
 * @param {HTMLDivElement} container
 * @param {Event} e
 * @param {{element: HTMLLabelElement, input: HTMLInputElement}} checkBox
 * @param {{element: HTMLLabelElement, textarea: HTMLTextAreaElement}} title
 * @param {{element: HTMLLabelElement, textarea: HTMLTextAreaElement}} note
 * @param {{element: HTMLLabelElement, input: HTMLInputElement}} list
 */
function handleChangeEventOnTodoContainer(
	container,
	e,
	checkBox,
	title,
	note,
	list,
) {
	const todoId = container.getAttribute("data-todo-id");
	if (!todoId) {
		throw new ReferenceError(
			`There is no "data-todo-id" attribute on element: ${container}`,
		);
	}

	if (todoId === "empty") {
		const todoClass = new Todo();
		checkWhichElementEventWasOn(e, todoClass, checkBox, title, note, list);
		const renderedTodoListWrapper = container?.parentElement;
		if (!renderedTodoListWrapper) {
			throw new ReferenceError(
				"Could not access parent element of the todo, an attempt to access it resulted in a null value",
			);
		}

		appendTodoFromStroageToElement(renderedTodoListWrapper);
		return;
	}

	const todoMatchingId = Todo.getTodo(todoId);
	if (!todoMatchingId) {
		throw new ReferenceError(
			`There are no object in local storage with the id: ${todoId}`,
		);
	}

	checkWhichElementEventWasOn(e, todoMatchingId, checkBox, title, note, list);
	localStorage.setItem(todoId, JSON.stringify(todoMatchingId));
	if (e.target === checkBox.input) {
		rerenderTodoList(container);
	}
}

/**
 * @param {HTMLDivElement} container
 * @param {{element: HTMLLabelElement, input: HTMLInputElement}} checkBox
 * @param {{element: HTMLLabelElement, textarea: HTMLTextAreaElement}} title
 * @param {{element: HTMLLabelElement, textarea: HTMLTextAreaElement}} note
 * @param {{element: HTMLLabelElement, input: HTMLInputElement}} list
 */
function setupTodoContainer(container, checkBox, title, note, list) {
	/**@param {Event} e*/
	const changeEventHandler = (e) =>
		handleChangeEventOnTodoContainer(container, e, checkBox, title, note, list);
	container?.addEventListener("change", changeEventHandler);

	const observer = new MutationObserver((mutation) => {
		let i = 0;
		while (i < mutation.length) {
			if (!document.body.contains(container)) {
				container.removeEventListener("change", changeEventHandler);
				observer.disconnect();
				break;
			}
			i++;
		}
	});
	observer.observe(document.body, { childList: true, subtree: true });
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

		const isDisabled = arguments.length === 0 ? true : false;
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

		listAndPriorityWrapper.appendChild(list.element);
		listAndPriorityWrapper.appendChild(priority);
		noteAndContentWrapper.appendChild(note.element);
		noteAndContentWrapper.appendChild(listAndPriorityWrapper);
		wrapper.appendChild(title.element);
		wrapper.appendChild(noteAndContentWrapper);
		wrapper.appendChild(hr);
		container.appendChild(checkBox.element);
		container.appendChild(wrapper);

		setupTodoContainer(container, checkBox, title, note, list);
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
			if (allTodos[i].complete === false) {
				fragment.prepend(todo);
			} else {
				fragment.appendChild(todo);
			}
		}

		const emptyTodo = TodoComponent();
		if (!emptyTodo) {
			throw new Error(
				"Could not created empty todoComponent, resulted in a null value",
			);
		}
		fragment.appendChild(emptyTodo);

		return fragment;
	} catch (error) {
		console.error;
		return null;
	}
}

/**@param {string|HTMLElement|Node} elementId - id the corrisponse to the element you would like to select*/
export function appendTodoFromStroageToElement(elementId) {
	try {
		const todosInLocalStorage = RenderTodosFromStorage();
		if (!todosInLocalStorage) {
			throw new Error(
				"Could not render Todo from storage, an error occurs in the process",
			);
		}

		if (
			typeof elementId !== "string" &&
			!(elementId instanceof HTMLElement) &&
			!(elementId instanceof Node)
		) {
			throw new TypeError(
				"elementId must be of type string, HTMLElement, or Node",
			);
		}

		/**@type{string|HTMLElement|Node|null}*/
		let listElement;
		if (typeof elementId === "string") {
			listElement = document.getElementById(elementId);
		} else if (elementId instanceof HTMLElement || elementId instanceof Node) {
			listElement = elementId;
		} else {
			throw new TypeError(
				"elementId must be of type string, HTMLElement, or Node",
			);
		}

		if (!listElement) {
			throw new ReferenceError(
				`Could not access wrapper for list of todo, element with id: ${elementId} is not currently in the DOM`,
			);
		}

		while (listElement.firstChild) {
			listElement.removeChild(listElement.firstChild);
		}

		listElement.appendChild(todosInLocalStorage);
	} catch (error) {
		console.error(error);
	}
}
