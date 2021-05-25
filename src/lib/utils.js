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

export const headers = {
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
};

export const GET = path =>
  fetch(path, headers)
    .then(checkStatus)
    .then(parseJSON);

const _post = (url, payload) =>
  fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: headers,
    body: JSON.stringify(payload),
  });


export const POST = (url, payload, options = {}) => {
  const default_options = {
    checkStatus: true,
    parseJSON: true,
  };
  options = { ...default_options, ...options };
  if (options.checkStatus && options.parseJSON) {
    return _post(url, payload).then(checkStatus).then(parseJSON);
  } else if (options.checkStatus) {
    return _post(url, payload).then(checkStatus);
  } else if (options.parseJSON) {
    return _post(url, payload).then(parseJSON);
  } else {
    return _post(url, payload);
  }
};


export const redirectTo = url => window.location.assign(url);

/* START text helpers */

export const capitalize = string => {
  string = string.replace(/_/g, " "); // change out underscore for space
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const titleize = string => {
  string = string.replace(/_id/, ""); // remove _id
  string = string.replace(/_/g, " "); // change out underscore for space
  string = string.replace(/([a-z])([A-Z])/g, "$1 $2"); // add space for camelCase
  return string
    .split(" ")
    .map(word => capitalize(word))
    .join(" ");
};

/* END text helpers */
