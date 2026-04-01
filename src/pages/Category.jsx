import i1 from "../assets/images/gt.png";
import i2 from "../assets/images/jeans.png";
import i4 from "../assets/images/out.png";
import i5 from "../assets/images/active.png";
import str from "../assets/images/str.svg";
import { Link } from "react-router-dom";

function Category() {
  return (
    <main className="fav-section">
      <section className="category-section">
        <div className="category-header">
          <h2>Shop by Category</h2>
          <p>
            Discover our curated clothing categories. Explore the latest trends
            for every style, season, and occasion.
          </p>
        </div>

        <div className="category-grid">

          <Link className="category" to="/cataloge?categoryId=1">
            <img src={i1} alt="T-Shirts & Tops" />
            <div className="category-card">
              <div className="card-content">
                <h3>T-Shirts & Tops</h3>
                <p className="op">
                  Explore comfortable and stylish t-shirts, tanks, and more for every occasion.
                </p>
              </div>
              <span className="shop-link">
                Shop now <img className="stri" src={str} alt="" />
              </span>
            </div>
          </Link>

          <Link className="category" to="/cataloge?categoryId=4">
            <img src={i2} alt="Jeans & Pants" />
            <div className="category-card">
              <div className="card-content">
                <h3>Jeans & Pants</h3>
                <p className="op">
                  Find your perfect fit from our collection of modern jeans and pants.
                </p>
              </div>
              <span className="shop-link">
                Shop now <img className="stri" src={str} alt="" />
              </span>
            </div>
          </Link>

          <Link className="category" to="/cataloge?categoryId=3">
            <img src={i4} alt="Outerwear" />
            <div className="category-card">
              <div className="card-content">
                <h3>Outerwear</h3>
                <p className="op">
                  Jackets, coats, and layers to keep you warm and stylish in any season.
                </p>
              </div>
              <span className="shop-link">
                Shop now <img className="stri" src={str} alt="" />
              </span>
            </div>
          </Link>

          <Link className="category" to="/cataloge?categoryId=2">
            <img src={i5} alt="Activewear" />
            <div className="category-card">
              <div className="card-content">
                <h3>Activewear</h3>
                <p className="op">
                  Performance gear for your workouts and daily activities.
                </p>
              </div>
              <span className="shop-link">
                Shop now <img className="stri" src={str} alt="" />
              </span>
            </div>
          </Link>

        </div>
      </section>
    </main>
  );
}

export default Category;
