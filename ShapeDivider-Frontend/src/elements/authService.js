import jwtDecode from "jwt-decode";
const jwt = require("jsonwebtoken");
export function logout() {
  localStorage.removeItem("token");
}
export function getCurrentUser() {
  //   try {
  // 	  const token = localStorage.getItem("token");

  // 	    jwt.verify(token, "secret", (err, decoded) => {

  // 	if (err) {
  //         localStorage.clear();
  // return null;
  //       } else {

  // 		return jwtDecode(token);
  //       }
  //     });

  //   } catch (e) {
  //     return null;
  //   }
  try {
    const token = localStorage.getItem("token");
    var decoededToken = null;
    jwt.verify(token, "secret", (err, decoded) => {
      if (err) {
        localStorage.clear();
        decoededToken = null;
      } else {
        decoededToken = decoded;
      }
    });

    return decoededToken;
  } catch (e) {
    return null;
  }
}

export function loginWithJWT(jwt) {
  localStorage.setItem("token", jwt);
}
export function getJWT() {
  return localStorage.getItem("token");
}
export function getHeader() {
  return {
    headers: {
      Authorization: "Bearer ".concat(getJWT()),
    },
  };
}
export default {
  getCurrentUser,
  logout,
  loginWithJWT,
  getJWT,
  getHeader,
};
