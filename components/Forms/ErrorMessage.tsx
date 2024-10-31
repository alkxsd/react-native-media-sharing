import { View, Text } from 'react-native'
import React from 'react'

type Props = {
  message: string
}

const ErrorMessage = ({message}: Props) => {
  return (
    <View className='w-full mt-2'>
      <Text className='text-red-600'>{message}</Text>
    </View>
  )
}

export default ErrorMessage