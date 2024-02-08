import { TodoController, Priority } from "./todo";

export class ListController {
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
	 *
	 *
	 * @typedef {string} ListNameType
	 *
	 * @typedef {IDType[]} ListType
	 */
	/**
	 * @typedef {{ [key: ListNameType]: ListType }} AllListType
	 */

	constructor() {
		try {
			if (!localStorage.getItem("LISTS")) {
				localStorage.setItem("LISTS", "{}");
			}
		} catch (error) {
			console.error("Failed to initialize LISTS in localStorage", error);
			// Handle the error appropriately (e.g., notifying the user, retrying, etc.)
		}
	}

	/**@returns {AllListType | null}*/
	getAllList() {
		try {
			const listInStorage = localStorage.getItem("LISTS");
			if (!listInStorage) {
				throw new ReferenceError(
					"Not able to access values for LISTS key in storage, an error occured in the process",
				);
			}

			/**@type {AllListType} */
			const parsedString = JSON.parse(listInStorage);

			return parsedString;
		} catch (e) {
			console.error(e);
			return null;
		}
	}

	/**@param {AllListType} allList */
	#setAllList(allList) {
		try {
			localStorage.setItem("LISTS", JSON.stringify(allList));
			return "success";
		} catch (e) {
			console.error(e);
			return null;
		}
	}

	/**@param {ListNameType} listName */
	createList(listName) {
		try {
			if (typeof listName !== "string") {
				throw new TypeError(
					`Invalid type was provided for the name of the list, expected string but got type: ${typeof listName}`,
				);
			}

			const allList = this.getAllList();
			if (!allList) {
				throw new ReferenceError(
					"Could not create a new list an error occured while while trying to access all list in local storage",
				);
			}

			if (Object.keys(allList).includes(listName)) {
				console.warn("The list name you provided is all ready an active list");
				// add todo to the list you have already created with the same name
				return listName;
			}

			allList[listName] = [];

			const updateStorage = this.#setAllList(allList);
			if (!updateStorage) {
				throw new Error(
					"Could not set the newly updated all list object to the key of LISTS in localStorage",
				);
			}

			return listName;
		} catch (e) {
			console.error(e);
			return null;
		}
	}

	/**
	 * @param {IDType} todoId
	 * @param {ListNameType} listName
	 */
	addTodoToList(todoId, listName) {
		try {
			if (typeof todoId !== "string" || typeof listName !== "string") {
				throw new TypeError(
					`Invalid type was proivded for either the list name of id of todo, expect both to be string but got todoId: ${typeof todoId}, listName ${typeof listName}`,
				);
			}

			const tc = new TodoController();
			const allTodos = tc.getAllTodos();
			if (!allTodos) {
				throw new ReferenceError(
					`Could not access all todo instances, the attempt to access them resulted in a null value`,
				);
			}

			const allLists = this.getAllList();
			if (!allLists) {
				throw new ReferenceError(
					`Could not access all list instances, the attempt to access them resulted in a null value`,
				);
			}

			if (!Object.keys(allLists).includes(listName)) {
				throw new ReferenceError(
					`Currently there is no list named: ${listName}, please create a list before attmpting to add todos to it`,
				);
			}

			allLists[listName].push(todoId);
			const updateLists = this.#setAllList(allLists);
			if (!updateLists) {
				throw new Error(
					"Could not update local storage with the changes to the lists, an error occured in the process",
				);
			}

			allTodos[todoId].list = listName;
			const updateTodos = tc.setAllTodos(allTodos);
			if (!updateTodos) {
				throw new Error(
					"Could not update local storage with the changes to the todos, an error occured in the process",
				);
			}

			return "success";
		} catch (e) {
			console.error(e);
			return null;
		}
	}

	getCurrentListNames() {
		try {
			const allLists = this.getAllList();
			if (!allLists) {
				throw new ReferenceError(
					`Could not access all todo instances, the attempt to access them resulted in a null value`,
				);
			}

			return Object.keys(allLists);
		} catch (e) {
			console.error(e);
			return null;
		}
	}
}
