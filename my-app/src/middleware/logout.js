import { redirect } from "react-router-dom";

export  function action(req, res) {
  localStorage.removeItem("token");
  return redirect("/notes");
}
