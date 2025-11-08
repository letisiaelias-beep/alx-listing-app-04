// components/property/ReviewSection.tsx
import { useEffect, useState } from "react";
import api from "../../lib/api";

type Review = {
  id: string | number;
  author?: string;
  rating?: number;
  comment?: string;
  createdAt?: string;
};

export default function ReviewSection({ propertyId }: { propertyId: string | number }) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!propertyId) return;

    let cancelled = false;

    async function fetchReviews() {
      try {
        setLoading(true);
        setError(null);

        // Primary attempt: /properties/:id/reviews
        try {
          const res = await api.get<Review[]>(`/properties/${propertyId}/reviews`);
          if (!cancelled) {
            setReviews(Array.isArray(res.data) ? res.data : []);
            return;
          }
        } catch (err) {
          // swallow and try fallback below
        }

        // Fallback: /reviews?propertyId=:id (common for json-server)
        try {
          const res2 = await api.get<Review[]>(`/reviews?propertyId=${propertyId}`);
          if (!cancelled) {
            setReviews(Array.isArray(res2.data) ? res2.data : []);
            return;
          }
        } catch (err2) {
          if (!cancelled) setError("Failed to load reviews");
        }
      } catch (err: any) {
        if (!cancelled) setError(err?.message ?? "Failed to load reviews");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchReviews();
    return () => {
      cancelled = true;
    };
  }, [propertyId]);

  if (loading) return <div className="p-2 text-sm text-gray-600">Loading reviews…</div>;
  if (error) return <div className="p-2 text-sm text-red-600">Error loading reviews: {error}</div>;
  if (reviews.length === 0) return <div className="p-2 text-sm text-gray-500">No reviews yet.</div>;

  return (
    <div className="space-y-3">
      {reviews.map((r) => (
        <div key={r.id} className="border rounded p-3 bg-white">
          <div className="flex justify-between items-center">
            <strong>{r.author ?? "Anonymous"}</strong>
            <span className="text-sm text-gray-600">{r.rating ?? "-"}/5</span>
          </div>
          {r.comment && <p className="mt-2 text-sm text-gray-700">{r.comment}</p>}
          {r.createdAt && <div className="mt-1 text-xs text-gray-400">{new Date(r.createdAt).toLocaleString()}</div>}
        </div>
      ))}
    </div>
  );
}
