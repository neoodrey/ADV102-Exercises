import React, { useContext, useState } from "react";
import { View, Text, TextInput, Button, FlatList, StyleSheet } from "react-native";
import { TodoContext } from "./TodoContext";

const TodoApp = () => {
  const { state, dispatch } = useContext(TodoContext);
  const [text, setText] = useState("");

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Todo List</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Enter a todo"
        value={text}
        onChangeText={setText}
      />

      <Button title="Add Todo" onPress={() => {
        if (text.trim()) {
          dispatch({ type: "ADD_TODO", payload: text });
          setText("");
        }
      }} />

      <FlatList
        data={state.todos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.todoItem}>
            <Text>{item.text}</Text>
            <Button title="Delete" color="red" onPress={() => dispatch({ type: "DELETE_TODO", payload: item.id })} />
          </View>
        )}
      />

      <Button title="Undo" onPress={() => dispatch({ type: "UNDO" })} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20, backgroundColor: "#FFFFF0" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 10 },
  input: { borderWidth: 1, padding: 8, marginBottom: 10, borderRadius: 5 },
  todoItem: { flexDirection: "row", justifyContent: "space-between", marginVertical: 5 },
});

export default TodoApp;
