import { Text, View } from "react-native";
import { Link } from 'expo-router'

export default function Index() {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-3xl font-pblack">Aora!</Text>
      <Link href="/profile" className="text-blue-700">Go to Profle</Link>
    </View>
  );
}
