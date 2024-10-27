import { View, Text, TextInput, TextInputProps, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import { AppColors } from '@/constants/AppColors'
import icons from '@/constants/Icons'

interface Props extends TextInputProps {
  title: string
  value: string
  placeholder?: string
  handleChangeText?: (text: string) => void
  otherStyles: string
}

const FormField = ({title, value, placeholder, handleChangeText, otherStyles, ...props}: Props) => {

  const [showPassword, setShowPassword] = useState<boolean>(false)

  const [isFocused, setIsFocused] = useState<boolean>(false)

  const isPassword = title.toLowerCase().includes('password'); // Case-insensitive check

  return (
    <View className={`gap-2 ${otherStyles}`}>
      <Text className='text-base text-gray-100 font-pmedium'>{title}</Text>
      <View className={`
        w-full
        h-16
        bg-black-100
        rounded-2xl
        border
        flex
        flex-row
        items-center
        ${isFocused ? 'border-secondary' : 'border-black-300'}
        ${isPassword ? 'pl-4' : 'px-4'}
      `}>
        <TextInput
          className="flex-1 text-white font-psemibold text-base"
          value={value}
          placeholder={placeholder}
          placeholderTextColor={AppColors.placeholderColor}
          onChangeText={handleChangeText}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          secureTextEntry={isPassword && !showPassword}
          {...props}
        />

        {isPassword && (
          <TouchableOpacity
            onPress={() => setShowPassword(!showPassword)}
            className='border-l border-black-300 h-full justify-center w-auto px-4'
          >
            <Image
              source={!showPassword ? icons.eye : icons.eyeHide}
              className="w-6 h-6"
              resizeMode="contain"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  )
}

export default FormField