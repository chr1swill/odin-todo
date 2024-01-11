/** @enum { number } */
const Priority = {
    NONE: 0, 
    LOW: 1, 
    MEDIUM: 2, 
    HIGH: 3
}

class Todo {
    /** @type { string }*/
    #id  

    constructor() {
        this.#id = (Date.now() + Math.random()).toString()
        localStorage.setItem(this.#id, JSON.stringify(this)) 
    }
    
    /** @returns { string } todo unique id number as a string */
    get id() {
        return this.#id
    }

    /** @returns { string } todo title as a string */
    get title() {
        const todoString = localStorage.getItem(this.#id)
        if (todoString === null) {
            throw new ReferenceError('Not able to access value of null')
        }

        const todoObj = JSON.parse(todoString)
        if (todoObj.title !== undefined) {
            return todoObj.title
        }
        throw new ReferenceError('Not able to access undefined property')
    }

    /**@param { string } title */
    set title(title) {
        if (typeof title !== 'string') {
            throw new TypeError('Value must be a string')
        }

        const todoString = localStorage.getItem(this.#id)
        if (todoString === null) {
            throw new ReferenceError('Not able to access value of null')
        }

        const todoObj  = JSON.parse(todoString)
        todoObj.title = title 
        localStorage.setItem(this.#id, JSON.stringify(todoObj))
    }

    /** @returns { string } todo note as a string */
    get note() {
        const todoString = localStorage.getItem(this.#id)
        if (todoString === null) {
            throw new ReferenceError('Not able to access value of null')
        }

        const todoObj = JSON.parse(todoString)
        if (todoObj.note !== undefined) {
            return todoObj.note
        }
        throw new ReferenceError('Not able to access undefined property')
    }

    /**@param { string } note */
    set note(note) {
        if (typeof note !== 'string') {
            throw new TypeError('Value must be a string')
        }

        const todoString = localStorage.getItem(this.#id)
        if (todoString === null) {
            throw new ReferenceError('Not able to access value of null')
        }

        const todoObj  = JSON.parse(todoString)
        todoObj.note = note 
        localStorage.setItem(this.#id, JSON.stringify(todoObj))
    }

    /** @returns { string } todo list as a string */
    get list() {
        const todoString = localStorage.getItem(this.#id)
        if (todoString === null) {
            throw new ReferenceError('Not able to access value of null')
        }

        const todoObj = JSON.parse(todoString)
        if (todoObj.list !== undefined) {
            return todoObj.list
        }
        throw new ReferenceError('Not able to access undefined property')
    }

    /**@param { string } list */
    set list(list) {
        if (typeof list !== 'string') {
            throw new TypeError('Value must be a string')
        }

        const todoString = localStorage.getItem(this.#id)
        if (todoString === null) {
            throw new ReferenceError('Not able to access value of null')
        }

        const todoObj  = JSON.parse(todoString)
        todoObj.list = list
        localStorage.setItem(this.#id, JSON.stringify(todoObj))
    }

    /** @returns { string } todo priority as a string */
    get priority() {
        const todoString = localStorage.getItem(this.#id)
        if (todoString === null) {
            throw new ReferenceError('Not able to access value of null')
        }

        const todoObj = JSON.parse(todoString)
        if (todoObj.priority !== undefined) {
            return todoObj.priority
        }
        throw new ReferenceError('Not able to access undefined property')
    }

    /**@param { Priority } priority */
    set priority(priority) {
        if (typeof priority !== 'number') {
            throw new TypeError('Value must be a number')
        }

        const todoString = localStorage.getItem(this.#id)
        if (todoString === null) {
            throw new ReferenceError('Not able to access value of null')
        }

        const todoObj  = JSON.parse(todoString)
        todoObj.priority = priority.toString()
        localStorage.setItem(this.#id, JSON.stringify(todoObj))
    }
}
