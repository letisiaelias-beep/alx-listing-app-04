// pages/properties/[id].tsx
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import api from "../../lib/api";
import PropertyDetail from "../../components/property/PropertyDetail";

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
  // add other API fields as needed
};

export default function PropertyDetailPage() {
  const router = useRouter();
  const { id } = router.query;
  const [property, setProperty] = useState<Property | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return; // wait for the router to provide the id

    let cancelled = false;

    async function fetchData() {
      setLoading(true);
      setError(null);
      try {
        // fetch property details
        const propRes = await api.get(`/properties/${id}`);
        // try fetching reviews; some APIs may use /properties/:id/reviews or /reviews?propertyId=:id
        let reviewsData: any[] = [];
        try {
          const revRes = await api.get(`/properties/${id}/reviews`);
          reviewsData = revRes.data;
        } catch (e) {
          // fallback to reviews query if the endpoint is different
          try {
            const revRes2 = await api.get(`/reviews?propertyId=${id}`);
            reviewsData = revRes2.data;
          } catch (e2) {
            reviewsData = [];
          }
        }

        if (!cancelled) {
          setProperty(propRes.data ?? null);
          setReviews(Array.isArray(reviewsData) ? reviewsData : []);
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

  if (loading) return <div className="p-6 text-center">Loading property…</div>;
  if (error) return <div className="p-6 text-center text-red-600">Error: {error}</div>;
  if (!property) return <div className="p-6 text-center">Property not found.</div>;

  return (
    <div className="max-w-5xl mx-auto p-6">
      <PropertyDetail property={property} reviews={reviews} />
    </div>
  );
}
