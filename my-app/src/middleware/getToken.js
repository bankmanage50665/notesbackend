import { redirect } from "react-router-dom";

export function getToken(req, res, next) {
  const token = localStorage.getItem("token");
  return token;
}

export function checkAuthLoader() {
  const token = getToken();
  if (!token) {
    return redirect("/login");
  }
  return null;
}

export function userId() {
  const userId = localStorage.getItem("userId");
  return userId;
}
