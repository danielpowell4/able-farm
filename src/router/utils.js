import fetch from "cross-fetch";
const apiUrl = "//localhost:5000";

const checkStatus = response => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  const error = new Error(`${response.statusText}`);
  error.status = response.statusText;
  error.response = response;
  throw error;
};

const parseJSON = payload => {
  if (typeof payload === "string") {
    return JSON.parse(payload);
  }
  return payload.json();
};

export const Auth = {
  isAuthenticated: false,
  auth_token: null,
  authenticate(email, password) {
    return fetch(`${apiUrl}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `email=${email}&password=${password}`
    })
      .then(checkStatus)
      .then(parseJSON)
      .then(auth_token => {
        this.auth_token = auth_token;
        this.isAuthenticated = true;
        return true;
      });
  },
  signout(cb) {
    this.isAuthenticated = false;
    this.auth_token = null;
    cb();
  }
};
