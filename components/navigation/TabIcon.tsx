import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'

type Props = {
  icon: string
  color: string
  name: string
  focused: boolean
}

const TabIcon = ({ icon, color, name, focused }: Props) => {
  return (
    <View className='items-center justify-center gap-2'>
      <Image
        source={icon}
        resizeMode="contain"
        tintColor={color}
        className='w-6 h-6'
      />
      <Text
        className={`${focused ? 'font-psemibold' : 'font-pregular'} test-xs`}
        style={{ color: color }}
      >
        {name}
      </Text>
    </View>
  )
}

export default TabIcon

const styles = StyleSheet.create({})