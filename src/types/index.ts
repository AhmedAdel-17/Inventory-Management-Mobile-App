// src/types/index.ts

export interface Company {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  logo?: string;
  status: 'approved' | 'inactive' | 'pending';
  subscriptionTier: 'platinum' | 'gold' | 'silver' | 'bronze';
  subscriptionExpiry: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface Warehouse {
  id: string;
  companyId: string;
  name: string;
  address: string;
  capacity: number;
  currentUtilization: number;
  manager: string;
  contactNumber: string;
  status: 'active' | 'inactive' | 'maintenance';
  createdAt: Date;
  updatedAt: Date;
}

export interface SubscriptionAnalytics {
  totalCompanies: number;
  activeSubscriptions: number;
  revenue: {
    monthly: number;
    yearly: number;
  };
  tierDistribution: {
    platinum: number;
    gold: number;
    silver: number;
    bronze: number;
  };
  growthRate: number;
  churnRate: number;
}

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: 'super_admin' | 'admin' | 'viewer';
  avatar?: string;
}