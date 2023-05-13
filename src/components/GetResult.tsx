import Card from "./Card";
const getResult = ({ getGenericCatalytics }: any) => {
  return (
    <>
      {getGenericCatalytics.loading ? (
        <section className="lds-facebook">
          <section></section>
          <section></section>
          <section></section>
        </section>
      ) : null}
      {getGenericCatalytics.data
        ? getGenericCatalytics.data.getGenericCatalytics.map(
            (catalytics: any) => (
              <Card
                img={catalytics.images[0]}
                key={catalytics._id}
                reference={catalytics.ref}
                brand={catalytics.brand}
                type={catalytics.type}
                price={catalytics.price}
              />
            )
          )
        : null}
    </>
  );
};

export default getResult;
