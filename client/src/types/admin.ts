export interface loginCredentials {
  email: string;
  password: string;
}

export interface CouponDetailsType {
  couponCode: string;
  description: string;
  minPurchase: number;
  discount: number;
  discountPrice: number;
  startDate: Date | string;
  expiryDate: Date | string;
  isActive?: boolean;
  _id?: string;
}

export interface MembershipPlanType {
  planName: string;
  description?: string;
  type: string;
  cost: number;
  benefits: string[];
  users?: number;
  _id ?: string;
}
