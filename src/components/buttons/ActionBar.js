import { AddButtonComponent } from "../buttons/AddButton";

function showCreateListModal() {}

function showCreateTodoModal() {}

export function ActionBarComponent() {
    const addListBtn = document.createElement("div");
    const addTodoBtn = document.createElement("div")
    addListBtn.className = "flex flex-row items-center"
    addTodoBtn.className = "flex flex-row items-center"
    addListBtn.innerHTML = AddButtonComponent("Add List");
    addTodoBtn.innerHTML = AddButtonComponent("Add Todo");
    
    
    // TODO: Add ability to add list and todo
    addListBtn.addEventListener("click", (e) => {
        e.preventDefault()
        showCreateListModal()
    })

    addTodoBtn.addEventListener("click", (e) => {
        e.preventDefault()
        showCreateTodoModal()
    })

    return `<div class="grid grid-cols-2 gap-2">${addListBtn}${addTodoBtn}</div>`;

}
