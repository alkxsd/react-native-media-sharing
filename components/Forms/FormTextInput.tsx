import { View, Text, TextInput, TextInputProps, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import { AppColors } from '@/constants/AppColors'
import icons from '@/constants/Icons'
import { Controller } from 'react-hook-form'

interface Props extends TextInputProps {
  name: string
  control: any
  title: string
  placeholder?: string
  otherStyles: string
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
}

const FormTextInput = ({
  name,
  control,
  title,
  placeholder,
  otherStyles,
  autoCapitalize = 'none', // Default value for autoCapitalize
  ...props
}: Props) => {

  const [showPassword, setShowPassword] = useState<boolean>(false)

  const [isFocused, setIsFocused] = useState<boolean>(false)

  const isPassword = title.toLowerCase().includes('password'); // Case-insensitive check

  return (
    <View className={`gap-2 ${otherStyles}`}>
      <Text className='text-base text-secondary-100 font-pmedium'>{title}</Text>
      <Controller
        control={control}
        name={name}
        render={({ field: {onChange, onBlur, value, ref } }) => (
          <View className={` w-full h-16  bg-primary rounded-2xl border flex flex-row items-center
            ${isFocused ? 'border-white border-2' : 'border-accent'}
            ${isPassword ? 'pl-4' : 'px-4'}
          `}>
            <TextInput
              className="flex-1 text-secondary-100 font-psemibold text-base"
              value={value}
              placeholder={placeholder}
              placeholderTextColor='#fff'
              onChangeText={onChange}
              onFocus={() => {
                setIsFocused(true);
              }}
              onBlur={() => {
                setIsFocused(false);
                onBlur(); // Call the onBlur from React Hook Form
              }}
              secureTextEntry={isPassword && !showPassword}
              autoCapitalize={autoCapitalize}
              autoCorrect={false}
              {...props}
            />

            {isPassword && (
              <View className='border-l border-secondary h-full justify-center'>
                <TouchableOpacity
                  onPress={() => setShowPassword(!showPassword)}
                  className=' justify-center w-auto px-4'
                >
                  <Image
                    source={!showPassword ? icons.eye : icons.eyeHide}
                    className="w-6 h-6"
                    resizeMode="contain"
                    style={{ tintColor: '#8A633E' }}
                  />
                </TouchableOpacity>
              </View>
            )}
          </View>
        )}
      />
    </View>
  )
}

export default FormTextInput