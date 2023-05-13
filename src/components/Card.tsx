/* eslint-disable @next/next/no-img-element */
const Card = ({
  reference,
  price,
  img,
  brand,
  type,
}: {
  reference: string;
  price: number;
  img: string;
  brand: string;
  type: string;
}) => {
  return (
    <section className="card">
      <img src={img ? img : "./holderImg.jpg"} alt={reference} />
      <section className="CalDetails">
        <h2>{reference}</h2>
        <section className="owner">
          <p> Brand: {brand ? brand : "N/A"}</p>
          <p>Type: {type ? type : "N/A"}</p>
        </section>
        <h2 className="Price">${price.toFixed(2)}</h2>
      </section>
    </section>
  );
};

export default Card;
