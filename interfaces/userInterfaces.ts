// interfaces/userInterfaces.ts

export interface Address {
  barangay: string;
  zip: string;
  address_line1: string;
  address_line2?: string;
  city: string;
  state: string;
  country: string;
}

export interface Employment {
  companyName: string;
  contact: string;
  designation: string;
  position: string;
  location: string;
}

// Define a separate interface for ApplicationData
export interface ApplicationData {
  firstName: string;
  lastName: string;
  middleName: string;
  suffixName: string;
  gender: 'male' | 'female' | 'other' | '';
  genderOther?: string
  birthDate: Date | null;
  birthPlace: string;
  idType: string;
  idNumber: string;
  idFilePath: string;
  applicationStatus: 'initial' | 'submitted' | 'pending' | 'paid' | 'approved' | 'rejected' | '';
  address: Address;
  employment: Employment;
}

export interface UserInterface {
  userAuthId: string | null;
  applicationData: ApplicationData;
  isUserLoading: boolean;
  error: string | null;
}

export interface SignUpUserInterface {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

const initialEmployment: Employment = {
  companyName: '',
  contact: '',
  designation: '',
  position: '',
  location: '',
}

const initialAddress: Address = {
  barangay: '',
  zip: '',
  address_line1: '',
  address_line2: '',
  city: '',
  state: '',
  country: '',
}

// Define initial values for ApplicationData
export const InitialApplicationData: ApplicationData = {
  firstName: '',
  lastName: '',
  middleName: '',
  suffixName: '',
  gender: '',
  genderOther: '',
  birthDate: null,
  birthPlace: '',
  idType: '',
  idNumber: '',
  idFilePath: '',
  applicationStatus: 'initial',
  address: {
    ...initialAddress
  },
  employment: {
    ...initialEmployment
  },
};