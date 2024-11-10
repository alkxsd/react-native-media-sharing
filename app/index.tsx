import { Image, ScrollView, Text, View } from "react-native"
import { router } from 'expo-router'
import { StatusBar } from "expo-status-bar"
import { SafeAreaView } from "react-native-safe-area-context"
import { images } from "@/constants/Index"
import { AppColors } from "@/constants/AppColors"
import ImageLogo from "@/components/ImageLogo"
import CustomButton from "@/components/CustomButton"
import { useAuth } from "@/contexts/AuthContext"
import { useEffect } from "react"

export default function Index() {
  const { user } = useAuth()

  useEffect(() => {
    // TODO: implement loading effect
    if (user) {
      router.replace('/(tabs)/home')
    }
  }, [user])


  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView
        contentContainerStyle={{
          height: '100%'
        }}
      >
        <View className="w-full items-center justify-center min-h-[85vh] px-4">
          <ImageLogo />
          <Image
            source={images.cards}
            className="max-w-[380px] w-full h-[300px]"
            resizeMode="contain"
          />
          <View className="relative mt-5">
            <Text className="text-3xl text-white text-center">
              Find your way to endless possibilities with{' '}
              <Text className="text-secondary-200">Motorpilot</Text>
            </Text>
          </View>
          <Text
            className="text-sm font-pregular text-gray-100 mt-7 text-center"
          >
            Ignite your imagination and innovate without boundaries. Explore the limitless!
          </Text>
          <CustomButton
            title="Continue with Email"
            handlePress={() => router.push('/sign-in')}
            containerStyles="w-full mt-7"
          />
        </View>
      </ScrollView>
      <StatusBar backgroundColor={AppColors.primary.DEFAULT} style="light"/>
    </SafeAreaView>
  );
}
