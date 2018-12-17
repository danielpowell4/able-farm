import React from "react";
import { Redirect } from "react-router-dom";
import { Auth } from "../lib/utils";

class Signup extends React.Component {
  state = {
    redirectToReferrer: Auth.isAuthenticated(),
    name: "",
    email: "",
    password: "",
    password_confirmation: ""
  };

  validateForm = () => {
    const { name, email, password, password_confirmation } = this.state;

    return (
      name.length > 0 &&
      email.length > 0 &&
      password.length > 0 &&
      password_confirmation.length > 0 &&
      password == password_confirmation
    );
  };

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    const { name, email, password, password_confirmation } = this.state;
    return Auth.signup(name, email, password, password_confirmation)
      .then(() => this.setState({ redirectToReferrer: true }))
      .catch(error => alert(error));
  };

  render() {
    const { from } = this.props.location.state || { from: { pathname: "/" } };
    const { redirectToReferrer } = this.state;

    if (redirectToReferrer) {
      return <Redirect to={from} />;
    }

    return (
      <div>
        <div className="SignupForm">
          <form onSubmit={this.handleSubmit}>
            {[
              { field: "name", label: "Name", type: "text" },
              { field: "email", label: "Email", type: "email" },
              { field: "password", label: "Password", type: "password" },
              {
                field: "password_confirmation",
                label: "Password Confirmation",
                type: "password"
              }
            ].map(({ field, label, type }, i) => (
              <div className="input-wrapper" key={i}>
                <label htmlFor={field}>{label}</label>
                <input
                  autoFocus={i === 0}
                  id={field}
                  type={type}
                  value={this.state[field]}
                  onChange={this.handleChange}
                />
              </div>
            ))}
            <button disabled={!this.validateForm()} type="submit">
              Signup
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default Signup;
