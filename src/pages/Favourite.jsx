import { useState } from "react";
import { Link } from "react-router-dom";
import i1 from "../assets/images/fulllove.svg"
import i2 from "../assets/images/stor.png"

function Favourite() {
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem("favorites");
    return saved ? JSON.parse(saved) : [];
  });

  return (
    <main className="fav-section">
      <div className="fav-header">
        <span className="fav-heart">
          <img src={i1} alt="Favorites" />
        </span>
        <h2 className="fav-title">
          Your Favorites <span className="fav-count">({favorites.length} items)</span>
        </h2>
      </div>

      <div className="fav-grid">
        {favorites.length === 0 && <p>У вас пока нет избранных товаров.</p>}

        {favorites.map((item) => (
          <Link
            to={`/item/${item.id}`}
            key={item.id}
            className="fav-card"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <img src={item.imageUrl} alt={item.title} className="fav-img" />
            <div className="fav-text">
              <div className="fav-name">{item.title}</div>
              <div className="fav-sub"></div>
              <div className="fav-bottom">
                <span className="fav-price">{item.price}₸</span>
                <img src={i2} alt="cart" className="fav-icon" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}

export default Favourite;
