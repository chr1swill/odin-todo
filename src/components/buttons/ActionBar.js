import { AddButtonComponent } from "../buttons/AddButton";
import { showModal } from "../modals/Dialog";

/**@param {HTMLButtonElement} addListBtn */
function setUpAddListBtn(addListBtn) {
    const showListModal = () => showModal("listModal");
    addListBtn?.addEventListener('click', showListModal)

    const observer = new MutationObserver((mutation) => {
        let i = 0;
        while (i < mutation.length) {
            if (!document.body.contains(addListBtn)) {
                addListBtn.removeEventListener('click', showListModal)
                observer.disconnect()
                break;
            }
            i++
        }
    })
    observer.observe(document.body, { childList: true, subtree: true })
}

/**@param {HTMLButtonElement} addTodoBtn */
function setUpAddTodoBtn(addTodoBtn) {
    const showTodoModal = () => showModal("todoModal");
    addTodoBtn?.addEventListener('click', showTodoModal)

    const observer = new MutationObserver((mutation) => {
        let i = 0;
        while (i < mutation.length) {
            if (!document.body.contains(addTodoBtn)) {
                addTodoBtn.removeEventListener('click', showTodoModal)
                observer.disconnect()
                break;
            }
            i++
        }
    })
    observer.observe(document.body, { childList: true, subtree: true })
}

/**@param {HTMLDivElement} buttonContainer */
function matchWidthToBody(buttonContainer) {
    const bodyWidth = document.body.getBoundingClientRect().width
    buttonContainer.style.width = `${bodyWidth}px`
}

/**@param {HTMLDivElement} buttonContainer */
function setUpButtonContainer(buttonContainer) {
    const handleResizeEvent = () => matchWidthToBody(buttonContainer)
    window.addEventListener('resize', handleResizeEvent)

    const observer = new MutationObserver((mutation) => {
        let i = 0
        while (i < mutation.length) {
            if (!document.body.contains(buttonContainer)) {
                window.removeEventListener('resize', handleResizeEvent)
                observer.disconnect()
                break
            }
            i++
        }
    })
    observer.observe(document.body, { childList: true, subtree: true })
}

/**
 * Create a simple Action Bar
 * @requires { showModal } 
 */
export function ActionBarComponent() {
	const CLASSES_TO_REMOVE = ["bg-primary", "hover:bg-secondary"];
	const CLASSES_TO_ADD = ["bg-[none]", "hover:bg-primary"];

	const addListBtn = AddButtonComponent("Add List");
	const addTodoBtn = AddButtonComponent("Add Todo");

	for (let i = 0; i < CLASSES_TO_REMOVE.length; i++) {
		addListBtn.classList.remove(CLASSES_TO_REMOVE[i]);
		addTodoBtn.classList.remove(CLASSES_TO_REMOVE[i]);
	}

	for (let i = 0; i < CLASSES_TO_ADD.length; i++) {
		addListBtn.classList.add(CLASSES_TO_ADD[i]);
		addTodoBtn.classList.add(CLASSES_TO_ADD[i]);
	}

	const buttonContainer = document.createElement("div");
	buttonContainer.className = "fixed bottom-20  left-1/2 tranform -translate-x-1/2 p-[2rem] z-50 grid grid-cols-2 gap-10 h-4 rounded";
	buttonContainer.append(addListBtn, addTodoBtn);

    setUpAddListBtn(addListBtn)
    setUpAddTodoBtn(addTodoBtn)
    matchWidthToBody(buttonContainer)
    setUpButtonContainer(buttonContainer)

	return buttonContainer;
}
