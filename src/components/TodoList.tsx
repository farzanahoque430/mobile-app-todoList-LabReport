import { useState } from 'react';
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  Text,
  TextInput,
  View,
} from 'react-native';

type Task = {
  id: string;
  text: string;
  completed: boolean;
};

type Filter = 'all' | 'active' | 'done';

const FILTERS: { key: Filter; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'active', label: 'Active' },
  { key: 'done', label: 'Done' },
];

const TodoList = () => {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<Filter>('all');

  const remaining = tasks.filter((t) => !t.completed).length;
  const completed = tasks.length - remaining;
  const progress = tasks.length === 0 ? 0 : Math.round((completed / tasks.length) * 100);

  const visibleTasks = tasks.filter((t) =>
    filter === 'active' ? !t.completed : filter === 'done' ? t.completed : true
  );

  const addTask = () => {
    const text = task.trim();
    if (!text) return;
    setTasks((prev) => [{ id: Date.now().toString(), text, completed: false }, ...prev]);
    setTask('');
  };

  const toggleTask = (id: string) => {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)));
  };

  const deleteTask = (id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  const clearCompleted = () => {
    setTasks((prev) => prev.filter((t) => !t.completed));
  };

  const emptyMessage =
    tasks.length === 0
      ? 'No tasks yet.\nAdd your first task above!'
      : filter === 'active'
        ? 'All done — nice work! 🎉'
        : 'No completed tasks yet.';

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-slate-100"
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <View className="flex-1 px-5 pt-5">
        {/* Header card with progress */}
        <View className="bg-[#C9BBC8] rounded-3xl p-5 mb-5 shadow-lg">
          <Text className="text-pink-500 text-sm font-medium">Today</Text>
          <Text className="text-pink-800 text-3xl font-bold mt-1">My Tasks</Text>
          <Text className="text-pink-700 mt-1">
            {remaining === 0
              ? tasks.length === 0
                ? 'Start by adding a task'
                : 'Everything is done!'
              : `${remaining} task${remaining === 1 ? '' : 's'} remaining`}
          </Text>

          <View className="flex-row items-center mt-4">
            <View className="flex-1 h-2 bg-white/70 rounded-full overflow-hidden">
              <View className="h-2 bg-pink-500 rounded-full" style={{ width: `${progress}%` }} />
            </View>
            <Text className="text-pink-800 font-semibold ml-3">{progress}%</Text>
          </View>
        </View>

        {/* Input */}
        <View className="flex-row items-center bg-white rounded-2xl pl-4 pr-2 py-2 mb-4 shadow-sm">
          <TextInput
            value={task}
            onChangeText={setTask}
            onSubmitEditing={addTask}
            returnKeyType="done"
            placeholder="What do you need to do?"
            placeholderTextColor="#94a3b8"
            className="flex-1 text-base text-slate-900 py-2"
          />
          <Pressable
            onPress={addTask}
            disabled={!task.trim()}
            className={`w-11 h-11 rounded-xl items-center justify-center active:opacity-80 ${
              task.trim() ? 'bg-indigo-600' : 'bg-slate-200'
            }`}>
            <Text className={`text-2xl font-light ${task.trim() ? 'text-white' : 'text-slate-400'}`}>
              +
            </Text>
          </Pressable>
        </View>

        {/* Filter tabs */}
        <View className="flex-row items-center justify-between mb-3">
          <View className="flex-row bg-slate-200/70 rounded-xl p-1">
            {FILTERS.map((f) => (
              <Pressable
                key={f.key}
                onPress={() => setFilter(f.key)}
                className={`px-4 py-1.5 rounded-lg ${filter === f.key ? 'bg-white shadow-sm' : ''}`}>
                <Text
                  className={`text-sm font-medium ${
                    filter === f.key ? 'text-slate-900' : 'text-slate-500'
                  }`}>
                  {f.label}
                </Text>
              </Pressable>
            ))}
          </View>
          {completed > 0 && (
            <Pressable onPress={clearCompleted} className="active:opacity-60">
              <Text className="text-sm text-slate-500">Clear completed</Text>
            </Pressable>
          )}
        </View>

        {/* List */}
        <FlatList
          data={visibleTasks}
          keyExtractor={(item) => item.id}
          contentContainerClassName="pb-10"
          keyboardShouldPersistTaps="handled"
          ListEmptyComponent={
            <View className="items-center mt-14">
              <Text className="text-5xl mb-3">📝</Text>
              <Text className="text-slate-400 text-base text-center">{emptyMessage}</Text>
            </View>
          }
          renderItem={({ item }) => (
            <View
              className={`flex-row items-center rounded-2xl px-4 py-3.5 mb-3 shadow-sm ${
                item.completed ? 'bg-white/60' : 'bg-white'
              }`}>
              <Pressable
                onPress={() => toggleTask(item.id)}
                className="flex-row items-center flex-1"
                accessibilityRole="checkbox"
                accessibilityState={{ checked: item.completed }}>
                <View
                  className={`w-6 h-6 rounded-full border-2 mr-3 items-center justify-center ${
                    item.completed ? 'bg-emerald-500 border-emerald-500' : 'border-slate-300'
                  }`}>
                  {item.completed && <Text className="text-white text-xs font-bold">✓</Text>}
                </View>
                <Text
                  className={`flex-1 text-base ${
                    item.completed ? 'text-slate-400 line-through' : 'text-slate-800'
                  }`}>
                  {item.text}
                </Text>
              </Pressable>
              <Pressable
                onPress={() => toggleTask(item.id)}
                className={`ml-3 rounded-lg px-3 py-1.5 active:opacity-70 ${
                  item.completed ? 'bg-slate-100' : 'bg-emerald-50'
                }`}>
                <Text
                  className={`text-sm font-medium ${
                    item.completed ? 'text-slate-600' : 'text-emerald-600'
                  }`}>
                  {item.completed ? 'Undo' : 'Complete'}
                </Text>
              </Pressable>
              <Pressable
                onPress={() => deleteTask(item.id)}
                accessibilityLabel="Delete task"
                className="ml-2 w-8 h-8 rounded-lg bg-red-50 items-center justify-center active:opacity-70">
                <Text className="text-red-500 text-base">✕</Text>
              </Pressable>
            </View>
          )}
        />
      </View>
    </KeyboardAvoidingView>
  );
};

export default TodoList;
