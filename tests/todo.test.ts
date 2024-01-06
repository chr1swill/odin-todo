import { Todo } from '../src/logic/todo' 

const testData = {
    title: "Test Todo", 
    id: 1, 
    dueDate: {day: 1, month: 1, year: 2024}, 
    priority: 0, 
    note: "test is my test note"
}

describe('Todo class', () => {
    test('setTitle method should change title', () => {
        const todo = new Todo(testData.title, testData.id, testData.dueDate, testData.priority, testData.note)
        todo.setTitle('New Title')
        expect(todo.getTitle()).toBe('New Title')
    })
})

describe('Todo class', () => {
    test('setTitle method on cannot be set to a number', () => {
        const todo = new Todo(testData.title, testData.id, testData.dueDate, testData.priority, testData.note)
        expect(() => todo.setTitle(1)).toThrow("Expect type string, value not valid")
    })
})

describe('Todo class', () => {
    test('setTitle method on cannot be set to a boolean', () => {
        const todo = new Todo(testData.title, testData.id, testData.dueDate, testData.priority, testData.note)
        expect(() => todo.setTitle(true)).toThrow("Expect type string, value not valid")
    })
})

describe('Todo class', () => {
    test('setTitle method on cannot be set to a string of empty charaters ', () => {
        const todo = new Todo(testData.title, testData.id, testData.dueDate, testData.priority, testData.note)
        expect(() => todo.setTitle(" ")).toThrow("Expect type string, value not valid")
    })
})

describe('Todo class', () => {
    test('setTitle method on cannot be set to null', () => {
        const todo = new Todo(testData.title, testData.id, testData.dueDate, testData.priority, testData.note)
        expect(() => todo.setTitle(null)).toThrow("Expect type string, value not valid")
    })
})

describe('Todo class', () => {
    test('setTitle method on cannot be set to undefined', () => {
        const todo = new Todo(testData.title, testData.id, testData.dueDate, testData.priority, testData.note)
        expect(() => todo.setTitle(undefined)).toThrow("Expect type string, value not valid")
    })
})
