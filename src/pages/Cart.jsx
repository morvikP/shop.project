import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { CHECKOUT } from "../utils/const";
import i1 from "../assets/images/store.png"
import i2 from "../assets/images/car.png"

function Cart() {
  const navigate = useNavigate();

  const {
    cartItems,
    totalPrice,
    removeProduct,
    incrementQuantity,
    decrementQuantity,
  } = useCart();

  function handleCheckout() {
    if (cartItems.length === 0) {
      alert("Корзина пуста");
      return;
    }
    navigate(CHECKOUT);
  }

  return (
    <>
      {cartItems.length === 0 ? (
        <section className="block">
          <div className="container">
            <h2 className="cart-title">
              <span className="cart-icon">
                <img src={i1} alt="" />
              </span>{" "}
              Your Cart
              <p className="alert">ПУСТО</p>
            </h2>
          </div>
        </section>
      ) : (
        <main>
          <div className="cart-container">
            <h2 className="cart-title">
              <span className="cart-icon">
                <img src={i1} alt="" />
              </span>{" "}
              Your Cart
            </h2>

            {cartItems.map((item) => (
              <div key={item.id} className="cart-item">
                <img src={item.imageUrl} alt={item.title} />
                <div className="item-info">
                  <div className="item-title">
                    {item.title}{" "}
                    <span onClick={() => removeProduct(item.id)} className="size-label">{item.size || "—"}</span>
                  </div>
                  <div className="item-details">{item.description}</div>
                  <div className="item-controls">
                    <button
                      onClick={() => decrementQuantity(item.id)}
                      disabled={item.quantity <= 1}
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button onClick={() => incrementQuantity(item.id)}>+</button>
                  </div>
                </div>
                <div className="item-price">
                  {item.price * item.quantity}₸
                  <div
                    className="remove"
                    onClick={() => removeProduct(item.id)}
                  >
                    <img
                      className="carti"
                      src={i2}
                      alt="Remove icon"
                    />{" "}
                    Remove
                  </div>
                </div>
              </div>
            ))}

            <div className="cart-summary">
              <div>Subtotal</div>
              <div>{totalPrice}₸</div>
            </div>

            <div className="checkout-row">
              <button onClick={handleCheckout} className="checkout-button">
                <img src="images/oay.png" alt="" /> Checkout
              </button>
            </div>
          </div>
        </main>
      )}
    </>
  );
}

export default Cart;
