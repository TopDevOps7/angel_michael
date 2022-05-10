// import config from 'config';
import { authHeader } from "../_helpers";
import axios from "axios";

export const userService = {
  login,
  logout,
  register,
  getAll,
  getById,
  update,
  delete: _delete
};

function login(email, password) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  };

  // return fetch(`${config.apiUrl}/users/authenticate`, requestOptions)
  //     .then(handleResponse)
  //     .then(user => {
  //         // login successful if there's a jwt token in the response
  //         if (user.token) {
  //             // store user details and jwt token in local storage to keep user logged in between page refreshes
  //             localStorage.setItem('user', JSON.stringify(user));
  //         }

  //         return user;
  //     });

  return axios
    .post("/api/user/authenticate", requestOptions)
    .then(function (response) {
      if (response.data.length > 0) {
        console.log(response);
        handleResponse;
        localStorage.setItem("user", true);
      }
    })
    .catch(function (error) {
      console.log(error);
    });
}

function logout() {
  // remove user from local storage to log user out
  localStorage.removeItem("user");
  localStorage.removeItem("ATHENTICATE_USER");
}

function register(user) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user)
  };

  // return fetch(`${config.apiUrl}/users/register`, requestOptions).then(handleResponse);
  return axios
    .post("/api/user/addUser", requestOptions)
    .then(function (response) {
      console.log(response);
      handleResponse;
    })
    .catch(function (error) {
      console.log(error);
    });
}

function getAll() {
  const requestOptions = {
    method: "GET",
    headers: authHeader()
  };

  return fetch(`${config.apiUrl}/users`, requestOptions).then(handleResponse);
}

function getById(id) {
  const requestOptions = {
    method: "GET",
    headers: authHeader()
  };

  return fetch(`${config.apiUrl}/users/${id}`, requestOptions).then(
    handleResponse
  );
}

function update(user) {
  const requestOptions = {
    method: "PUT",
    headers: { ...authHeader(), "Content-Type": "application/json" },
    body: JSON.stringify(user)
  };

  return fetch(`${config.apiUrl}/users/${user.id}`, requestOptions).then(
    handleResponse
  );
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
  const requestOptions = {
    method: "DELETE",
    headers: authHeader()
  };

  return fetch(`${config.apiUrl}/users/${id}`, requestOptions).then(
    handleResponse
  );
}

function handleResponse(response) {
  return response.text().then(text => {
    const data = text && JSON.parse(text);
    if (!response.ok) {
      if (response.status === 401) {
        // auto logout if 401 response returned from api
        logout();
        location.reload(true);
      }

      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }

    return data;
  });
}
