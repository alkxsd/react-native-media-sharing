import { create } from "zustand"

interface FormStore {
  currentStep: number
  setNextStep: () => void;
  setPrevStep: () => void;
  resetStep: () => void;
}

const useFormStore = create<FormStore>((set) => ({
  currentStep: 1,
  setNextStep: () => set((state) => ({ currentStep: state.currentStep + 1 })),
  setPrevStep: () => set((state) => ({ currentStep: state.currentStep - 1 })),
  resetStep: () => set({ currentStep: 1 }),
}));

export default useFormStore;