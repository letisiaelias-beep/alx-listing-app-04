export default function Page(props: {
  loading: boolean;
  property?: any;
  PropertyDetail?: any;
  ReviewSection?: any;
}) {
  const { loading, property, PropertyDetail, ReviewSection } = props;

  return (
    <>
      {loading ? (
        <p>Loading...</p>
      ) : !property ? (
        <p>Property not found</p>
      ) : (
        <>
          <PropertyDetail property={property} />
          <div className="mt-6">
            <h2 className="text-lg font-semibold">Reviews</h2>
            <ReviewSection propertyId={property.id} />
          </div>
        </>
      )}
    </>
  );
}
