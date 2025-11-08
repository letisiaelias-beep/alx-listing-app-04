// components/property/PropertyDetail.tsx
import { useState } from "react";
import api from "../../lib/api";

type Review = {
  id: string | number;
  author?: string;
  rating?: number;
  comment?: string;
};

type Property = {
  id: string | number;
  title: string;
  description?: string;
  price?: number;
  location?: string;
  images?: string[];
  shortDescription?: string;
};

export default function PropertyDetail({
  property,
  reviews = [],
}: {
  property: Property;
  reviews?: Review[];
}) {
  const [bookingLoading, setBookingLoading] = useState(false);
  const [bookingError, setBookingError] = useState<string | null>(null);
  const [bookingSuccess, setBookingSuccess] = useState<string | null>(null);

  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [guests, setGuests] = useState<number>(1);

  async function handleBooking(e: React.FormEvent) {
    e.preventDefault();
    setBookingError(null);
    setBookingSuccess(null);

    if (!startDate || !endDate) {
      setBookingError("Please select start and end dates.");
      return;
    }

    try {
      setBookingLoading(true);
      const payload = {
        propertyId: property.id,
        startDate,
        endDate,
        guests,
      };
      const res = await api.post("/bookings", payload);
      if (res.status === 201 || res.status === 200) {
        setBookingSuccess("Booking successful!");
      } else {
        setBookingError("Booking failed. Please try again.");
      }
    } catch (err: any) {
      console.error("Booking error:", err);
      setBookingError(err?.message ?? "Booking request failed.");
    } finally {
      setBookingLoading(false);
    }
  }

  const imageUrl = property.images && property.images.length > 0 ? property.images[0] : "/placeholder.jpg";

  return (
    <article>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <div className="h-72 w-full overflow-hidden rounded-lg bg-gray-100">
            <img src={imageUrl} alt={property.title} className="w-full h-full object-cover" />
          </div>

          <h1 className="text-2xl font-bold mt-4">{property.title}</h1>
          {property.location && <p className="text-sm text-gray-500">{property.location}</p>}
          {property.price !== undefined && (
            <p className="mt-2 text-lg font-medium">${property.price}</p>
          )}

          <div className="mt-4">
            <h2 className="text-lg font-semibold">Description</h2>
            <p className="mt-2 text-gray-700">{property.description ?? property.shortDescription ?? "No description available."}</p>
          </div>

          <div className="mt-6">
            <h2 className="text-lg font-semibold">Reviews</h2>
            {reviews.length === 0 ? (
              <p className="text-sm text-gray-500">No reviews yet.</p>
            ) : (
              <ul className="mt-2 space-y-3">
                {reviews.map((r) => (
                  <li key={r.id} className="border rounded p-3">
                    <div className="flex justify-between">
                      <strong>{r.author ?? "Anonymous"}</strong>
                      <span>{r.rating ?? "-"}/5</span>
                    </div>
                    {r.comment && <p className="mt-1 text-sm text-gray-700">{r.comment}</p>}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <aside className="p-4 border rounded-lg bg-white">
          <h3 className="text-lg font-semibold mb-2">Book this property</h3>
          <form onSubmit={handleBooking} className="space-y-3">
            <div>
              <label className="block text-sm">Start date</label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="mt-1 block w-full border rounded px-2 py-1"
                required
              />
            </div>

            <div>
              <label className="block text-sm">End date</label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="mt-1 block w-full border rounded px-2 py-1"
                required
              />
            </div>

            <div>
              <label className="block text-sm">Guests</label>
              <input
                type="number"
                min={1}
                value={guests}
                onChange={(e) => setGuests(Number(e.target.value))}
                className="mt-1 block w-full border rounded px-2 py-1"
              />
            </div>

            <button
              type="submit"
              disabled={bookingLoading}
              className="w-full mt-2 px-4 py-2 rounded bg-blue-600 text-white"
            >
              {bookingLoading ? "Booking…" : "Book now"}
            </button>

            {bookingError && <p className="text-sm text-red-600 mt-2">{bookingError}</p>}
            {bookingSuccess && <p className="text-sm text-green-600 mt-2">{bookingSuccess}</p>}
          </form>
        </aside>
      </div>
    </article>
  );
}
