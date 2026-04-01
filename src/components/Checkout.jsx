import { useCart } from "../context/CartContext";
import { useState } from "react";
import styles from "../assets/css/order.module.css";
import i1 from "../assets/images/order.svg"

function Checkout() {
  const { cartItems, totalPrice } = useCart();
  const [paymentMethod, setPaymentMethod] = useState("Kaspi");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Заказ оформлен!");
  };

  return (
    <section>
      <div className={styles.container2}>
        <div className={`${styles.card2} ${styles.orderSummary2}`}>
          <h2>Order Summary</h2>

          {cartItems.length === 0 ? (
            <p>Корзина пуста.</p>
          ) : (
            cartItems.map((item, index) => (
              <div className={styles.item2} key={index}>
                <img src={item.imageUrl} alt={item.title} />
                <div className={styles.details2}>
                  <div className={styles.name2}>{item.title}</div>
                  <div className={styles.info2}>
                    Размер: {item.size} | Цвет: {item.color}
                  </div>
                  <div className={styles.qty2}>Кол-во: {item.quantity}</div>
                </div>
                <div className={styles.price2}>{item.price * item.quantity}₸</div>
              </div>
            ))
          )}

          <div className={styles.total2}>
            <span>Итого</span>
            <span>{totalPrice}₸</span>
          </div>
        </div>

        <div className={`${styles.card2r} ${styles.shippingPayment2}`}>
          <h2>Shipping & Payment</h2>
          <form onSubmit={handleSubmit}>
            <label>ФИО</label>
            <input type="text" placeholder="Введите ваше имя" required />

            <label>Город</label>
            <input type="text" placeholder="Введите город" required />

            <label>Адрес доставки</label>
            <input type="text" placeholder="Введите адрес" required />

            <label>Телефон</label>
            <input type="tel" placeholder="Введите номер телефона" required />

            <button className="orderbutton" type="submit">
              <span className="orderspan">
                <img src={i1} alt="order" />
              </span>
              Оформить заказ
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Checkout;
