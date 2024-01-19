"use strict";

export class List {
	/**@type { Set<string> }*/
	static #allInstances = new Set();
	/**@type { Set<string> }*/
	#todosInList = new Set();
	/**@type { string }*/
	#name;

	/**@param { string } name */
	constructor(name) {
		this.#name = name;
		List.#allInstances.add(this.#name);
	}

	/**@returns { Set<string> } names of all the list that are active */
	static get allInstances() {
		return List.#allInstances;
	}

	/**@param { string } name - which list you would like to remove*/
	set deleteList(name) {
		try {
			if (typeof name !== "string") {
				throw TypeError("Expect value of name to be a string");
			}

			const hasName = List.#allInstances.has(name);
			if (hasName === false) {
				throw ReferenceError(
					"Could not find name in list, provide valid a name in the list",
				);
			}

			this.#todosInList.clear();
			List.#allInstances.delete(name);
		} catch (error) {
			console.error(error);
		}
	}

	/**@returns { string }*/
	get name() {
		return this.#name;
	}

	/**@type { string }*/
	set name(name) {
		try {
			if (typeof name !== "string") {
				throw TypeError("Expect value of name to be a string");
			}

			this.#name = name.trim();
		} catch (error) {
			console.error(error);
		}
	}

	get todosInList() {
		return this.#todosInList;
	}

	get membersFromStorage() {
        try {
        /** @type { Object[] } */
        const members = [];

        for (const todoId of this.#todosInList) {
            const todoString = localStorage.getItem(todoId);
            if (todoString !== null) {
                // Check if the item exists in localStorage
                const todo = JSON.parse(todoString);
                members.push(todo);
            }
        } 

        return members
        } catch (error) {
            console.error(error);
            return null
        }
    }

	/**@param { string } id - id of the todo you would like to add to list */
	set addTodo(id) {
		try {
			if (typeof id !== "string") {
				throw TypeError("Expect value of todo id to be a string");
			}

			const todo = localStorage.getItem(id);
			if (todo === null) {
				throw ReferenceError(
					"Could not find id in local storage, provide valid id",
				);
			}

			this.#todosInList.add(id);
		} catch (error) {
			console.error(error);
		}
	}

	/**@param { string } id - id of the todo you would like to remove to list */
	set removeTodo(id) {
		try {
			if (typeof id !== "string") {
				throw TypeError("Expect value of todo id to be a string");
			}

			const hasId = this.#todosInList.has(id);
			if (hasId === false) {
				throw ReferenceError("Could not find id in list, provide valid id");
			}

			this.#todosInList.delete(id);
		} catch (error) {
			console.error(error);
		}
	}
}
