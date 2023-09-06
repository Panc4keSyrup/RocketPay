import React from "react";
import {useLocation} from "react-router-dom";
import AppContext from "../../AppContext";

export default function NganLuongNotify() {
  const search = useLocation().search
  console.log(search)
  const token = new URLSearchParams(search).get("token")
  console.log(AppContext.token);
  return (
    <div>
      <h1>Notify page</h1>
      <p>{token}</p>
    </div>
  );
}