import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Todo, TodoState } from "../../types";
import {
  deleteTodoFromLocalStorage,
  loadTodosFromLocalStorage,
  loadTrashFromLocalStorage,
  saveTodosToLocalStorage,
} from "../../helpers/localStorageHelpers";

const initialState: TodoState = {
  todos: loadTodosFromLocalStorage(),
  deletedTodos: loadTrashFromLocalStorage(),
};
const toggleStatus = (status: string): string => {
  return status === "Completed" ? "Pending" : "Completed";
};

const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<Todo>) => {
      state.todos.push(action.payload);
      saveTodosToLocalStorage(state.todos);
      return state;
    },
    deleteTodo: (state, action: PayloadAction<string>) => {
      const deletedTodo = state.todos.find(todo => todo.id === action.payload);
      if (deletedTodo) {
        state.todos = state.todos.filter(todo => todo.id !== action.payload);
        deletedTodo.status = "Removed";
        state.deletedTodos.push(deletedTodo);
      }
      deleteTodoFromLocalStorage(action.payload);
    },
    markAsComplete: (state, action: PayloadAction<string>) => {
      const todo = state.todos.find(todo => todo.id === action.payload);
      if (todo) {
        todo.status = toggleStatus(todo.status);
        saveTodosToLocalStorage(state.todos);
      }
    },
    checkOverdue: state => {
      const currentDate = new Date();
      state.todos.forEach(todo => {
        if (
          todo.deadline &&
          new Date(todo.deadline) < currentDate &&
          todo.status !== "Completed"
        ) {
          todo.status = "Overdue";
        }
      });
      saveTodosToLocalStorage(state.todos);
    },

    editTodo: (state, action: PayloadAction<Todo>) => {
      const editedTodo = action.payload;
      state.todos = state.todos.map(task =>
        task.id === editedTodo.id ? editedTodo : task
      );
      saveTodosToLocalStorage(state.todos);
    },
  },
});

export const { addTodo, deleteTodo, editTodo, markAsComplete, checkOverdue } =
  todoSlice.actions;
export default todoSlice.reducer;
