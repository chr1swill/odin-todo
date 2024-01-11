/** @enum { number } */
const Priority = {
    NONE: 0, 
    LOW: 1, 
    MEDIUM: 2, 
    HIGH: 3
}

/** @enum { string } */
const AllowedTypes = {
    NUMBER: 'number',
    STRING: 'string', 
    BOOLEAN: 'boolean'
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

    /**
     * handle getting item form local storage on todo properties
     *
     * @param { string } property - key you would like to access the value to on this todo object 
     * */
    #handleLocalStorageGet(property) {
        const todoString = localStorage.getItem(this.#id)
        if (todoString === null) {
            throw new ReferenceError('Not able to access value of null')
        }

        const todoObj = JSON.parse(todoString)
        if (todoObj[property] !== undefined) {
            return todoObj[property]
        }
        throw new ReferenceError('Not able to access undefined property')
    }

    /**
     * handle setting value of todo properies in local storage 
     *
     * @param { string } property - key of the value to you would like to modify 
     * @param { number | string | boolean } newValue - new value you would like to set the key 
     * @param { AllowedTypes } newValueType - type of the newValue, need to be boolean, number, or string
     * */
    #handleLocalStorageSet(property, newValue, newValueType) {
        if (typeof newValue !== newValueType) {
            throw new TypeError(`Value must be a ${newValueType}`)
        }

        const todoString = localStorage.getItem(this.#id)
        if (todoString === null) {
            throw new ReferenceError('Not able to access value of null')
        }

        const todoObj  = JSON.parse(todoString)
        if (typeof property !== 'string') {
            throw new TypeError('Value must be string')
        }
        todoObj[property] = newValue
        localStorage.setItem(this.#id, JSON.stringify(todoObj))
    }

    /**@returns { string | Error }*/
    get title() {
        return this.#handleLocalStorageGet('title')
    }

    /**@param { string } title */
    set title(title) {
        this.#handleLocalStorageSet('title', title, AllowedTypes.STRING)
    }

    /**@returns { string | Error }*/
    get note() {
        return this.#handleLocalStorageGet('note')
    }

    /**@param { string } note */
    set note(note) {
        this.#handleLocalStorageSet('note', note, AllowedTypes.STRING)
    }

    /**@returns { string | Error }*/
    get list() {
        return this.#handleLocalStorageGet('list')
    }

    /**@param { string } list */
    set list(list) {
        this.#handleLocalStorageSet('list', list, AllowedTypes.STRING)
    }

    /**@returns { number | Error }*/
    get priority() {
        return this.#handleLocalStorageGet('priority')
    }

    /**@param { Priority } priority */
    set priority(priority) {
        this.#handleLocalStorageSet('priority', priority, AllowedTypes.NUMBER)
    }

    /**@returns { boolean | Error }*/
    get complete() {
        return this.#handleLocalStorageGet('complete')
    }

    /**@param { boolean } complete */
    set complete(complete) {
        this.#handleLocalStorageSet('complete', complete, AllowedTypes.BOOLEAN)
    }
}
