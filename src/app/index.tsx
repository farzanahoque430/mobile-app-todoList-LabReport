import { Stack } from "expo-router";

import TodoList from "../components/TodoList";

export default function Index() {
  return (
    <>
      <Stack.Screen
        options={{
          title: "Todo List",
          headerShadowVisible: false,
          headerStyle: { backgroundColor: "#f1f5f9" },
          headerTitleStyle: {
            fontSize: 30,
            fontWeight: "800",
            color: "#9333ea",
          },
        }}
      />
      <TodoList />
    </>
  );
}
