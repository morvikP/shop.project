import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { HOME, SIGNUP } from "../utils/const";
import { Link } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    if (!email || !password) {
      setError("Пожалуйста, заполните все поля");
      return;
    }

    try {
      const res = await fetch('http://localhost:3000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error);
        return;
      }

      localStorage.setItem("currentUser", JSON.stringify(data));
      alert(`Добро пожаловать, ${data.email}! Вы вошли в систему.`);

      setEmail("");
      setPassword("");
      setError("");

      navigate(HOME);
    } catch (err) {
      setError("Ошибка подключения к серверу");
    }
  }

  return (
    <section className="login2">
      <div className="form-container2">
        <h2 className="form-title2">Login</h2>

        <h3 className="section-title2">Indicates required fields</h3>
        {error && <p style={{ color: "red" }}>{error}</p>}

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            className="input-field2"
            placeholder="*email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            className="input-field2"
            placeholder="*password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />

          <div className="loginniz">
            <button type="submit" className="submit-btn2">Login</button>
            <Link to={SIGNUP} className="signup">signup</Link>
          </div>
        </form>
      </div>
    </section>
  );
}

export default Login;