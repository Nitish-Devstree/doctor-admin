import { NavItem } from 'types';

export type Product = {
  photo_url: string;
  name: string;
  description: string;
  created_at: string;
  price: number;
  id: number;
  category: string;
  updated_at: string;
};

export type User = {
  _id: string;
  phoneNumber: number;
  avatar: string;
  createdAt: string;
  updatedAt: string;
  email?: string;
  name?: string;
};
export type University = {
  _id: string;
  name: string;
  image: string;
  location: {
    address: string;
    city: string;
    state: string;
    pincode: string;
    country: string;
  };
  contactDetails: {
    email: string;
    phone: string;
    website: string;
  };
  courses: Array<{
    name: string;
    duration: string;
    degree: string;
    description: string;
    fees: number;
    _id: string;
  }>;
  establishedYear: number;
  createdAt: string;
  updatedAt: string;
  averageCourseFees: number;
  totalCourses: number;
};

export type Video = {
  _id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  videoUrl: string;
  isActive: boolean;
  createdAt: string | Date;
  updatedAt: string | Date;
  __v: number;
}

export type Quiz = {
  _id: string;
  title: string;
  description: string;
  timeLimit: number;
  totalMarks: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  questionCount: number;
};

//Info: The following data is used for the sidebar navigation and Cmd K bar.
export const navItems: NavItem[] = [
  {
    title: 'Dashboard',
    url: '/dashboard/overview',
    icon: 'dashboard',
    isActive: false,
    shortcut: ['d', 'd'],
    items: [] // Empty array as there are no child items for Dashboard
  },
  {
    title: 'Users',
    url: '/dashboard/users',
    icon: 'user',
    shortcut: ['u', 'u'],
    isActive: false,
    items: [] // No child items
  },
  {
    title: 'University',
    url: '/dashboard/university',
    icon: 'building',
    shortcut: ['un', 'un'],
    isActive: false,
    items: [] // No child items
  },
  {
    title: "Video",
    url: '/dashboard/video',
    icon: 'video',
    shortcut: ['yt', 'yt'],
    isActive: false,
    items: [] // No child items
  },
  {
    title: "Quiz",
    url: "/dashboard/quiz",
    icon: 'notepad-text-dashed',
    shortcut: ['qq', 'qq'],
    isActive: false,
    items: [] // No child items
  },
  {
    title: 'Product',
    url: '/dashboard/product',
    icon: 'product',
    shortcut: ['p', 'p'],
    isActive: false,
    items: [] // No child items
  },
  {
    title: 'Account',
    url: '#', // Placeholder as there is no direct link for the parent
    icon: 'billing',
    isActive: true,

    items: [
      {
        title: 'Profile',
        url: '/dashboard/profile',
        icon: 'userPen',
        shortcut: ['m', 'm']
      },
      {
        title: 'Login',
        shortcut: ['l', 'l'],
        url: '/',
        icon: 'login'
      }
    ]
  },
  {
    title: 'Kanban',
    url: '/dashboard/kanban',
    icon: 'kanban',
    shortcut: ['k', 'k'],
    isActive: false,
    items: [] // No child items
  }
];

export interface SaleUser {
  id: number;
  name: string;
  email: string;
  amount: string;
  image: string;
  initials: string;
}

export const recentSalesData: SaleUser[] = [
  {
    id: 1,
    name: 'Olivia Martin',
    email: 'olivia.martin@email.com',
    amount: '+$1,999.00',
    image: 'https://api.slingacademy.com/public/sample-users/1.png',
    initials: 'OM'
  },
  {
    id: 2,
    name: 'Jackson Lee',
    email: 'jackson.lee@email.com',
    amount: '+$39.00',
    image: 'https://api.slingacademy.com/public/sample-users/2.png',
    initials: 'JL'
  },
  {
    id: 3,
    name: 'Isabella Nguyen',
    email: 'isabella.nguyen@email.com',
    amount: '+$299.00',
    image: 'https://api.slingacademy.com/public/sample-users/3.png',
    initials: 'IN'
  },
  {
    id: 4,
    name: 'William Kim',
    email: 'will@email.com',
    amount: '+$99.00',
    image: 'https://api.slingacademy.com/public/sample-users/4.png',
    initials: 'WK'
  },
  {
    id: 5,
    name: 'Sofia Davis',
    email: 'sofia.davis@email.com',
    amount: '+$39.00',
    image: 'https://api.slingacademy.com/public/sample-users/5.png',
    initials: 'SD'
  }
];
