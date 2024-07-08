import React, { useEffect, useState } from 'react';
import axiosInstance from '../../../api/axios';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { BookingsHistory } from '../../../types/restaurantTypes';
import { format } from 'timeago.js';
import { MdDateRange } from 'react-icons/md';
import { Link } from 'react-router-dom';
import AddReviewModal from './AddReviewModal';

const BookingHistory: React.FC = () => {
  const { id } = useSelector((state: RootState) => state.user);
  const [bookings, setBookings] = useState<BookingsHistory[]>([]);
  const [selectedBookingId, setSelectedBookingId] = useState<string | null>(null);
  const [modalData, setModalData] = useState<{ bookingId: string, restaurantId: string }>({ bookingId: '', restaurantId: '' });

  useEffect(() => {
    const fetchBookingHistory = async () => {
      try {
        const res = await axiosInstance.get(`/api/booking-history/${id}`);
        setBookings(res.data.Bookings);
      } catch (error) {
        console.error('Error fetching booking history:', error);
      }
    };
    fetchBookingHistory();
  }, [id]);

  const handleOpenModal = (bookingId: string) => {
    setSelectedBookingId(bookingId);
    const restaurantId = bookings.find(booking => booking._id === bookingId)?.restaurantId._id || '';
    setModalData({ bookingId, restaurantId });
  };

  const getBookingStatusColor = (status: string): string => {
    switch (status) {
      case 'CONFIRMED':
        return 'text-green-500';
      case 'CANCELLED':
        return 'text-red-500';
      case 'PENDING':
        return 'text-yellow-500';
      case 'CHECKED':
        return 'text-blue-500';
      default:
        return 'text-gray-500';
    }
  };

  const formatDate = (dateString: string): string => {
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    };
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', options);
  };

  return (
    <div className="p-8 flex flex-col gap-4">
      {bookings.length === 0 ? (
        <p className="text-gray-500 font-bold">No bookings found.</p>
      ) : (
        <>
          {bookings.map((booking) => (
            <div key={booking._id} className="relative flex items-start gap-4 bg-white p-4 rounded-lg shadow-md">
              <Link to={`/restaurant-view/${booking.restaurantId._id}`}>
                <img
                  src={booking.restaurantId.featuredImage}
                  alt={booking.restaurantId.restaurantName}
                  className="h-32 w-44 rounded-xl object-cover"
                />
              </Link>
              <div className="flex-1 p-2">
                <p className="text-xl font-bold">{booking.restaurantId.restaurantName}</p>
                <p className={`text-base font-bold ${getBookingStatusColor(booking.bookingStatus)}`}>{booking.bookingStatus.toLowerCase()}</p>
                <p className="text-gray-600 flex items-center pt-4"><MdDateRange size={23}/> {formatDate(booking.bookingDate)}</p>
              </div>
              <div className="absolute bottom-4 right-4">
                <button onClick={() => handleOpenModal(booking._id)} className="text-blue-500 text-sm font-bold hover:underline">
                  <a href="#my_review">Add Review</a>
                </button>
              </div>
              <div className='text-sm font-semibold text-right'>
                <p className="text-gray-500">{format(booking.createdAt)}</p>
              </div>
            </div>
          ))}
          {selectedBookingId && (
            <AddReviewModal
              onClose={() => setSelectedBookingId(null)}
              userId={id}
              restaurantId={modalData.restaurantId}
            />
          )}
        </>
      )}
    </div>
  );
};

export default BookingHistory;
