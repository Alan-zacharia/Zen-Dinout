export interface RestaurantType {
  email: string;
  contact: string;
  restaurantName: string;
  address: string;
  location: {
    type: string;
    coordinates: [number, number];
  };
  description: string;
  closingTime: string;
  openingTime: string;
  TableRate: string;
  secondaryImages: string;
  featuredImage: string;
  _id?: string;
  place_name?: string;
};



export interface tableSlotTypes {
  tableNumber: string;
  tableCapacity: number;
  tableLocation: string;
  _id?: string;
  tableId: string;
}

export interface tableTimeSlots {
  _id: string;
  tableId: string;
  slotStartTime: string;
  slotEndTime: string;
  slotDate: string;
  IsAvailable: boolean;
}

export interface BookingDetailsType {
  bookingId: string;
  email: string;
  tableNo: string;
  tableSize: number;
  bookingDate: string;
  bookingTime: string;
  bookingStatus: string;
  totalAmount: number;
  paymentMethod: string;
}
export interface BookingsHistory {
  _id : string;
  userId: {
    username : string;
    email : string;
  };
  tableSlotId: string;
  restaurantId: {
    _id : string;
    restaurantName : string;
    featuredImage : string;
  };
  bookingTime: number;
  bookingDate: string;
  bookingStatus: string;
  totalAmount: number;
  paymentMethod: string;
  createdAt : string;
}
