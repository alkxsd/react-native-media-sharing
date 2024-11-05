import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Platform } from 'react-native';
import { Controller } from 'react-hook-form';
import DateTimePicker from '@react-native-community/datetimepicker';
import { AppColors } from '@/constants/AppColors';

interface Props {
  name: string;
  control: any;
  title: string;
  otherStyles?: string;
}

const CustomDatePicker: React.FC<Props> = ({ name, control, title, otherStyles = '' }) => {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

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
              onPress={() => setShowDatePicker(true)}
            >
              <Text className="text-secondary-100 font-psemibold text-base capitalize">
                {value ? new Date(value).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : 'Select a date'}
              </Text>
            </TouchableOpacity>
            {showDatePicker && (
              <View
                className='border border-secondary rounded-2xl mt-2 items-center px-4 py-2'
              >
                <DateTimePicker
                  testID="dateTimePicker"
                  value={value ? new Date(value) : new Date()}
                  mode="date"
                  display={Platform.OS === 'ios' ? 'spinner' : 'default'} // Use spinner display for iOS
                  is24Hour={true}
                  textColor={AppColors.secondary.DEFAULT}
                  onChange={(event, newDate) => {
                    if (Platform.OS === 'android') {
                      setShowDatePicker(false);
                      onChange(newDate);
                    } else {
                      setSelectedDate(newDate || null);
                    }
                  }}
                />
                {Platform.OS === 'ios' && selectedDate && (
                  <TouchableOpacity
                    className='bg-secondary-200 rounded-xl w-full py-2 items-center'
                    onPress={() => {
                      setShowDatePicker(false);
                      onChange(selectedDate);
                    }}
                  >
                    <Text
                      className={`text-primary font-psemibold text-lg`}
                    >
                      Confirm
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
            )}
          </View>
        )}
      />
    </View>
  );
};

export default CustomDatePicker;