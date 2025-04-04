export interface University {
  _id?: string;
  name?: string;
  description?: string;
  image?: string;
  establishedYear?: number;
  location?: {
    address?: string;
    city?: string;
    state?: string;
    country?: {
      name?: string;
    };
    pincode?: string;
  };
  contactDetails?: {
    email?: string;
    phone?: string;
    website?: string;
  };
  courses?: Array<{
    name: string;
    duration: string;
    degree: string;
    description: string;
    fees: number;
    _id?: string;
  }>;
  facilities?: string[];
  languages?: string[];
  ranking?: string;
  numberOfStudents?: string;
}
