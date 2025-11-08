import { useEffect, useState } from "react";
import api from "@/lib/api";
import PropertyCard from "../components/property/PropertyCard";

type Property = {
  id: string | number;
  title: string;
  price?: number;
  location?: string;
  images?: string[];
  shortDescription?: string;
};

export default function Home() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function fetchProperties() {
      try {
        setLoading(true);
        setError(null);
        const resp = await api.get<Property[]>("/properties");
        if (!cancelled) setProperties(resp.data || []);
      } catch (err: any) {
        console.error("Error fetching properties:", err);
        if (!cancelled) setError(err?.message || "Failed to load properties");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchProperties();
    return () => { cancelled = true; };
  }, []);

  if (loading) return <div className="p-8 text-center">Loading properties…</div>;
  if (error) return <div className="p-8 text-center text-red-600">Error: {error}</div>;
  if (properties.length === 0) return <div className="p-8 text-center">No properties found.</div>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {properties.map((property) => (
        <PropertyCard key={property.id} property={property} />
      ))}
    </div>
  );
}
