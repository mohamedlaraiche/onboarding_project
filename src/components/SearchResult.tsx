import Card from "./Card";
const searchResult = ({ searchCataytics }: any) => {
  return (
    <>
      {searchCataytics.loading ? (
        <section className="lds-dual-ring"></section>
      ) : null}
      {searchCataytics.data
        ? searchCataytics.data.searchWithPagination.items.map(
            (searchrslt: any) => (
              <Card
                img={searchrslt.images[0]}
                key={searchrslt._id}
                brand={searchrslt.brand}
                type={searchrslt.type}
                reference={searchrslt.ref}
                price={searchrslt.price}
              />
            )
          )
        : null}
    </>
  );
};

export default searchResult;
