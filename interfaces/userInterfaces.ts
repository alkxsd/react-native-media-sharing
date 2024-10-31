export interface Address {
  barangay: string;
  zip: string;
  address_line1: string;
  address_line2: string;
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

export interface UserInterface {
  userAuthId: string | null; // Firebase Authentication ID
  applicationData: { // Renamed formData to applicationData
    firstName: string;
    lastName: string;
    middleName: string;
    suffixName: string;
    gender: 'male' | 'female' | 'other' | '';
    birthDate: Date | null;
    birthPlace: string;
    idType: string;
    idNumber: string;
    idFilePath: string;
    applicationStatus: 'pending' | 'paid' | 'approved' | 'rejected' | '';
    address: Address;
    employment: Employment;
  };
  isLoading: boolean;
  error: string | null;
}

export interface signUpUserInterface {
  firstName: string
  lastName: string
  email: string
  password: string
}