import React from "react";
import { Link } from "react-router-dom";
import "./Login.scss";

const LogInView = ({ error, onSubmit }) => {
  return (
    <div className="login">
      <section className="login__modal">
        <h1>Able Farm</h1>
        <form onSubmit={onSubmit} className="login__modal__form">
          {!!error && <p className="error">{error}</p>}
          <input name="email" type="email" placeholder="Email" />
          <input name="password" type="password" placeholder="Password" />
          <button type="submit">Log in</button>
        </form>
        <footer className="redirect-text">
          Don’t have an account? <Link to="/signup">Sign up</Link>
        </footer>
      </section>
    </div>
  );
};

export default LogInView;
