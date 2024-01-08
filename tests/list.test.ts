import { List } from '../src/logic/list';
import { Priority, Todo } from '../src/logic/todo';

describe('List', () => {
    let list: List;
    let todo: Todo;

    beforeEach(() => {
        list = new List("Test List");
        todo = new Todo("Test List", { day: 1, month: 1, year: 2024 }, Priority.None, false, undefined, null)
 // assuming Todo class constructor and necessary setters
        // Set up Todo with valid data
        // Example: todo.setTitle("Test Todo"), etc.
    });

    afterEach(() => {
        List.resetInstance();
    });

    test('should create a new list instance', () => {
        expect(list).toBeInstanceOf(List);
    });

    test('should add a new Todo to the list', () => {
        list.addTodo(todo);
        expect(list.getTodosInList()).toContain(todo);
    });

    test('should throw error if adding a duplicate Todo', () => {
        list.addTodo(todo);
        expect(() => {
            list.addTodo(todo);
        }).toThrow(Error);
    });

    test('should remove a Todo from the list', () => {
        list.addTodo(todo);
        const todoId = todo.getId();
        list.removeTodo(todoId);
        expect(list.getTodosInList()).not.toContain(todo);
    });

    test('should throw error if trying to remove a non-existent Todo', () => {
        expect(() => {
            list.removeTodo(999); // assuming 999 is a non-existent ID
        }).toThrow(ReferenceError);
    });

    test('should return the correct number of list instances', () => {
        const newList = new List("Another List");
        expect(List.getNumberOfInstances()).toBe(2);
    });

    test('should return all list instances', () => {
        const newList = new List("Another List");
        expect(List.getAllInstances()).toContain(list);
        expect(List.getAllInstances()).toContain(newList);
    });

    test('should reset all list instances', () => {
        List.resetInstance();
        expect(List.getAllInstances()).toEqual([]);
    });

    test('should delete a specific list by id', () => {
        const id = list.getId();
        List.deleteList(id);
        expect(List.getAllInstances()).not.toContain(list);
    });

    test('should throw error when deleting a list with invalid id', () => {
        expect(() => {
            List.deleteList(-1);
        }).toThrow(RangeError);
    });

    // Additional tests can be written for other methods and edge cases
});
