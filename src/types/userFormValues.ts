import GovernmentId from "./governmetnIDTypes";

interface UserFormValues {
  email: string;
  password: string;
  role: string;
  name: string;
  phone?: string;
  description?: string;
  governmentId?: GovernmentId;
  isActive: boolean;
}

export default UserFormValues;