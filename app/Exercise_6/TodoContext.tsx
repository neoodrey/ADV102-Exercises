import React, { createContext, useReducer, ReactNode } from "react";

type Todo = { id: number; text: string };

type State = {
  todos: Todo[];
  history: Todo[]; 
};

type Action =
  | { type: "ADD_TODO"; payload: string }
  | { type: "DELETE_TODO"; payload: number }
  | { type: "UNDO" };

const initialState: State = {
  todos: [],
  history: [],
};

const todoReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "ADD_TODO":
      const newTodo = { id: Date.now(), text: action.payload };
      return {
        todos: [...state.todos, newTodo],
        history: [newTodo, ...state.history],
      };

    case "DELETE_TODO":
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.payload),
      };

    case "UNDO":
      if (state.history.length === 0) return state;
      const lastTodo = state.history[0];
      return {
        ...state,
        todos: [...state.todos, lastTodo],
        history: state.history.slice(1),
      };

    default:
      return state;
  }
};

export const TodoContext = createContext<{
  state: State;
  dispatch: React.Dispatch<Action>;
}>({ state: initialState, dispatch: () => {} });

export const TodoProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(todoReducer, initialState);
  return (
    <TodoContext.Provider value={{ state, dispatch }}>
      {children}
    </TodoContext.Provider>
  );
};
