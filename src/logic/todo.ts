export type DueDate = { day: number, month: number, year: number }

export const enum Priority {
    None = 0,
    Low,
    Medium,
    High
}

export type TodoT = {
    title: string,
    dueDate: DueDate, 
    priority: Priority,
    status: boolean,
    note?: string | undefined | null, 
    list?: string | undefined | null, 
}

export class Todo {
    private static allInstances: Todo[] = []
    private id: number | undefined = undefined

    constructor(
        private title: string, 
        private dueDate: DueDate, 
        private priority: Priority = Priority.None, 
        private status: boolean = false, 
        private note?: string | undefined | null,
        private list?: string | undefined | null 
    ) {
        Todo.allInstances.push(this)
        this.title = title
        this.dueDate = dueDate 
        this.priority = priority
        this.status = status
        this.note = note
        this.list = list
        this.id = Date.now() + Math.random()
    }

    static getAllIntances(): Todo[] {
        return Todo.allInstances
    }

    static getNumberOfInstances(): number {
        return Todo.allInstances.length
    }
    
    setTitle(title: string) {
        if (typeof title !== "string") {
            throw new TypeError("Expect type string, value not valid")
        }
        if (title.trim() === '') throw new Error("Title cannot be an empty string")

        this.title = title
    }

    getTitle(): string {
        return this.title
    }

    getId(): number | undefined {
        if (typeof this.id !== 'number') {
            throw new TypeError("The value of error has not been defined")
        }
        return this.id
    }

    setDueDate(dueDate: DueDate) {
        const isValidDay = dueDate.day >= 1 && dueDate.day <= 31 
        const isValidMonth = dueDate.month >= 1 && dueDate.month <= 12 
        const isValidYear = dueDate.year >= 1 && !isNaN(dueDate.year) 

        if (typeof dueDate.day !== 'number' || typeof dueDate.month !== 'number' || typeof dueDate.year !== 'number') {
            throw new TypeError("Expected dueDate object's value to all be of type number")
        }
        if (!isValidDay || !isValidMonth || !isValidYear) {
            throw new RangeError("Day, month, and or year Value if out of range, Date invalid")
        }
        this.dueDate = dueDate
    }

    getDueDate(): DueDate {
        return this.dueDate
    }

    setNote(note: string | undefined | null) {
       if (typeof note !== "string" && typeof note !== "undefined" && note !== null) {
           throw new TypeError("Expect value of note to be a string, undefined, or null. provided type invalid")
       }
       this.note = note
    }

    getNote(): string | undefined | null {
        return this.note 
    }

    setPriority(priority: Priority) {
        if (priority < 0 || priority > 3) {
            throw new TypeError("Invalid value of priority must be positive number less than or equal to 3")
        }
        this.priority = priority
    } 

    getPriority(): Priority {
        return this.priority
    }
 
    setStatus(status: boolean) {
        if (typeof status !== "boolean") { 
            throw new TypeError("Invalid status, the value of status can only be a boolean")
        }
        this.status = status
    }

    getStatus(): boolean {
        return this.status
    }

    setList(list: string | undefined | null) {
        if (typeof list !== "string" && typeof list !== "undefined" && list !== null) {
            throw new TypeError("Invalid type of list, the value need to be string, undefined, or null")
        }
        this.list = list
    }

    getList(): string | undefined | null {
        return this.list
    }
}
