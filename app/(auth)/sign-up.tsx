import { SafeAreaView, ScrollView, Text, View, Image, Platform, KeyboardAvoidingView } from 'react-native'
import React, { useEffect, useState } from 'react'
import FormTextInput from '@/components/Forms/FormTextInput'
import CustomButton from '@/components/CustomButton'
import { Link, router } from 'expo-router';
import images from '@/constants/Images'
import ErrorMessage from '@/components/Forms/ErrorMessage'
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signUpUser } from '@/services/firebaseService';
import Loader from '@/components/Loader';
import { SignUpUserInterface } from '@/interfaces/userInterfaces';
import { useUserStore } from '@/stores/userStore';

export const signUpSchema = z.object({
  firstname: z
    .string()
    .min(2, { message: 'First name must be at least 2 characters long' })
    .max(50, { message: 'First name must not exceed 50 characters' })
    .min(1, { message: 'First name is required' }),
  lastname: z
    .string()
    .min(2, { message: 'Last name must be at least 2 characters long' })
    .max(50, { message: 'Last name must not exceed 50 characters' })
    .min(1, { message: 'Last name is required' }),
  email: z
    .string()
    .email({ message: 'Invalid email address' })
    .min(1, { message: 'Email is required' }),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters long' })
    .min(1, { message: 'Password is required' }),
  confirmPassword: z
    .string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"], // path of error
})

export type SignUpFormData = z.infer<typeof signUpSchema>;

type Props = {}

const SignUp = (props: Props) => {
  const { control, handleSubmit, setError, formState: { errors } } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
  })

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const submit = async (data: SignUpFormData) => {
    setIsLoading(true);

    try {
      // Firebase signup
      const signUpData: SignUpUserInterface = {
        firstName: data.firstname,
        lastName: data.lastname,
        email: data.email,
        password: data.password
      }

      const user = await signUpUser(signUpData)

      if (user) router.replace('/(tabs)/home'); // Redirect to sign-in after successful signup
    } catch (error: any) {
      setError('root.signup', {
        type: 'manual',
        message: error.message
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <SafeAreaView
      className='bg-primary h-full'
    >
      <Loader isLoading={isLoading} />
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
              Sign up to <Text className='text-secondary-100'>Motorpilot</Text>
            </Text>

            <FormTextInput
              name="firstname"
              control={control}
              title="First name"
              placeholder="Enter your first name"
              otherStyles="mt-10"
            />
            {errors.firstname && <ErrorMessage message={errors.firstname.message ?? ''} />}

            <FormTextInput
              name="lastname"
              control={control}
              title="Last name"
              placeholder="Enter your Last name"
              otherStyles="mt-10"
            />
            {errors.lastname && <ErrorMessage message={errors.lastname.message ?? ''} />}

            <FormTextInput
              name="email"
              control={control}
              title="Email"
              placeholder="Enter your email"
              otherStyles="mt-7"
              keyboardType="email-address"
            />
            {errors.email && <ErrorMessage message={errors.email.message ?? ''} />}

            <FormTextInput
              name="password"
              control={control}
              title="Password"
              placeholder="Enter your password"
              otherStyles="mt-7"
            />
            {errors.password && <ErrorMessage message={errors.password.message ?? ''} />}
            <FormTextInput
              name="confirmPassword"
              control={control}
              title="Confirm Password"
              placeholder="Confirm your password"
              otherStyles="mt-7"
            />
           {errors.confirmPassword && <ErrorMessage message={errors.confirmPassword.message ?? ''} />}
            <CustomButton
              title="Create account"
              handlePress={handleSubmit(submit)}
              containerStyles={`w-full mt-7`}
              isLoading={isLoading}
            />
            {errors.root?.signup && <ErrorMessage message={errors.root.signup.message ?? ''} />}
            <View
              className='flex flex-row pt-5 justify-center gap-2'
            >
              <Text className='text-lg text-secondary-100 font-pregular'>Have an account already?</Text>
              <Link
                href='/sign-in'
                className='text-lg font-psemibold text-secondary underline'
              >
                Sign in
              </Link>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export default SignUp
