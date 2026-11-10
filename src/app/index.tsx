import { router } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Pressable, Text, View } from "react-native";

type User = {
  id: number;
  name: string;
  email: string;
};

export default function Index() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .finally(() => setLoading(false));
  }, []);

  return (
    <View className="flex-1 bg-slate-100">
      <FlatList
        data={users}
        keyExtractor={(item) => item.id.toString()}
        contentContainerClassName="px-5 pt-5 pb-10 w-full max-w-xl self-center"
        ListHeaderComponent={
          <View className="mb-4">
            <Pressable
              onPress={() => router.push("/todo")}
              className="bg-indigo-600 rounded-2xl p-5 mb-6 shadow-md active:opacity-90">
              <Text className="text-white text-lg font-bold">My Todo List</Text>
              <Text className="text-indigo-100 mt-1">Tap to manage your tasks →</Text>
            </Pressable>
            <Text className="text-slate-900 text-xl font-bold">Users</Text>
            {loading && <ActivityIndicator className="mt-6" color="#4f46e5" />}
          </View>
        }
        renderItem={({ item }) => (
          <Pressable
            onPress={() => router.push(`./users/${item.id}`)}
            className="flex-row items-center bg-white rounded-2xl p-4 mb-3 shadow-sm active:opacity-80">
            <View className="w-10 h-10 rounded-full bg-indigo-100 items-center justify-center mr-3">
              <Text className="text-indigo-600 font-bold">{item.name.charAt(0)}</Text>
            </View>
            <View className="flex-1">
              <Text className="text-base font-semibold text-slate-800">{item.name}</Text>
              <Text className="text-sm text-slate-500">{item.email}</Text>
            </View>
            <Text className="text-slate-300 text-xl">›</Text>
          </Pressable>
        )}
      />
    </View>
  );
}
