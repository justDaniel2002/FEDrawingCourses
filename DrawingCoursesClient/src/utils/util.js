import jwt_decode from 'jwt-decode';

export const decodeToken = (token) => {
  try {
    const decodedToken = jwt_decode(token);

    // The decoded token will be a JavaScript object containing user information
    console.log(decodedToken);
    return decodedToken
  } catch (error) {
    console.error("Error decoding token:", error);
  }
};
