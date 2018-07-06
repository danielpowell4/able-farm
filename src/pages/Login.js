import React from "react";
import { Redirect } from "react-router-dom";
import { Auth } from "../router/utils";

class Login extends React.Component {
  state = {
    redirectToReferrer: false,
    email: "",
    password: ""
  };

  validateForm = () => {
    const { email, password } = this.state;
    return email.length > 0 && password.length > 0;
  };

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    const { email, password } = this.state;
    Auth.authenticate(email, password)
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
        <p>You must log in to view the page at {from.pathname}</p>
        <div className="LoginForm">
          <form onSubmit={this.handleSubmit}>
            <div className="input-wrapper">
              <label htmlFor="email">Email</label>
              <input
                autoFocus
                id="email"
                type="email"
                value={this.state.email}
                onChange={this.handleChange}
              />
            </div>
            <div className="input-wrapper">
              <label htmlFor="password">Password</label>
              <input
                value={this.state.password}
                onChange={this.handleChange}
                type="password"
                id="password"
              />
            </div>
            <button disabled={!this.validateForm()} type="submit">
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default Login;
