import { TodoController } from "./todo";

export class ListController {
	/**
	 * @typedef {Object<string, Float64Array>} AllLists
	 */

	/**@type {AllLists} */
	#allLists = {};

	/**
	 * @param {string} listName
	 * @returns{void|null}
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
