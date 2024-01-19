/** @enum { number } */
const Priority = {
	NONE: 0,
	LOW: 1,
	MEDIUM: 2,
	HIGH: 3,
};

/** @enum { string } */
const AllowedTypes = {
	NUMBER: "number",
	STRING: "string",
	BOOLEAN: "boolean",
};

export class Todo {
	/** @type { string }*/
	#id;

	constructor() {
		this.#id = (Date.now() + Math.random()).toString();
		localStorage.setItem(
			this.#id,
			JSON.stringify({
				title: "",
				note: "",
				list: "",
				priority: Priority.NONE,
				complete: false,
			}),
		);
	}

	/**
	 * Returns an array of all Todo instances stored in localStorage.
	 * @returns { Object[] | null } An array of Todo objects.
	 */
	static get allInstances() {
		try {
			if (localStorage.length === 0) {
				throw new ReferenceError("Not able to access value of null");
			}

            /** @type { Object[] } */
			const todos = [];

			for (const todoId in localStorage) {
				const todoString = localStorage.getItem(todoId);
				if (todoString !== null) {
					// Check if the item exists in localStorage
					const todo = JSON.parse(todoString);
					todos.push(todo);
				}
			}

			return todos;
		} catch (error) {
			console.error(error);
			return null;
		}
	}

	/**
	 * @param { string } id - id of the todo you would like to get
	 *
	 * @returns { Todo | null }
	 * */
	static getTodo(id) {
		try {
			if (typeof id !== "string") {
				throw TypeError("Expect value of todo id to be a string");
			}

			const todoString = localStorage.getItem(id);
			if (todoString === null) {
				throw new ReferenceError("Not able to access value of null");
			}

			return JSON.parse(todoString);
		} catch (error) {
			console.error(error);
			return null;
		}
	}

	/** @returns { string } todo unique id number as a string */
	get id() {
		return this.#id;
	}

	/**
	 * handle getting item form local storage on todo properties
	 *
	 * @param { string } property - key you would like to access the value to on this todo object
	 * @returns { Error | string | boolean | number }
	 * */
	#handleLocalStorageGet(property) {
		const todoString = localStorage.getItem(this.#id);
		if (todoString === null) {
			throw new ReferenceError("Not able to access value of null");
		}

		const todoObj = JSON.parse(todoString);
		if (todoObj[property] !== undefined) {
			return todoObj[property];
		}
		throw new ReferenceError("Not able to access undefined property");
	}

	/**
	 * handle setting value of todo properies in local storage
	 *
	 * @param { string } property - key of the value to you would like to modify
	 * @param { number | string | boolean } newValue - new value you would like to set the key
	 * @param { AllowedTypes } newValueType - type of the newValue, need to be boolean, number, or string
	 * */
	#handleLocalStorageSet(property, newValue, newValueType) {
		if (typeof newValue !== newValueType) {
			throw new TypeError(`Value must be a ${newValueType}`);
		}

		if (property === "priority") {
			if (
				newValue !== Priority.NONE &&
				newValue !== Priority.LOW &&
				newValue !== Priority.MEDIUM &&
				newValue !== Priority.HIGH
			) {
				throw new RangeError("Value provided for key priority is invalid");
			}
		}

		const todoString = localStorage.getItem(this.#id);
		if (todoString === null) {
			throw new ReferenceError("Not able to access value of null");
		}

		const todoObj = JSON.parse(todoString);
		if (typeof property !== "string") {
			throw new TypeError("Value must be string");
		}
		todoObj[property] = newValue;
		localStorage.setItem(this.#id, JSON.stringify(todoObj));
	}

	/**@returns { string | null }*/
	get title() {
		try {
			const value = this.#handleLocalStorageGet("title").toString();
			if (typeof value !== "string") {
				throw TypeError("Value accessed was not a string");
			}
			return value;
		} catch (error) {
			console.error(error);
			return null;
		}
	}

	/**@param { string } title */
	set title(title) {
		this.#handleLocalStorageSet("title", title, AllowedTypes.STRING);
	}

	/**@returns { string | null }*/
	get note() {
		try {
			const value = this.#handleLocalStorageGet("note").toString();
			if (typeof value !== "string") {
				throw TypeError("Value accessed was not a string");
			}
			return value;
		} catch (error) {
			console.error(error);
			return null;
		}
	}

	/**@param { string } note */
	set note(note) {
		this.#handleLocalStorageSet("note", note, AllowedTypes.STRING);
	}

	/**@returns { string | null }*/
	get list() {
		try {
			const value = this.#handleLocalStorageGet("list").toString();
			if (typeof value !== "string") {
				throw TypeError("Value accessed was not a string");
			}
			return value;
		} catch (error) {
			console.error(error);
			return null;
		}
	}

	/**@param { string } list */
	set list(list) {
		this.#handleLocalStorageSet("list", list, AllowedTypes.STRING);
	}

	/**@returns { number | null}*/
	get priority() {
		try {
			const value = Number(this.#handleLocalStorageGet("priority"));
			if (typeof value !== "number") {
				throw TypeError("Value accessed was not a number");
			}
			return value;
		} catch (error) {
			console.error(error);
			return null;
		}
	}

	/**@param { Priority } priority */
	set priority(priority) {
		this.#handleLocalStorageSet("priority", priority, AllowedTypes.NUMBER);
	}

	/**@returns { boolean | null }*/
	get complete() {
		try {
			const value = this.#handleLocalStorageGet("complete");
			if (typeof value !== "boolean") {
				throw TypeError("Value accessed was not a boolean");
			}
			return value;
		} catch (error) {
			console.error(error);
			return null;
		}
	}

	/**@param { boolean } complete */
	set complete(complete) {
		this.#handleLocalStorageSet("complete", complete, AllowedTypes.BOOLEAN);
	}
}
