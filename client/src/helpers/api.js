import axios from "axios";

// Logger
axios.interceptors.request.use(request => {
    console.log('Starting Request', JSON.stringify(request, null, 2))
    return request
})

axios.interceptors.response.use(response => {
    console.log('Response:', JSON.stringify(response, null, 2))
    return response
})

export function API({ endpoint = "", method = "GET", data = {} }, authTokens) {

    console.log(endpoint, method, data);



  const config = {
    method,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${authTokens}`,
    },
    // body : body
  };

  if(method !== "GET")
    config.data = data;

  console.log(config);

  return axios(endpoint, config)
    .then((response) => {
        return response.data;
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
    data: JSON.stringify({ username, password }),
  };

  return axios("/api/auth/signin", config)
    .then((response) => {
      return response.data;
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
    data: JSON.stringify({ username, password }),
  };

  return axios("/api/auth/signup", config)
    .then((response) => {
        return response.data;
    })
    .catch((error) => {
      console.error(error);
    });
}


