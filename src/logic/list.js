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
	setAllList(allList) {
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

				const cleanUp = this.matchListRefsToTodoRefs();
				if (!cleanUp) {
					throw new Error(
						"Failed to clean up unneeded referenced to todos on list",
					);
				}
				return listName;
			}

			allList[listName] = [];

			const updateStorage = this.setAllList(allList);
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
			const updateLists = this.setAllList(allLists);
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

	/**
	 *
	 * removes todo from list that do not have a list property referencing them
	 * this make sure that list will only store the todoId of todos that have
	 * their name as property
	 *
	 */
	matchListRefsToTodoRefs() {
		try {
			const activeList = this.getAllList();
			if (!activeList) {
				throw new ReferenceError(
					"Was not able to access the list in local storage, an error occured in the process",
				);
			}

			const tc = new TodoController();
			const activeListNames = Object.keys(activeList);

			let i = 0;
			const activeListNamesLen = activeListNames.length;
			while (i < activeListNamesLen) {
				const listName = activeListNames[i];
				const list = activeList[listName];

				let j = 0;
				while (j < list.length) {
					const todo = tc.getTodo(list[j]);
					if (!todo) {
						throw new ReferenceError(
							`Failed to access todo with id ${list[j]} from localStorage`,
						);
					}

					if (todo.list === "" || todo.list !== list[i]) {
						//delted todo id form list
						list.splice(j, 1);
						continue;
					}
					j++;
				}
				i++;
			}
			// add all list back to storage
			const updatedActiveList = this.setAllList(activeList);
			if (!updatedActiveList) {
				throw new Error(
					"Failed to updated LISTS key in local storage with updated object of all list",
				);
			}

			return "success";
		} catch (e) {
			console.error(e);
			return null;
		}
	}
}

/**
 * @param {string} nameOfList
 * @param {IDType} [todoId=undefined]
 */
export function processListCreation(nameOfList, todoId = undefined) {
	try {
		if (typeof nameOfList !== "string") {
			throw new TypeError(
				`Invalid type of todoId was provided, expected string but got type: ${typeof nameOfList}`,
			);
		}

		const listName = nameOfList;
		if (!listName) {
			throw new ReferenceError(
				"List was not created: list name received was undefined, please provide a string for the name of the list",
			);
		}

		const trimedListName = listName.trim();
		if (trimedListName === "") {
			throw Error(
				"Invalid list name was provided, an attempt was made to create an list named an empty string",
			);
		}

		const lc = new ListController();
		const createdList = lc.createList(trimedListName);
		if (createdList === null) {
			throw new Error(
				`An Error occured while attempting to a created a list named: ${trimedListName}`,
			);
		}

		if (todoId) {
			if (typeof todoId !== "string") {
				throw new TypeError(
					`Invalid type of todoId was provided, expected string but got type: ${typeof todoId}`,
				);
			}

			const addedTodoIdToList = lc.addTodoToList(todoId, createdList);
			if (!addedTodoIdToList) {
				throw new Error(
					`Failed to add todoId ${todoId} to list named ${createdList}`,
				);
			}
		}

		return createdList;
	} catch (e) {
		console.error(e);
		return null;
	}
}
