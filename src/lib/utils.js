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
