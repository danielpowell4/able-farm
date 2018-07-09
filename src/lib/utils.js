import fetch from "cross-fetch";
const apiUrl = "";

export const checkStatus = response => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  const error = new Error(`${response.statusText}`);
  error.status = response.statusText;
  error.response = response;
  throw error;
};

export const parseJSON = payload => {
  if (typeof payload === "string") {
    return JSON.parse(payload);
  }
  return payload.json();
};

export const Auth = {
  auth_token: localStorage.getItem("auth_token"),
  isAuthenticated() {
    return !!this.auth_token;
  },
  authenticate(email, password) {
    return fetch(`${apiUrl}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `email=${email}&password=${password}`
    })
      .then(checkStatus)
      .then(parseJSON)
      .then(({ auth_token }) => {
        this.auth_token = auth_token;
        localStorage.setItem("auth_token", auth_token);
        return Promise.resolve();
      });
  },
  signup(name, email, password, password_confirmation) {
    return fetch(`${apiUrl}/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `name=${name}&email=${email}&password=${password}&password_confirmation=${password_confirmation}`
    })
      .then(checkStatus)
      .then(parseJSON)
      .then(({ auth_token }) => {
        this.auth_token = auth_token;
        localStorage.setItem("auth_token", auth_token);
        return Promise.resolve();
      });
  },
  signout(cb) {
    localStorage.removeItem("auth_token");
    this.auth_token = null;
    return cb();
  }
};

export const headers = {
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: Auth.auth_token || localStorage.getItem("auth_token")
  }
};

export const GET = path =>
  fetch(`${apiUrl}${path}`, headers)
    .then(checkStatus)
    .then(parseJSON);
