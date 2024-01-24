import { TitleBar } from '../components/sections/TitleBar'
import { TodoComponent } from '../components/sections/Todo'
import { Todo } from '../logic/todo'
import { ActionBarComponent } from '../components/buttons/ActionBar'

export function RenderHomePage() {
    const sectionContent = document.createElement('section')

    const titleBar = TitleBar("All Todos", "Add Todos")

    const allTodos = Todo.allInstances
    if (allTodos === null || allTodos === undefined) {
        sectionContent.appendChild(titleBar)
        sectionContent.appendChild(TodoComponent())
        // TODO: section to show my active list 
        sectionContent.appendChild(ActionBarComponent())

        return sectionContent
    }

    sectionContent.appendChild(titleBar)

    const listOfTodoWrapper = document.createElement('div')
    for (let i = 0; i < allTodos.length - 1; i++) {
        const todo = allTodos[i]
        listOfTodoWrapper.appendChild(TodoComponent(todo.id, todo.title, todo.note, todo.priority, todo.complete, todo.list))
    }
    // TODO: make it so this empty todo can be clicked on to create a new todo
    listOfTodoWrapper.appendChild(TodoComponent())

    sectionContent.appendChild(listOfTodoWrapper)
    // TODO: section to show my active list 
    sectionContent.appendChild(ActionBarComponent())

    return sectionContent
}
