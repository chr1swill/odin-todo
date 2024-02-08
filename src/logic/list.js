import { TodoController, Priority } from "./todo";

export class List {
	/**
	 * @typedef {Object<string, Float64Array>} AllLists
	 */

	/**@type {AllLists} */
	#allLists = {};

	/**
	 * @param {string} listName
	 * @returns{string|null}
	 */
	createList(listName) {
		try {
			const nameOfList = listName.trim().toLowerCase().replace(/\s+/g, "-");
			if (nameOfList in this.#allLists) {
				throw new Error(
					`Provide list name is already in use, please select a list name that is not currently being used: ${listName}`,
				);
			}

			const arr = new Float64Array(3);
			arr.fill(0);

			this.#allLists[nameOfList] = arr;
			return nameOfList;
		} catch (error) {
			console.log(error);
			return null;
		}
	}

	/**
	 * @param {string} listName
	 * @param {number|string} idToAppend
	 * @returns {void|null}
	 */
	addToList(listName, idToAppend) {
		try {
			if (typeof listName !== "string") {
				throw new TypeError(
					"Invalid type was provide for a list name, expected type string",
				);
			}

			if (typeof idToAppend !== "number" && typeof idToAppend !== "string") {
				throw new TypeError(
					"Invalid type was provide for an list value id, expected type string or number",
				);
			}

			if (!(listName in this.#allLists)) {
				this.createList(listName);
			}

			if (typeof idToAppend === "string") {
				idToAppend = parseFloat(idToAppend);
			}

			const listArray = this.#allLists[listName];
			const listArrayLength = listArray.length;
			if (listArray[listArrayLength - 1] === 0) {
				const newArray = this.#resizeArray(listArray);
				if (!newArray) {
					throw new Error(
						"Unable to append id to list, your array ran out of space and could not be resized",
					);
				}
				newArray[listArrayLength] = idToAppend;
				this.#allLists[listName] = newArray;
				return;
			}

			let i = 0;
			while (i < listArrayLength) {
				if (listArray[i] === 0) {
					listArray[i] = idToAppend;
					break;
				}
				i++;
			}
		} catch (error) {
			console.log(error);
			return null;
		}
	}

	/**
	 * @param {Float64Array} oldArray
	 * @returns {Float64Array|null}
	 */
	#resizeArray(oldArray) {
		try {
			const SIZE_OF_NEW_ARRAY = oldArray.length + 4;
			const newArray = new Float64Array(SIZE_OF_NEW_ARRAY);
			newArray.fill(0);
			let i = 0;
			while (i < oldArray.length) {
				newArray[i] = oldArray[i];
				i++;
			}
			return newArray;
		} catch (error) {
			console.error(error);
			return null;
		}
	}

	/**
	 * @param {Float64Array} list
	 * @param {number} index
	 */
	#cleanUpListAfterDelete(list, index) {
		const todo = Todo.getTodo(list[index].toString());
		if (!todo) {
			throw new ReferenceError(
				"Could not access todo from local storage, no key matching id",
			);
		}

		todo.list = "";
		localStorage.setItem(list[index].toString(), JSON.stringify(todo));
		list[index] = 0;
	}

	/**
	 * @param {string} listName
	 */
	deleteList(listName) {
		try {
			const todoInList = this.#allLists[listName];
			if (!todoInList) {
				throw new ReferenceError(
					"List does not exist, an attempt to access it resulted in null value",
				);
			}

			let i = 0;
			while (i < todoInList.length) {
				this.#cleanUpListAfterDelete(todoInList, i);
				i++;
			}

			delete this.#allLists[listName];
			if (listName in this.#allLists) {
				throw new Error(
					`An error occur while trying to delete a List, list name: ${listName} was not deleted`,
				);
			}
		} catch (error) {
			console.error(error);
			return null;
		}
	}

	/**
	 * @param {string} listName
	 * @param {string|number} idOfTodo
	 */
	deleteTodoFromList(listName, idOfTodo) {
		try {
			if (typeof listName !== "string") {
				throw new TypeError(
					"Could not access List name provide, expect type string but a string was not provided",
				);
			}

			if (!(listName in this.#allLists)) {
				throw new ReferenceError(
					`Could not access list name, it is not an active list. List name: ${listName}`,
				);
			}

			if (typeof idOfTodo !== "string" && typeof idOfTodo !== "number") {
				throw new TypeError(
					"Invald type was provided, expected type to be string or number",
				);
			}

			if (typeof idOfTodo === "string") {
				idOfTodo = parseFloat(idOfTodo);
			}

			const list = this.#allLists[listName];
			if (list.length === 0) {
				throw new ReferenceError(
					"Could not delete todo id from list, list provided has no element inside",
				);
			}

			let i = 0;
			while (i < list.length) {
				if (list[i] === idOfTodo) {
					this.#cleanUpListAfterDelete(list, i);
					break;
				}
				if (i === list.length - 1) {
					throw new ReferenceError(
						`There is no todo Id in this list matching the id you have provided, todo id: ${idOfTodo}`,
					);
				}
				i++;
			}
		} catch (error) {
			console.error(error);
			return null;
		}
	}

	getListNames() {
		return Object.keys(this.#allLists);
	}

	getAllLists() {
		return this.#allLists;
	}

	/**
	 * @param {string} listName
	 */
	getList(listName) {
		try {
			if (typeof listName !== "string") {
				throw new TypeError(
					`Could not look up key ${listName} in all list the type ${typeof listName} was provided instead of a string`,
				);
			}

			if (!this.getListNames().includes(listName)) {
				throw new ReferenceError(
					`Could not access list, provided value is not a key in the allList object: ${listName}`,
				);
			}

			return this.#allLists[listName];
		} catch (error) {
			console.error(error);
			return null;
		}
	}
}

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

	//make get list name method and you should be good to replace all the place the used the old list class with the new on
}
