import { Stack } from 'expo-router';

import TodoList from '../components/TodoList';

export default function TodoScreen() {
  return (
    <>
      <Stack.Screen
        options={{
          title: 'Todo List',
          headerShadowVisible: false,
          headerStyle: { backgroundColor: '#f1f5f9' },
        }}
      />
      <TodoList />
    </>
  );
}
