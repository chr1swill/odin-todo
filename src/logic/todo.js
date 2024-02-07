/** @enum { number } */
export const Priority = {
	NONE: 0,
	LOW: 1,
	MEDIUM: 2,
	HIGH: 3,
};

export class TodoController {
	/**
	 * @typedef {string} IDType
	 *
	 * @typedef {Object} TodoType
	 * @prop {IDType} id
	 * @prop {string} title
	 * @prop {string} note
	 * @prop {string} list
	 * @prop {boolean} complete
	 * @prop {Priority} priority
	 *
	 * @typedef {{ [key: IDType]: TodoType }} AllTodosType
	 */

	constructor() {
		try {
			if (!localStorage.getItem("TODOS")) {
				localStorage.setItem("TODOS", "{}");
			}
		} catch (error) {
			console.error("Failed to initialize TODOS in localStorage", error);
			// Handle the error appropriately (e.g., notifying the user, retrying, etc.)
		}
	}

	/**
	 * returns todo id as a string
	 * @returns {IDType}
	 */
	#generateTodoId() {
		/**@type {IDType} */
		const id = (Date.now() + Math.random()).toString();
		return id;
	}

	/**
	 * returns an object of all the todos in localStorage or an empty object if it is empty
	 * @returns {AllTodosType | null}
	 */
	getAllTodos() {
		try {
			let todosInStorage = localStorage.getItem("TODOS");
			if (!todosInStorage) {
				throw new ReferenceError(
					"The class constructor failed to initialize the TODOS key in localStorage.",
				);
			}

			/**@type {AllTodosType} */
			const allTodo = JSON.parse(todosInStorage);
			return allTodo;
		} catch (e) {
			console.error(e);
			return null;
		}
	}

	/**
	 * @param {AllTodosType} allTodos
	 * @returns {number| null}
	 */
	#setAllTodos(allTodos) {
		try {
			const string = JSON.stringify(allTodos);
			localStorage.setItem("TODOS", string);
			return 10;
		} catch (e) {
			console.error(e);
			return null;
		}
	}

	/**
	 * @param {TodoType} todo
	 * @returns {number|null}
	 */
	addTodo(todo) {
		try {
			const allTodos = this.getAllTodos();
			if (!allTodos) {
				throw new ReferenceError(
					"Could not access all todos from localStorage.",
				);
			}

			const keyOfTodo = todo.id;
			allTodos[keyOfTodo] = todo;
			const savedTodo = this.#setAllTodos(allTodos);
			if (!savedTodo) {
				throw new Error(
					"Could not save new updated todo list an error occured in the process",
				);
			}
			return 10;
		} catch (e) {
			console.error(e);
			return null;
		}
	}

	/**
	 *
	 * Creates an empty todo in local storage and return the id of the created todo
	 * @returns {IDType | null}
	 */
	createTodo() {
		try {
			const todoId = this.#generateTodoId();

			/**@type {TodoType} */
			const todo = {
				id: todoId,
				title: "",
				note: "",
				list: "",
				complete: false,
				priority: Priority.NONE,
			};

			const allTodos = this.getAllTodos();
			if (!allTodos) {
				throw new ReferenceError(
					"Could not access all todos from localStorage.",
				);
			}

			allTodos[todoId] = todo;
			const setAllTodosToLocalStorage = this.#setAllTodos(allTodos);
			if (!setAllTodosToLocalStorage) {
				throw new Error(
					"Could not set you newly created todo object to TODOS key in  localStorage",
				);
			}

			return todoId;
		} catch (e) {
			console.error(e);
			return null;
		}
	}

	/**
	 * @param {IDType} id
	 * @returns {TodoType | null}
	 */
	getTodo(id) {
		try {
			if (typeof id !== "string") {
				throw new TypeError(
					`The type of id is invalid expected string but received type: ${typeof id}`,
				);
			}

			const allTodos = this.getAllTodos();
			if (!allTodos) {
				throw new ReferenceError(
					"Could not access all todos from localStorage.",
				);
			}

			if (!(Object.keys(allTodos).includes(id.toString()))) {
				throw new ReferenceError(
					`Could not find a todo with the provided id in local storage id: ${id}`,
				);
			}

			return allTodos[id];
		} catch (e) {
			console.error(e);
			return null;
		}
	}
}
