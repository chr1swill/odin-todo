'use strict'

class List {
    /**@type { Set<string> }*/
    static #allInstances = new Set()
    /**@type { Set<string> }*/
    #todosInList = new Set()
    /**@type { string }*/
    #name

    /**@param { string } name */
    constructor(name) {
        this.#name = name
        List.#allInstances.add(this.#name)
    }

    /**@returns { Set<string> } - name of all the list that are active */
    static get allInstances() {
        return List.#allInstances
    }

    /**@returns { string }*/
    get name() {
        return this.#name
    }

    /**@type { string }*/
    set name(name) {
        if (typeof name !== 'string') {
            throw TypeError('Expect value of name to be a string')
        }

        this.#name = name.trim()
    }

    get todosInList() {
        return this.#todosInList
    }

    /**@param { string } id - id of the todo you would like to add to list */
    set addTodo(id) {
        if (typeof id !== 'string') {
            throw TypeError('Expect value of todo id to be a string')
        }

        const todo = localStorage.getItem(id)
        if (todo === null) {
            throw ReferenceError('Could not find id in local storage, provide valid id')
        }

        this.#todosInList.add(id)
    }

    /**@param { string } id - id of the todo you would like to remove to list */
    set removeTodo(id) {
        if (typeof id !== 'string') {
            throw TypeError('Expect value of todo id to be a string')
        } 

        const hasId = this.#todosInList.has(id)
        if (hasId === false) {
            throw ReferenceError('Could not find id in list, provide valid id')
        }

        this.#todosInList.delete(id)
    }
}
