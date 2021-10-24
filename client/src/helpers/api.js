export function API({ endpoint = "", method = "GET", data = {} }, authTokens) {

    console.log(endpoint, method, data);

    let body ;
    try {
     body = JSON.stringify(data);
    }
    catch (error) {
        console.log('Error parsing JSON:', error, data);
    }

  const config = {
    method,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${authTokens}`,
    },
    body : body
  };

  console.log(config);
  return fetch(endpoint, config)
    .then((response) => {
      return response.json();
    })
    .catch((error) => console.log(error));
}

export function login({ username = "", password = "" }) {
  const config = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  };

  return fetch("/api/auth/signin", config)
    .then((response) => {
      return response.json();
    })
    .catch((error) => {
      console.log(error);
    });
}

export function register({ username = "", password = "" }) {
  const config = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  };

  return fetch("/api/auth/signup", config)
    .then((response) => {
      return response.json();
    })
    .catch((error) => {
      console.error(error);
    });
}


