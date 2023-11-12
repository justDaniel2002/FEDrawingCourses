import jwt_decode from "jwt-decode";
import { getTitem } from "./localStorageExtension";

export const decodeToken = (token) => {
  try {
    const decodedToken = jwt_decode(token);

    // The decoded token will be a JavaScript object containing user information
    console.log(decodedToken);
    return decodedToken;
  } catch (error) {
    console.error("Error decoding token:", error);
  }
};

export function formatDateToDDMMYYYY(date) {
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Month is zero-based, so we add 1
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
}

export function fileToBase64(file) {
  console.log(file);
  return new Promise((resolve) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      const result = event.target?.result;
      const base64String = result ? result.split(",")[1] : null;
      resolve("data:image/jpeg;base64," + base64String);
    };

    reader.readAsDataURL(file);
  });
}

export const tryGetAccount = () => {
  const localAccount = getTitem("account");
  return localAccount;
};

export function totalTimeInSeconds(minutes, seconds) {
  // Calculate the total time in seconds and cast it to a long integer
  const totalTime = (minutes * 60 + seconds);

  // Use BigInt to cast the result to a long integer
  const longTotalTime = BigInt(totalTime).toString();

  return longTotalTime;
}
