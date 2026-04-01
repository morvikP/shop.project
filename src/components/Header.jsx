import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import log1 from "../assets/images/1.png";
import log2 from "../assets/images/2.png";
import log3 from "../assets/images/3.png";
import loginimg from "../assets/images/login.svg";
import { CART, CATALOGE, CATEGORY, FAVOURITE, LOGIN } from "../utils/const";
import { HOME } from "../utils/const";

function Header() {
  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(() => !!localStorage.getItem("currentUser"));

  useEffect(() => {
    function onStorage() {
      setIsLoggedIn(!!localStorage.getItem("currentUser"));
    }
    window.addEventListener("storage", onStorage);
    const intervalId = setInterval(() => {
      setIsLoggedIn(!!localStorage.getItem("currentUser"));
    }, 1000);

    return () => {
      window.removeEventListener("storage", onStorage);
      clearInterval(intervalId);
    };
  }, []);

  function handleLogout() {
    localStorage.removeItem("currentUser");
    setIsLoggedIn(false);
    navigate(LOGIN);
  }

  return (
    <header>
      <div className="navbar">
        <Link to={HOME} className="logo">FIERO</Link>
        <nav>
          <Link to={HOME} className="head">Home</Link>
          <Link to={CATALOGE} className="head">Shop</Link>
          <Link to={CATEGORY} className="head">Collections</Link>
        </nav>
        <div className="icons">
          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="logout-btn"
              style={{
                cursor: "pointer",
                background: "none",
                border: "none",
                padding: 0
              }}
              aria-label="Logout"
            >
              <img src={loginimg} alt="Logout" className="headi" />
            </button>
          ) : (
            <Link to={LOGIN}>
              <img className="headi" src={log1} alt="Login" />
            </Link>
          )}

            <Link to={FAVOURITE}>
            <img className="headi" src={log2} alt="" />
            </Link>
          <Link to={CART}>
            <img className="headi" src={log3} alt="" />
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Header;
