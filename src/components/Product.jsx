import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

function Product({ product }) {
  const { addToCart } = useCart();

  function handleAddToCart() {
    addToCart(product);
  }

  return (
    <div className="product-card1">
      <img src={product.imageUrl} alt={product.title} />
      <h3>{product.title}</h3>
      <p>{product.description}</p>
      <div className="price-row1">
        <span>{product.price}</span>
        <button>Open</button>
      </div>
    </div>
  );
}

export default Product;
