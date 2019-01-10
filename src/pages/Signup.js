import React from "react";
import { Link } from "react-router-dom";
import { UserConsumer } from "../contexts/UserContext";
import "./Login/Login.scss";

const SignUp = _ => (
  <UserConsumer>
    {({ error, onSignup }) => (
      <div className="signup">
        <section className="signup__modal">
          <h1>Able Farm</h1>
          <form onSubmit={onSignup} className="signup__modal__form">
            {!!error && <p className="error">{error}</p>}
            <input name="email" type="email" placeholder="Email" />
            <input name="password" type="password" placeholder="Password" />
            <button type="submit">Sign Up</button>
          </form>
          <footer className="redirect-text">
            Already Have an Account? <Link to="/login">Login Now</Link>
          </footer>
        </section>
      </div>
    )}
  </UserConsumer>
);

export default SignUp;
