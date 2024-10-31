import { View, SafeAreaView, KeyboardAvoidingView, Platform, ScrollView } from 'react-native'
import React from 'react'

type Props = {
  children: React.ReactNode
}

const TabScreenWrapper = (props: Props) => {
  return (
    <SafeAreaView className="bg-primary h-full">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView>
          <View className="p-4"> {/* Add padding for content */}
            {props.children}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

export default TabScreenWrapper