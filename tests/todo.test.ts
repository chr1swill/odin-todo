import { Todo } from '../src/logic/todo' 

const testData = {
    title: "Test Todo", 
    dueDate: {day: 1, month: 1, year: 2024}, 
    priority: 0, 
    status: false,
    note: "test is my test note"
}


describe('Todo class', () => {
    test('getInstances should return the current number of instances', () => {
        const todo1 = new Todo(testData.title, testData.dueDate, testData.priority, testData.status,testData.note)
        const todo2 = new Todo(testData.title, testData.dueDate, testData.priority, testData.status,testData.note)
        const todo3 = new Todo(testData.title, testData.dueDate, testData.priority, testData.status,testData.note)
        const todo4 = new Todo(testData.title, testData.dueDate, testData.priority, testData.status,testData.note)
        expect(Todo.getIntances()).toBe(4)
    })
})

describe('Todo class', () => {
    test('deleteInstances method should deincreament number of instances', () => {
        Todo.deletedInstance()
        expect(Todo.getIntances()).toBe(3)
    })
})

describe('Todo class', () => {
    test('setTitle method should change title', () => {
        const todo = new Todo(testData.title, testData.dueDate, testData.priority, testData.status,testData.note)
        todo.setTitle('New Title')
        expect(todo.getTitle()).toBe('New Title')
    })
})

describe('Todo class', () => {
    test('setTitle method on cannot be set to a number', () => {
        const todo = new Todo(testData.title, testData.dueDate, testData.priority, testData.status,testData.note)
        expect(() => todo.setTitle(1)).toThrow("Expect type string, value not valid")
    })
})

describe('Todo class', () => {
    test('setTitle method on cannot be set to a boolean', () => {
        const todo = new Todo(testData.title, testData.dueDate, testData.priority, testData.status,testData.note)
        expect(() => todo.setTitle(true)).toThrow("Expect type string, value not valid")
    })
})

describe('Todo class', () => {
    test('setTitle method on cannot be set to a string of empty charaters ', () => {
        const todo = new Todo(testData.title, testData.dueDate, testData.priority, testData.status,testData.note)
        expect(() => todo.setTitle(" ")).toThrow("Title cannot be an empty string")
    })
})

describe('Todo class', () => {
    test('setTitle method on cannot be set to null', () => {
        const todo = new Todo(testData.title, testData.dueDate, testData.priority, testData.status,testData.note)
        expect(() => todo.setTitle(null)).toThrow("Expect type string, value not valid")
    })
})

describe('Todo class', () => {
    test('setTitle method on cannot be set to undefined', () => {
        const todo = new Todo(testData.title, testData.dueDate, testData.priority, testData.status,testData.note)
        expect(() => todo.setTitle(undefined)).toThrow("Expect type string, value not valid")
    })
})

describe('Todo class', () => {
    test('getId method is a number', () => {
        const todo = new Todo(testData.title, testData.dueDate, testData.priority, testData.status,testData.note)
        expect(typeof todo.getId()).toBe('number')
    })
})

describe('Todo class', () => {
    test('setDueDate method changes dueDate property', () => {
        const todo = new Todo(testData.title, testData.dueDate, testData.priority, testData.status,testData.note)
        todo.setDueDate({ day: 2, month: 2, year: 2024 })
        expect(todo.getDueDate()).toEqual({"day": 2, "month": 2, "year": 2024})
    })
})

describe('Todo class', () => {
    test('setDueDate method throw type error if day value isNaN', () => {
        const todo = new Todo(testData.title, testData.dueDate, testData.priority, testData.status,testData.note)
        expect(() => todo.setDueDate({ day: "NaN", month: 2, year: 2024 })).toThrow("Expected dueDate object's value to all be of type number")
    })
})

describe('Todo class', () => {
    test('setDueDate method throw type error if day value isNaN', () => {
        const todo = new Todo(testData.title, testData.dueDate, testData.priority, testData.status,testData.note)
        expect(() => todo.setDueDate({ day: true, month: 2, year: 2024 })).toThrow("Expected dueDate object's value to all be of type number")
    })
})

describe('Todo class', () => {
    test('setDueDate method throw type error if day value isNaN', () => {
        const todo = new Todo(testData.title, testData.dueDate, testData.priority, testData.status,testData.note)
        expect(() => todo.setDueDate({ day: undefined, month: 2, year: 2024 })).toThrow("Expected dueDate object's value to all be of type number")
    })
})

describe('Todo class', () => {
    test('setDueDate method throw type error if day value isNaN', () => {
        const todo = new Todo(testData.title, testData.dueDate, testData.priority, testData.status,testData.note)
        expect(() => todo.setDueDate({ day: null, month: 2, year: 2024 })).toThrow("Expected dueDate object's value to all be of type number")
    })
})

describe('Todo class', () => {
    test('setDueDate method throw range error if day value is outside of defined range', () => {
        const todo = new Todo(testData.title, testData.dueDate, testData.priority, testData.status,testData.note)
        expect(() => todo.setDueDate({ day: NaN, month: 2, year: 2024 })).toThrow("Day, month, and or year Value if out of range, Date invalid")
    })
})

describe('Todo class', () => {
    test('setDueDate method throw range error if month value is outside of defined range', () => {
        const todo = new Todo(testData.title, testData.dueDate, testData.priority, testData.status,testData.note)
        expect(() => todo.setDueDate({ day: 2, month: NaN, year: 2024 })).toThrow("Day, month, and or year Value if out of range, Date invalid")
    })
})

describe('Todo class', () => {
    test('setDueDate method throw range error if year value is outside of defined range', () => {
        const todo = new Todo(testData.title, testData.dueDate, testData.priority, testData.status,testData.note)
        expect(() => todo.setDueDate({ day: 2, month: 2, year: NaN })).toThrow("Day, month, and or year Value if out of range, Date invalid")
    })
})

describe('Todo class', () => {
    test('setNote method will change value of note', () => {
        const todo = new Todo(testData.title, testData.dueDate, testData.priority, testData.status, undefined)
        todo.setNote("Changed Note")
        expect(todo.getNote()).toBe("Changed Note")
    })
})

