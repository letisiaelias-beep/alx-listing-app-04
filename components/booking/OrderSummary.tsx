// components/booking/OrderSummary.tsx
import React from "react";

type Props = { bookingDetails: any };

const OrderSummary: React.FC<Props> = ({ bookingDetails }) => {
  const subtotal = bookingDetails.price;
  const bookingFee = bookingDetails.bookingFee;
  const grandTotal = subtotal + bookingFee;

  return (
    <div className="bg-white p-6 shadow-md rounded-lg">
      <h2 className="text-xl font-semibold">Review Order Details</h2>

      <div className="flex items-start mt-4">
        <img
          src={bookingDetails.image || "https://via.placeholder.com/150"}
          alt="Property"
          className="w-28 h-28 object-cover rounded-md"
        />
        <div className="ml-4 flex-1">
          <h3 className="text-lg font-semibold">{bookingDetails.propertyName}</h3>
          <p className="text-sm text-gray-500">
            {bookingDetails.reviewScore} ({bookingDetails.reviewsCount} reviews)
          </p>
          <p className="text-sm text-gray-500">
            {bookingDetails.startDate} • {bookingDetails.totalNights} Nights
          </p>
        </div>
      </div>

      <div className="mt-6">
        <div className="flex justify-between">
          <p>Booking Fee</p>
          <p>${bookingFee.toFixed(2)}</p>
        </div>
        <div className="flex justify-between mt-2">
          <p>Subtotal</p>
          <p>${subtotal.toFixed(2)}</p>
        </div>
        <div className="flex justify-between mt-2 font-semibold">
          <p>Grand Total</p>
          <p>${grandTotal.toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
