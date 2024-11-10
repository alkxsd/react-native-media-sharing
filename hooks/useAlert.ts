// hooks/useAlert.tsx
import { useState } from 'react';
import Toast from 'react-native-toast-message';

export type AlertType = 'success' | 'warning' | 'error' | 'info';

const useAlert = () => {
  const [alert, setAlert] = useState<{ message: string; type: AlertType } | null>(null);

  const showAlert = (message: string, type: AlertType = 'error', extraMessage?: string) => {
    Toast.show({
      type: type,
      text1: message,
      text2: extraMessage, // Add extraMessage to text2
    });
  };

  const hideAlert = () => {
    setAlert(null);
    Toast.hide(); // Hide the toast message
  };

  return { alert, showAlert, hideAlert };
};

export default useAlert;