import Link from "next/link";

type Property = {
  id: string | number;
  title: string;
  price?: number;
  location?: string;
  images?: string[];
  shortDescription?: string;
};

export default function PropertyCard({ property }: { property: Property }) {
  const imageUrl = property.images?.[0] ?? "/placeholder.jpg";

  return (
    <div className="rounded-lg shadow-sm overflow-hidden bg-white">
      <Link href={`/properties/${property.id}`}>
        <a>
          <div className="h-48 w-full overflow-hidden">
            <img src={imageUrl} alt={property.title} className="w-full h-full object-cover" />
          </div>
        </a>
      </Link>

      <div className="p-4">
        <h3 className="text-lg font-semibold">{property.title}</h3>
        {property.location && <p className="text-sm text-gray-500">{property.location}</p>}
        <div className="mt-2 flex items-center justify-between">
          <span className="text-md font-medium">
            {property.price ? `$${property.price}` : "Price on request"}
          </span>
          <Link href={`/properties/${property.id}`}><a className="text-sm underline">View</a></Link>
        </div>
        {property.shortDescription && <p className="mt-2 text-sm text-gray-600">{property.shortDescription}</p>}
      </div>
    </div>
  );
}
