import { PROPERTYLISTINGSAMPLE } from "@/constants";
import { PropertyProps } from "@/interfaces";

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section
        className="h-64 bg-cover bg-center flex flex-col items-center justify-center text-white"
        style={{ backgroundImage: "url('https://example.com/hero.jpg')" }}
      >
        <h1 className="text-3xl font-bold">Find your favorite place here!</h1>
        <p>The best prices for over 2 million properties worldwide.</p>
      </section>

      {/* Listing Section */}
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
        {PROPERTYLISTINGSAMPLE.map((property: PropertyProps, index: number) => (
          <div key={index} className="border rounded p-4 shadow hover:shadow-lg">
            <img src={property.image} alt={property.name} className="w-full h-40 object-cover rounded" />
            <h2 className="font-bold mt-2">{property.name}</h2>
            <p>${property.price}/night</p>
            <p>⭐ {property.rating}</p>
          </div>
        ))}
      </section>
    </div>
  );
}
