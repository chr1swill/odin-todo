import { CheckBox } from "../inputs/CheckBox";

/**
 * Checks if all arguments are null.
 *
 * @param {...(string|number|boolean|null)} args - The arguments to check.
 * @returns { boolean } True if all arguments are null, false otherwise.
 */
function checkAllArgumentsNull() {
	/**@type { boolean } */
	let tmp = false;
	if (Array.prototype.every.call(arguments, (arg) => arg === null)) {
		tmp = true;
	}
	return tmp;
}

/**
 * @param { string | null } todoId
 * @param { string | null } todoTitle
 * @param { string | null } todoNote
 * @param { number | null } todoPriority
 * @param { boolean | null} todoComplete
 * @param { string | null } todoList
 * */
export function Todo(
	todoId = null,
	todoTitle = null,
	todoNote = null,
	todoPriority = null,
	todoComplete = null,
	todoList = null,
) {
	if (
		checkAllArgumentsNull(
			todoId,
			todoTitle,
			todoNote,
			todoPriority,
			todoComplete,
			todoList,
		)
	) {
		return `<div class="flex flex-row gap-2 justify-center" data-id="">
            ${CheckBox(true)}
            <div>
                <h3 class="h-5"></h3>
                <div class="h-4"></div>
            </div>
        </div>
        <hr class="border-text border-t-2 my-4">`;
	} else {
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

		if (todoComplete === null) {
			todoComplete = false;
		}

		return `<div class="flex flex-row gap-2 justify-start items-center" data-id="${todoId === null ? "" : todoId}">
            ${CheckBox(false, todoComplete)}
            <div class="flex flex-col gap-2" >
                <h3 class="text-text text-xl font-bold">${todoTitle}</h3>
                <div class="flex flex-row gap-1 justify-center content-between text-text font-medium text-xs">
                    <p>${todoNote === null ? "" : todoNote}</p>
                    <div class="flex flex-row gap-2">
                        <p class="${todoList === null ? "" : "bg-secondary rounded-lg text-text font-semibold"}">
                            ${todoList === null ? "" : todoList}
                        </p>
                        <p class="${priority === "" ? "" : "text-red-500"}">${priority}</p>
                    </div>
                </div>
            </div>
        </div>
        <hr class="border-text border-t-2 my-4">`;
	}
}
