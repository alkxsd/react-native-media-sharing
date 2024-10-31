import { SafeAreaView, ScrollView, Text, View, Image, KeyboardAvoidingView, Platform } from 'react-native'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import FormTextInput from '@/components/Forms/FormTextInput'
import CustomButton from '@/components/CustomButton'
import { Link, router } from 'expo-router'
import images from '@/constants/Images'
import ErrorMessage from '@/components/Forms/ErrorMessage'
import { signInUser } from '@/lib/firebaseAuth'

const signInSchema = z.object({
  email: z.string().email('Must be a valid email address').min(1, 'Email is required'),
  password: z.string().min(6, 'Password must be at least 6 characters long')
})

type SignInFormData = z.infer<typeof signInSchema>

type Props = {}

const SignIn = (props: Props) => {
  const { control, handleSubmit, setError ,formState: { errors } } = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
  })

  const [isLoading, setIsLoading] = useState<boolean>(false)

  const submit = async (data: SignInFormData) => {
    // TODO: prevent brute-force login, limit login only?
    setIsLoading(true)
    try {
      const user = await signInUser(data.email, data.password)
      if (user) router.replace('/(tabs)/home')
    } catch (error: any) {
      setError('root.firebase', {
        type: 'manual',
        message: error.message, // Use the Firebase error message directly
      });
    } finally {
      setIsLoading(false)
    }
  };

  return (
    <SafeAreaView
      className='bg-primary h-full'
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
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
            <FormTextInput
              name='email'
              title="Email"
              control={control}
              otherStyles='mt-7'
              keyboardType="email-address"
            />
            {errors.email && <ErrorMessage message={errors.email.message ?? ''} />}
            <FormTextInput
              name='password'
              control={control}
              title="Password"
              otherStyles='mt-7'
            />
            {errors.password && <ErrorMessage message={errors.password.message ?? ''} />}
            <CustomButton
              title="Sign in"
              handlePress={handleSubmit(submit)}
              containerStyles={`w-full mt-7`}
              isLoading={isLoading}
            />
            {errors.root?.firebase && <ErrorMessage message={errors.root.firebase.message?? ''} />}
            <View
              className='flex flex-row pt-5 justify-center gap-2'
            >
              <Text className='text-lg text-secondary-200 font-pregular'>Don't have an account?</Text>
              <Link
                href='/sign-up'
                className='text-lg font-psemibold text-secondary underline'
              >
                Sign Up
              </Link>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export default SignIn
