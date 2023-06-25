import { Button } from "./ui/button"

type ProductProps = {
    image: string;
    name : string;
    price: number;
    rating: number;
    quantitySold: number;
  };

export default function Product({
    image,
    name,
    price,
    rating,
    quantitySold,
}: ProductProps) {
    return (
        <div>
            <img src={image} />
            <h6>{name}</h6>
            <p>{price}</p>
            <p>{rating} / 5</p>
            <p>{quantitySold} sold</p>
            <Button>ADD TO CART</Button>
        </div>
    )
}