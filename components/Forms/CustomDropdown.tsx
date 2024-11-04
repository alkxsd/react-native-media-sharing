import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal } from 'react-native';
import { Controller } from 'react-hook-form';

interface Props {
  name: string;
  control: any;
  title: string
  options: string[]
  otherStyles?: string
  onSelect?: (option: string) => void
  defaultValue?: string // Add a defaultValue prop
}

const CustomDropdown: React.FC<Props> = ({
  name,
  control,
  title,
  options,
  otherStyles = '',
  onSelect,
  defaultValue
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(defaultValue || '');

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
    setIsDropdownOpen(false);

    if (onSelect) {
      onSelect(option);
    }
  };

  return (
    <View className={`gap-2 ${otherStyles}`}>
      <Text className="text-base text-secondary-100 font-pmedium">{title}</Text>
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, value } }) => (
          <View>
            <TouchableOpacity
              className="w-full h-16 bg-primary rounded-2xl border border-accent flex flex-row items-center justify-between px-4"
              onPress={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <Text className="text-secondary-100 font-psemibold text-base capitalize">
                {selectedOption || 'Select an option'}
              </Text>
            </TouchableOpacity>

            {isDropdownOpen && (
              <Modal visible={isDropdownOpen} transparent animationType="fade" onRequestClose={() => setIsDropdownOpen(false)}>
                <View className="flex-1 bg-black/50">
                  <TouchableOpacity className="flex-1" onPress={() => setIsDropdownOpen(false)}>
                    <View className="absolute z-10 top-1/2 bg-primary rounded-2xl border border-accent w-full">
                      {options.map((option) => (
                        <TouchableOpacity
                          key={option}
                          className="px-4 py-2 active:bg-secondary-200"
                          onPress={() => {
                            handleOptionSelect(option);
                            onChange(option);
                          }}
                        >
                          <Text className="text-secondary-100 font-psemibold text-base capitalize">{option}</Text>
                        </TouchableOpacity>
                      ))}
                    </View>
                  </TouchableOpacity>
                </View>
              </Modal>
            )}
          </View>
        )}
      />
    </View>
  );
};

export default CustomDropdown;