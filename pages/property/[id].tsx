// pages/property/[id].tsx
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import api from "../../lib/api";
// removed external PropertyDetail import; using local stub component defined below
import ReviewSection from "../../components/property/ReviewSection";

type Review = {
  id: string | number;
  author?: string;
  rating?: number;
  comment?: string;
  createdAt?: string;
};

type Property = {
  id: string | number;
  title: string;
  description?: string;
  price?: number;
  location?: string;
  images?: string[];
  shortDescription?: string;
  // add other fields returned by your API as needed
};

// Local fallback PropertyDetail component to satisfy import during development,
// replace with your real component in components/property/PropertyDetail.tsx when available
function PropertyDetail({ property, reviews }: { property: Property; reviews: Review[] }) {
  return (
    <section className="border rounded p-4">
      <h1 className="text-2xl font-bold">{property.title}</h1>

      {property.images && property.images.length > 0 && (
        <div className="mt-4">
          <img
            src={property.images[0]}
            alt={property.title}
            className="max-w-full h-auto rounded"
          />
        </div>
      )}

      <p className="mt-4 text-gray-700">{property.description ?? property.shortDescription}</p>
      <p className="mt-2 text-lg font-semibold">Price: {property.price ?? "N/A"}</p>
      <p className="text-sm text-gray-500">Location: {property.location ?? "Unknown"}</p>

      <div className="mt-4">
        <h3 className="font-semibold">Reviews ({reviews.length})</h3>
        <ul className="mt-2 space-y-2">
          {reviews.map((r) => (
            <li key={r.id} className="border rounded p-2">
              <div className="text-sm font-medium">{r.author ?? "Anonymous"}</div>
              <div className="text-sm text-yellow-600">Rating: {r.rating ?? "—"}</div>
              <div className="text-sm text-gray-700">{r.comment}</div>
              <div className="text-xs text-gray-400">{r.createdAt}</div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default function PropertyDetailPage() {
  const router = useRouter();
  const { id } = router.query;

  const [property, setProperty] = useState<Property | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // wait until router provides id (it may be undefined on first render)
    if (!id) return;

    let cancelled = false;
    const idStr = Array.isArray(id) ? id[0] : id;

    async function fetchData() {
      setLoading(true);
      setError(null);

      try {
        // fetch property details
        const propRes = await api.get<Property>(`/properties/${idStr}`);
        if (!cancelled) setProperty(propRes.data ?? null);

        // try reviews endpoint; prefer /properties/:id/reviews, fallback to query
        try {
          const revRes = await api.get<Review[]>(`/properties/${idStr}/reviews`);
          if (!cancelled) setReviews(Array.isArray(revRes.data) ? revRes.data : []);
        } catch (err) {
          // fallback to /reviews?propertyId=:id (json-server style)
          try {
            const revRes2 = await api.get<Review[]>(`/reviews?propertyId=${idStr}`);
            if (!cancelled) setReviews(Array.isArray(revRes2.data) ? revRes2.data : []);
          } catch (err2) {
            if (!cancelled) setReviews([]);
          }
        }
      } catch (err: any) {
        console.error("Failed to fetch property:", err);
        if (!cancelled) setError(err?.message ?? "Failed to load property");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchData();

    return () => {
      cancelled = true;
    };
  }, [id]);

  // Render states
  if (loading) {
    return <div className="p-6 text-center">Loading property…</div>;
  }

  if (error) {
    return <div className="p-6 text-center text-red-600">Error: {error}</div>;
  }

  if (!property) {
    return <div className="p-6 text-center">Property not found.</div>;
  }

  return (
    <main className="max-w-5xl mx-auto p-6">
      <PropertyDetail property={property} reviews={reviews} />
      <section className="mt-8">
        <h2 className="text-lg font-semibold mb-3">Reviews</h2>
        <ReviewSection propertyId={property.id} />
      </section>
    </main>
  );
}
