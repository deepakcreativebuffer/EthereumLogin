import React from "react";
import authStore from "../stores/authStore";

export default function Login() {
const s =authStore()

  return <div>
    <button onClick={s.connectWallet} >Connect wallet </button>
  </div>;
}
