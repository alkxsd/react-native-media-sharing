import { SafeAreaView, ScrollView, Text, View, Image } from 'react-native'
import React, { useState } from 'react'
import ImageLogo from '@/components/ImageLogo'
import FormField from '@/components/Forms/FormField'
import CustomButton from '@/components/CustomButton'
import { Link } from 'expo-router';
import images from '@/constants/Images'

interface FormState {
  email: string;
  password: string;
}

type Props = {}

const SignIn = (props: Props) => {
  const [form, setForm] = useState<FormState>({
    email: '',
    password: '',
  });

  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit =  () => {

  };

  return (
    <SafeAreaView
      className='bg-primary h-full'
    >
      <ScrollView>
        <View className='w-full justify-center items-center min-h-[85vh]  px-4 my-6'>
          <Image
            source={images.logoSmall}
            className="w-[90px] h-[65px]"
            resizeMode="contain"
          />
          <Text
            className='text-2xl text-white text-semibold mt-4 font-psemibold'
          >
            Login in to <Text className='text-secondary-100'>Motorpilot</Text>
          </Text>
          <FormField
            title="Email"
            value={form.email}
            handleChangeText={(v: string) => setForm({...form, email: v})}
            otherStyles='mt-7'
            keyboardType="email-address"
          />
          <FormField
            title="Password"
            value={form.password}
            handleChangeText={(v: string) => setForm({...form, password: v})}
            otherStyles='mt-7'
          />
          <CustomButton
            title="Sign in"
            handlePress={handleSubmit}
            containerStyles='w-full mt-7'
            isLoading={isLoading}
          />
          <View
            className='flex flex-row pt-5 justify-center gap-2'
          >
            <Text className='text-lg text-gray-100 font-pregular'>Don't have an account?</Text>
            <Link
              href='/sign-up'
              className='text-lg font-psemibold text-secondary'
            >
              Sign Up
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignIn
