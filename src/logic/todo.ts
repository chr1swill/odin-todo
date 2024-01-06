export type DueDate = { day: number, month: number, year: number }

export const enum Priority {
    None = 0,
    Low,
    Medium,
    High
}

export class Todo {
    private static instances: number = 0

    constructor(private title: string, private id: number, private dueDate: DueDate, private priority: Priority, private note?: string) {
        Todo.instances++
        this.title = title
        this.id = id 
        this.note = note
        this.dueDate = dueDate 
        this.priority = priority
    }

    static getIntances() {
        return Todo.instances
    }

    static deletedInstance() {
        Todo.instances--
    }
    
    setTitle(title: string) {
        if (typeof title !== "string") {
            throw new TypeError("Expect type string, value not valid")
        }
        this.title = title
    }

    getTitle(): string {
        return this.title
    }

    getId(): number {
        return this.id
    }

    setDueDate(dueDate: DueDate) {
        const isValidDay = dueDate.day > 1 && dueDate.day < 31 
        const isValidMonth = dueDate.month > 1 && dueDate.month < 12 
        const isValidYear = dueDate.year > 2024 && dueDate.year < 9999 

        if (isNaN(dueDate.day) || isNaN(dueDate.month) || isNaN(dueDate.year)) {
            throw new TypeError("Exexpt dueDate objects keys day, month, and year value to be of type number")
        }
        if (!isValidDay || !isValidMonth || !isValidYear) {
            throw new RangeError("Day, month, and or year Value if out of range, Date invalid")
        }
        this.dueDate = dueDate
    }

    getDueDate(): DueDate {
        return this.dueDate
    }


    setNote(note: string) {
       if (typeof note !== "string") {
           throw new TypeError("Expect value of note to be a string, provided type invalid")
       }
       this.note = note
    }

    getNote(): string | undefined {
        return this.note 
    }

    setPriority(priority: Priority) {
        if (priority < 0 || priority > 3) {
            throw new TypeError("Invalid value of priority must be positive number less than 4")
        }
        this.priority = priority
    } 

    getPriority(): Priority {
        return this.priority
    }
}
