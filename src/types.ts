export interface Todo {
  id: string;
  title: string;
  status: string;
  description?: string;
  deadline?: string;
}

export interface TodoState {
  todos: Todo[];
  deletedTodos: Todo[];
}

export interface TodoFormValues {
  id: string;
  title: string;
  description: string;
  status: string;
  deadline: string;
}

interface TodoCardProps {
  todo: Todo;
}
