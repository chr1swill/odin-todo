import { DefaultInputComponent } from '../inputs/DefaultInput'
import { DefaultTextareaComponent } from '../inputs/DefaultTextarea'
import { DefaultDropdownComponent } from '../inputs/DefaultDropdown'
import { DefaultButtonComponent } from '../buttons/DefaultButton'
import { Todo, Priority } from '../../logic/todo'
/**
 *
 * code may work but it need to be refactored to make use without the DOMParser object
 * going to refactor to make component return real htmlElements
 *
 * */
export function TodoModalComponent() {
    const parser = new DOMParser();
    const dialog = document.createElement('dialog');
    dialog.setAttribute('close', '');
    dialog.classList.add(
        'grid', 'place-items-center', 'bg-primary', 'rounded-md', 'p-4', 'max-w-[calc(100vw-2rem)]', 'backdrop:bg-text/50'
    )

    /**@type {HTMLInputElement}*/
    const input = parser.parseFromString(DefaultInputComponent('Title', true), 'text/html')
    /**@type {HTMLTextAreaElement}*/
    const textarea = parser.parseFromString(DefaultTextareaComponent('Notes', true), 'text/html')
    const dropdown = DefaultDropdownComponent('Choose Priority', ['None','Low', 'Medium', 'High'])
    /**@type {HTMLButtonElement}*/
    const cancelBtn = parser.parseFromString(DefaultButtonComponent('Cancel'), 'text/html')
    /**@type {HTMLButtonElement}*/
    const createBtn = parser.parseFromString(DefaultButtonComponent('Create Todo', 'submit', 'sumbit'), 'text/html')

	cancelBtn.addEventListener("click", (e) => {
		e.preventDefault();
        dialog.close();
	});

	createBtn.addEventListener("click", (e) => {
		e.preventDefault();
		try {
			const todoName = input.value;
            const todoNote = textarea.value;

            const selectInDropdown = dropdown?.querySelector('select')
            if (!selectInDropdown) {
                throw new Error("Could not find select element inside of dropdown")
            }
            const todoPriority = selectInDropdown.options[selectInDropdown.selectedIndex]?.textContent

			if (!todoName || !todoNote || !todoPriority) {
                throw new Error("Todo was not created: Could not access properties of todo");
			}
            const todo = new Todo()
            todo.title = todoName
            todo.note = todoNote

            switch (todoPriority.toString().trim().toLowerCase()) {
                case 'none':
                    todo.priority = Priority.NONE
                    break;
                case 'low':
                    todo.priority = Priority.LOW
                    break;
                case 'medium':
                    todo.priority = Priority.MEDIUM
                    break;
                case 'high':
                    todo.priority = Priority.HIGH
                    break;
                default:
                    throw new Error("Todo was not created: Could provided prirority was invalid");
            }

		} catch (error) {
			console.error(error);
		}
	});

    return dialog.innerHTML = (
        `
        <form method="dialog">
            ${input}
            ${textarea}
            ${dropdown}
            <div class="flex flex-row gap-2">
                ${cancelBtn}
                ${createBtn}
            </div>
        </form>
        `
    )
}
