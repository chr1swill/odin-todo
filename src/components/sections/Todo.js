import { CheckBox } from "../inputs/CheckBox";
/**@param { string | null } todoId
 * @param { string | null } todoTitle
 * @param { string | null } todoNote
 * @param { number | null } todoPriority
 * @param { boolean } todoComplete
 * @param { string | null } todoList
 * */
export function Todo(
	todoId,
	todoTitle,
	todoNote,
	todoPriority,
	todoComplete,
	todoList,
) {
	return `<div class="flex flex-row gap-2 justify-center" data-id="${todoId === null ? "" : todoId}">
            ${CheckBox(todoComplete)}
            <div>
                <h3 class="text-text text-xl font-bold">${todoTitle}</h3>
                <div class="flex flex-col gap-1 justify-center text-text font-medium text-xs">
                    <p>${todoNote === null ? "" : todoNote}</p>
                    <p>${todoList === null ? "" : todoList}</p>
                    <p>${todoPriority === null ? "" : todoPriority}</p>
                </div>
            </div>
        </div>`;
}
