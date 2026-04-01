import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { a } from "../services/axiosinstance";
import i1 from "../assets/images/wstore.png";
import i2 from "../assets/images/rlove.png";
import i3 from "../assets/images/fulllove.svg"
import { useCart } from "../context/CartContext";

function Item() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);

  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem("favorites");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    async function fetchProduct() {
      try {
        const res = await a.get(`/products/${id}`);
        setProduct(res.data);
        if (res.data.colors && res.data.colors.length > 0) {
          setSelectedColor(res.data.colors[0]);
        }
        if (res.data.sizes && res.data.sizes.length > 0) {
          setSelectedSize(res.data.sizes[0]);
        }
      } catch (error) {
        console.error(error);
      }
    }
    if (id) fetchProduct();
  }, [id]);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  if (!product) {
    return <div>Loading...</div>;
  }

  const isFavorite = favorites.some((item) => item.id === product.id);

  const toggleFavorite = () => {
    if (isFavorite) {
      setFavorites((prev) => prev.filter((item) => item.id !== product.id));
    } else {
      setFavorites((prev) => [...prev, product]);
    }
  };


  const mapRussianColorToCss = (color) => {
    const map = {
      "чёрный": "#000000",
      "черный": "#000000",
      "белый": "#ffffff",
      "бежевый": "#f5f5dc",
      "красный": "#e11d48",
      "синий": "#0000ff",
      "зелёный": "#008000",
      "зеленный": "#008000",
      "жёлтый": "#ffff00",
      "оранжевый": "#ffa500",
      "фиолетовый": "#800080",
      "розовый": "#ffc0cb",
      "серый": "#808080",
      "коричневый": "#a52a2a",
    };
    return map[color.toLowerCase()] || "#ccc";
  };

  const handleColorClick = (color) => {
    setSelectedColor(color);
  };

  const handleSizeClick = (size) => {
    setSelectedSize(size);
  };

  const increaseQty = () => setQuantity((q) => q + 1);
  const decreaseQty = () => setQuantity((q) => (q > 1 ? q - 1 : 1));
  const { addToCart } = useCart();
  function handleAddToCart() {
    addToCart(product);
  }

  return (
    <main className="product-page">
      <div className="product-container">
        <div className="product-left">
          <div className="product-img-wrapper">
            <img src={product.imageUrl} alt={product.title} className="product-img" />
          </div>
        </div>

        <div className="product-right">
          <h1 className="product-title">{product.title}</h1>
          <p className="product-price">{product.price}₸</p>
          <p className="product-description">{product.description}</p>

          <div className="option-group">
            <p className="option-label">Color</p>
            <div className="color-options">
              {product.colors.map((color) => {
                const bgColor = mapRussianColorToCss(color);
                return (
                  <span
                    key={color}
                    className={`color-circle ${selectedColor === color ? "selected" : ""}`}
                    style={{ backgroundColor: bgColor }}
                    onClick={() => handleColorClick(color)}
                    title={color}
                  />
                );
              })}
            </div>
          </div>

          <div className="option-group">
            <p className="option-label">Size</p>
            <div className="size-options">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  className={`size-btn ${selectedSize === size ? "selected" : ""}`}
                  onClick={() => handleSizeClick(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div className="cart-controls">
            <div className="quantity-selector">
              <button className="qty-btn" onClick={decreaseQty}>−</button>
              <span className="qty-value">{quantity}</span>
              <button className="qty-btn" onClick={increaseQty}>+</button>
            </div>

            <button className="add-to-cart" onClick={handleAddToCart}>
              <img src={i1} alt="Cart" className="cart-icon" />
              Add to Cart
            </button>

            <button className="wishlist-btn" onClick={toggleFavorite} style={{ background: "none", border: "none", cursor: "pointer" }}>
              <img src={isFavorite ? i3 : i2} alt="Like" className="heart-icon" />
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Item;