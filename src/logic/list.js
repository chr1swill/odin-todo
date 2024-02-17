import { TodoController } from "./todo";

export class ListController {
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

	/**@returns {import('./logicTypes').AllListType | null}*/
	getAllList() {
		try {
			const listInStorage = localStorage.getItem("LISTS");
			if (!listInStorage) {
				throw new ReferenceError(
					"Not able to access values for LISTS key in storage, an error occured in the process",
				);
			}

			/**@type {import('./logicTypes').AllListType} */
			const parsedString = JSON.parse(listInStorage);

			return parsedString;
		} catch (e) {
			console.error(e);
			return null;
		}
	}

	/**@param {import('./logicTypes').AllListType} allList */
	setAllList(allList) {
		try {
			localStorage.setItem("LISTS", JSON.stringify(allList));
			return "success";
		} catch (e) {
			console.error(e);
			return null;
		}
	}

	/**@param {import('./logicTypes').ListNameType} listName */
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
			const formatedListName = listName
				.trim()
				.toLowerCase()
				.replace(/\s+/g, "-");

			if (Object.keys(allList).includes(formatedListName)) {
				console.warn("The list name you provided is all ready an active list");
				return formatedListName;
			}

			allList[formatedListName] = [];

			const updateStorage = this.setAllList(allList);
			if (!updateStorage) {
				throw new Error(
					"Could not set the newly updated all list object to the key of LISTS in localStorage",
				);
			}

			return formatedListName;
		} catch (e) {
			console.error(e);
			return null;
		}
	}

	/**
	 * @param {import('./logicTypes').IDType} todoId
	 * @param {import('./logicTypes').ListNameType} listName
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
					`Could not access all todo instances, the attempt to access them resuimport('./logicTypes').d in a null value`,
				);
			}

			const allLists = this.getAllList();
			if (!allLists) {
				throw new ReferenceError(
					`Could not access all list instances, the attempt to access them resuimport('./logicTypes').d in a null value`,
				);
			}

			if (!Object.keys(allLists).includes(listName)) {
				throw new ReferenceError(
					`Currently there is no list named: ${listName}, please create a list before attmpting to add todos to it`,
				);
			}

			if (!allLists[listName].includes(todoId)) {
				allLists[listName].push(todoId);
			} else {
				console.warn(
					`Todo id: ${todoId} is already a member in list: ${listName}, an occurance was not added`,
				);
			}

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
					`Could not access all todo instances, the attempt to access them resuimport('./logicTypes').d in a null value`,
				);
			}

			return Object.keys(allLists);
		} catch (e) {
			console.error(e);
			return null;
		}
	}

	/**
	 * @param {import('./logicTypes').TodoType}  todo
	 */
	removeTodosIdFromListTheyShouldNotBeIn(todo) {
		try {
			/**
			 * really i should be checking on the one todo
			 *
			 * what is the list value now
			 * get the list that it refs
			 * if no list matches it and the list value is not an empty string(it has no list) create a list under the name of the todo value
			 *
			 * if a list matches it great
			 * look inside that list does it container to todo id
			 * if not added to to it
			 * * save that list back to local storage
			 * if it does do nothing it is already there
			 *
			 * now since a todo can only belong to one list at a time you need to check the rest of the list to see if they have this todo id in them  bc they should not
			 * get all of the
			 */

			const allList = this.getAllList();
			if (allList === null) {
				throw new Error("Failed to access all list in local storage");
			}
			console.log("This is all list is it what you expect it to be", allList);

			const namesOfAllCurrentList = Object.keys(allList);

			/**@type{import('./logicTypes').ListNameType}*/
			const todoCurrentListValue = todo.list.trim();
			if (
				todoCurrentListValue !== "" &&
				!namesOfAllCurrentList.includes(todoCurrentListValue)
			) {
				for (let i = 0; i < namesOfAllCurrentList.length; i++) {
					const listName = namesOfAllCurrentList[i];
					const listArray = allList[listName];
					for (let j = 0; j < listArray.length; j++) {
						if (listArray[j] === todo.id) {
							listArray.splice(j, 1);
							continue;
						}
					}
				}
				// create new list for the newly entered list name hoooks async
				allList[todoCurrentListValue] = [todo.id];
				// make the only member of that new list he id of the current todoid
			} else if (namesOfAllCurrentList.includes(todoCurrentListValue)) {
				for (let i = 0; i < namesOfAllCurrentList.length; i++) {
					const listName = namesOfAllCurrentList[i];
					const listArray = allList[listName];
					for (let j = 0; j < listArray.length; j++) {
						if (listName === todoCurrentListValue) {
							if (!listArray.includes(todo.id)) {
								listArray.push(todo.id);
								continue;
							}
						}

						if (listName !== todoCurrentListValue) {
							if (listArray[j] === todo.id) {
								listArray.splice(j, 1);
								continue;
							}
						}
					}
				}
			} else {
				// i am pretty sure the only other case here is if the value is an empty string, but handle that case
				// double check to see if this is really what you want to do here bc i did not really check it
				for (let i = 0; i < namesOfAllCurrentList.length; i++) {
					const listName = namesOfAllCurrentList[i];
					const listArray = allList[listName];
					for (let j = 0; j < listArray.length; j++) {
						if (listArray[j] === todo.id) {
							listArray.splice(j, 1);
							continue;
						}
					}
				}
			}

			const savedLists = this.setAllList(allList);
			if (savedLists === null) {
				throw new Error(
					"Could not save updates to LISTS back to local storage",
				);
			}

			return "success";
		} catch (e) {
			console.error(e);
			return null;
		}
	}

	/**
	 * @param {import('./logicTypes').ListNameType} listName - kebab case name of a list
	 *
	 * @returns {import('./logicTypes').ListType|null} an array of list or null if an error occured
	 */
	getList(listName) {
		try {
			const allLists = this.getAllList();
			if (allLists === null) {
				throw new Error("Failed to access all lists in storage");
			}

			if (!Object.keys(allLists).includes(listName)) {
				throw new Error(
					`Could not find ${listName} in localStorage the key does not exist`,
				);
			}

			return allLists[listName];
		} catch (e) {
			console.error(e);
			return null;
		}
	}

	/**
	 * Gives you the the todo object corrisponding to each todoid in the provided list
	 *
	 * @param {import('./logicTypes').ListNameType} listName - in kebab case
	 */
	getTodosFromList(listName) {
		try {
			const arrayOfTodoId = this.getList(listName);
			if (arrayOfTodoId === null) {
				throw new Error("Failed to access the request list");
			}

			/**@type {import('./logicTypes').TodoType[]}*/
			const result = [];

			const arrayLength = arrayOfTodoId.length;
			if (arrayLength === 0) {
				return result;
			}

			const tc = new TodoController();
			for (let i = 0; i < arrayOfTodoId.length; i++) {
				const todo = tc.getTodo(arrayOfTodoId[i]);
				if (todo === null) {
					throw new Error(
						`Failed to access the todo object corrisponding to todo ID: ${arrayOfTodoId}`,
					);
				}
				result.push(todo);
			}

			return result;
		} catch (e) {
			console.error(e);
			return null;
		}
	}

	/**@param {string} kebabCaseListName */
	toTitleCase(kebabCaseListName) {
		const words = kebabCaseListName.replace(/-/g, " ").split(" ");

		for (let i = 0; i < words.length; i++) {
			const word = words[i];
			words[i] = word.charAt(0).toUpperCase() + word.slice(1);
		}

		return words.join(" ");
	}
}

/**
 * @param {string} nameOfList
 * @param {import('./logicTypes').IDType} [todoId=undefined]
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
