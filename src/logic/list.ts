import { Todo } from './todo'

export class List {
    private static allInstances: List[] = []
    private todosInList: Todo[] = []
    private id: number

    constructor(private name: string) {
        this.name = name
        List.allInstances.push(this)
        this.id = Date.now() + Math.random()
    }

    static getAllInstances(): List[] {
        return List.allInstances
    }

    static getNumberOfInstances(): number {
        return List.allInstances.length
    }

    static resetInstance(): void {
        List.allInstances = []
    }

    getName(): string {
        return this.name
    }

    getTodosInList(): Todo[] {
        return this.todosInList
    }

    getListLength(): number {
        return this.todosInList.length
    }

    getId(): number {
        if (isNaN(this.id) || this.id === undefined || this.id === null ) {
            throw new ReferenceError("Cannot access Id that has not been defined")
        }
        return this.id
    }

    addTodo(todo: Todo): void {
        const isValidDay = todo.getDueDate().day >= 1 && todo.getDueDate().day <= 31 
        const isValidMonth = todo.getDueDate().month >= 1 && todo.getDueDate().month <= 12 
        const isValidYear = todo.getDueDate().year >= 1 && !isNaN(todo.getDueDate().year) 

        if (this.todosInList.includes(todo)) {
            throw new Error("Todo is already in list")
        }

        if (typeof todo.getTitle() !== 'string') {
            throw new TypeError("Title of todo need to be a string")
        }

        if (typeof todo.getTitle() !== 'string' || todo.getTitle().trim() === '') {
            throw new Error("Invalid todo title")
        } 

        if (typeof todo.getDueDate().day !== 'number' || 
            typeof todo.getDueDate().month !== 'number' || 
            typeof todo.getDueDate().year !== 'number') 
            {
            throw new TypeError("Expected dueDate object's value to all be of type number")
        }

        if (!isValidDay || !isValidMonth || !isValidYear) {
            throw new RangeError("Day, month, and or year Value if out of range, Date invalid")
        }

        if (todo.getPriority() < 0 || todo.getPriority() > 3) {
            throw new TypeError("Invalid value of priority must be positive number less than or equal to 3")
        }

        if (typeof todo.getStatus() !== "boolean") { 
            throw new TypeError("Invalid status, the value of status can only be a boolean")
        }

        if (typeof todo.getNote() !== "string" && typeof todo.getNote() !== "undefined" && todo.getNote() !== null) {
            throw new TypeError("Expect value of note to be a string, undefined, or null. provided type invalid")
        }

        if (typeof todo.getList() !== "string" && typeof todo.getList() !== "undefined" && todo.getList() !== null) {
            throw new TypeError("Invalid type of list, the value need to be string, undefined, or null")
        }

        this.todosInList.push(todo)
    }

    removeTodo(id: number): void {
        if (typeof id !== "number") {
            throw new TypeError("Invalid id, needs to be of type number")
        }
        if (id <= 0) {
            throw new RangeError("Id out of range, needs to be a number greater that 0")
        } 

        let tmp: boolean = true
        const numberOfInstances: number = this.getListLength()
        const arrOfLists: Todo[] = this.getTodosInList()

        for (let i = 0; i < numberOfInstances; i++) {
            if (arrOfLists[i].getId() === id) {
                this.todosInList.splice(i, 1)
                tmp = false
                break
            } 
        }

        if (tmp) {
            throw new ReferenceError("Id does not correspond to a valid Todo id")
        }
    }
}
