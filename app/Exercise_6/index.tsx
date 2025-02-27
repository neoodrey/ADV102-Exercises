import React from "react";
import { TodoProvider } from "./TodoContext";
import TodoApp from "./TodoApp";
import { View, } from "react-native";

export default function App() {
  return (
    <TodoProvider>
      <View style={{ flex: 1 }}>
        <TodoApp />
      </View>
    </TodoProvider>
  );
}
