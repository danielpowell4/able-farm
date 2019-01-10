import React from "react";
import app, { db } from "../base";

let UserContext;
const { Provider, Consumer } = (UserContext = React.createContext());

class UserProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      loading: true, // ensures user loaded before render
      error: null,
      onLogin: this.handleLogin,
      onLogout: this.handleLogout,
      onSignup: this.handleSignUp,
    };
  }

  componentDidMount() {
    this.subscribeToAuthState();
  }

  subscribeToAuthState = () => {
    app.auth().onAuthStateChanged(this.handleAuthChange);
  };

  getUser = uid => {
    this.setState({ loading: true, error: null });

    return db
      .collection("users")
      .doc(uid)
      .get()
      .then(snapshot => {
        this.setState({
          user: snapshot.data(),
          loading: false,
        });
      });
  };

  handleAuthChange = authUser => {
    if (authUser) {
      this.getUser(authUser.uid);
    } else {
      this.setState({
        user: null,
        error: null,
        loading: false,
      });
    }
  };

  handleLogin = async event => {
    event.preventDefault();
    const { email, password } = event.target.elements;
    try {
      await app.auth().signInWithEmailAndPassword(email.value, password.value);
    } catch (error) {
      this.setState({ error: error.message });
    }
  };

  handleSignUp = async event => {
    event.preventDefault();
    const { email, password } = event.target.elements;

    try {
      const { user } = await app
        .auth()
        .createUserWithEmailAndPassword(email.value, password.value);
      this.writeUserData(user);
    } catch (error) {
      this.setState({ error: error.message });
    }
  };

  writeUserData = user => {
    if (user.uid)
      return db
        .collection("users")
        .doc(user["uid"])
        .set(
          {
            uid: user.uid,
            email: user.email,
          },
          { merge: true }
        );
  };

  handleLogout = () => {
    this.setState({ loading: true });
    app
      .auth()
      .signOut()
      .catch(error => {
        this.setState({ error, loading: false });
      });
  };

  render() {
    return <Provider value={this.state}>{this.props.children}</Provider>;
  }
}

export { UserProvider, Consumer as UserConsumer, UserContext };
