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

export function formatDateToDDMMYYYY(date) {
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Month is zero-based, so we add 1
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
}
