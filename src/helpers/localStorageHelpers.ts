import { Todo } from "../types";

export const loadTodosFromLocalStorage = (): Todo[] => {
  try {
    const serializedState = localStorage.getItem("todos");
    if (serializedState === null) {
      return [];
    }
    return JSON.parse(serializedState);
  } catch (error) {
    console.error("Failed to load todos from localStorage", error);
    return [];
  }
};

export const loadTrashFromLocalStorage = (): Todo[] => {
  try {
    const serializedState = localStorage.getItem("trash");
    if (serializedState === null) {
      return [];
    }
    return JSON.parse(serializedState);
  } catch (error) {
    console.error("Failed to load todos from localStorage", error);
    return [];
  }
};

export const saveTodosToLocalStorage = (todos: Todo[]): void => {
  try {
    const serializedState = JSON.stringify(todos);
    localStorage.setItem("todos", serializedState);
  } catch (error) {
    console.error("Failed to save todos to localStorage", error);
  }
};

export const deleteTodoFromLocalStorage = (id: string): void => {
  try {
    const todosData = localStorage.getItem("todos");
    if (todosData) {
      const todos = JSON.parse(todosData) as Todo[];
      const deletedTodo = todos.find(todo => todo.id === id);

      if (deletedTodo) {
        const updatedTodos = todos.filter(todo => todo.id !== id);
        localStorage.setItem("todos", JSON.stringify(updatedTodos));

        const trashData = localStorage.getItem("trash") || "[]";
        const trash = JSON.parse(trashData) as Todo[];
        const updatedTrash = [...trash, deletedTodo];
        localStorage.setItem("trash", JSON.stringify(updatedTrash));
      }
    }
  } catch (error) {
    console.error(
      `Failed to delete todo with ID ${id} from local storage:`,
      error
    );
  }
};
