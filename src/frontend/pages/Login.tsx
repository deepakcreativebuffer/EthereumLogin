import React from "react";
import authStore from "../stores/authStore";
import { Navigate } from "react-router-dom"

export default function Login() {
  const s = authStore()
  if (s.loggedIn) return <Navigate to="/" />

  // return  <button onClick={s.connectWallet} >Connect wallet </button>
  return <div>
    {s.address === " " ? <>
      <button onClick={s.connectWallet} >Connect wallet </button>
    </> : <>
      <button onClick={s.signin} >Sign in </button>
    </>}
  </div>;
}
