// pages/booking/index.tsx
import BookingForm from "@/components/booking/BookingForm";
import OrderSummary from "@/components/booking/OrderSummary";
import CancellationPolicy from "@/components/booking/CancellationPolicy";

export default function BookingPage() {
  const bookingDetails = {
    propertyName: "Villa Arrecife Beach House",
    price: 7500,
    bookingFee: 65,
    totalNights: 3,
    startDate: "24 August 2024",
    image: "./public/assets/Layout.png", // optional local image or external URL
    reviewScore: 4.76,
    reviewsCount: 345
  };

  return (
    <div className="container mx-auto p-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <BookingForm />
          <CancellationPolicy />
        </div>

        <div>
          <OrderSummary bookingDetails={bookingDetails} />
        </div>
      </div>
    </div>
  );
}
