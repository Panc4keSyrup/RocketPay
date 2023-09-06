import React from 'react'
import {useLocation} from "react-router-dom";

const NganLuongCancel = () => {
    const search = useLocation().search;
    console.log(search);
    const token = new URLSearchParams(search).get("token");
  return (
    <div>
      <h1>Cancel page</h1>
      <p>{token}</p>
    </div>
  )
}

export default NganLuongCancel
