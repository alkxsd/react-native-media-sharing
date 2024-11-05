import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

interface OverlayNotificationProps {
  message: string;
}

const OverlayNotification: React.FC<OverlayNotificationProps> = ({ message }) => {
  const [isVisible, setIsVisible] = useState(true);

  const handleClose = () => {
    setIsVisible(false);
  };

  if (!isVisible) {
    return null;
  }

  return (
    <View className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
      <View className="bg-white p-4 rounded-lg">
        <Text className="text-red-500">{message}</Text>
        <TouchableOpacity onPress={handleClose} className="mt-2">
          <Text className="text-blue-500">Close</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default OverlayNotification;