import { View, Text } from 'react-native'
import React from 'react'

type Props = {
  message: string
}

const ErrorMessage = ({message}: Props) => {
  return (
    <View className='w-full items-center my-2'>
      <Text style={{ color: 'red' }}>{message}</Text>
    </View>
  )
}

export default ErrorMessage