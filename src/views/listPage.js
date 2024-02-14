import { TitleBar } from "../components/sections/TitleBar";
import { TodoComponent } from "../components/sections/Todo";
import { ListController } from "../logic/list";
import { TodoController } from "../logic/todo";

/**
 * @param {string} listName - the list you would like to render form storage
 */
export function RenderListPage(listName) {
	try {
		const lc = new ListController();
		const allList = lc.getAllList();
		if (allList === null) {
			throw new ReferenceError(
				"Could not get the name of all the list in local storage and error occured in the process",
			);
		}

		if (!Object.keys(allList).includes(listName)) {
			throw new ReferenceError(
				"The provided list name is not an active list name.",
			);
		}

		const fragment = document.createDocumentFragment();
		const titleBar = TitleBar(lc.toTitleCase(listName));

		if (titleBar === null) {
			throw new Error("Failed to created an title bar with you list name");
		}
		fragment.appendChild(titleBar);

		const todosInList = lc.getTodosFromList(listName);
		if (todosInList === null) {
			throw new Error(`Failed to access the todos in list named: ${listName}`);
		}

		const todoContainer = document.createElement("div");
		todoContainer.setAttribute("data-list-wrapper", listName);

		const todoContainerWithList = updateListOfTodoElementsContent(
			todoContainer,
			todosInList,
		);

		if (todoContainerWithList === null) {
			throw new Error(
				"Failed to created the list of todo element using the todo list",
			);
		}
		fragment.appendChild(todoContainerWithList);

		const section = document.createElement("section");
		section.className = "w-full";
		section.appendChild(fragment);

		return section;
	} catch (e) {
		console.error(e);
		return null;
	}
}

/**
 * @param {import('../logic/logicTypes').TodoType[]}  todosInList
 */
function renderTodosInList(todosInList) {
	try {
		const emptyTodo = TodoComponent();
		if (emptyTodo === null) {
			throw new Error("Failed to create an empty todo");
		}

		const fragment = document.createDocumentFragment();

		const ARRAY_LENGTH = todosInList.length;
		if (ARRAY_LENGTH === 0) {
			fragment.appendChild(emptyTodo);
			return fragment;
		}

		const tc = new TodoController();

		let i = 0;
		while (i < ARRAY_LENGTH) {
			const todo = tc.getTodo(todosInList[i].id);
			if (todo === null) {
				throw new Error("Failed to get todo object from storage");
			}

			const todoEl = TodoComponent(
				todo.id,
				todo.title,
				todo.note,
				todo.priority,
				todo.complete,
				todo.list,
			);
			if (todoEl === null) {
				throw new Error(
					"Failed to turn todo object from storage into a todo element",
				);
			}

			if (todo.complete === false) {
				fragment.prepend(todoEl);
			} else {
				fragment.appendChild(todoEl);
			}
			i++;
		}

		fragment.appendChild(emptyTodo);

		return fragment;
	} catch (e) {
		console.error(e);
		return null;
	}
}

/**
 * @param {HTMLDivElement} container
 * @param {import('../logic/logicTypes').TodoType[]}  todosInList
 */
function updateListOfTodoElementsContent(container, todosInList) {
	try {
		const fragment = renderTodosInList(todosInList);
		if (fragment === null) {
			throw new Error(
				"Could not create a document fragment container the todos in list",
			);
		}

		while (container.firstChild) {
			container.removeChild(container.firstChild);
		}

		container.appendChild(fragment);
		return container;
	} catch (e) {
		console.error(e);
		return null;
	}
}
