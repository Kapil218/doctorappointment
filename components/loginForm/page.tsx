import React from "react";
import style from "./login.module.css";

export default function form() {
  return (
    <div className={style.container}>
      <div className={style.form_wrapper}>
        <h2>Login</h2>
        <p>
          <span>Are you a new member?</span> Sign up here.
        </p>
        <div className={style.form_fields_wrapper}>
          <form className={style.form_fields}>
            <label htmlFor="email"> Email</label>
            <input type="email" name="email" id="email" />
            <label htmlFor="password"> Password</label>
            <input type="password" name="password" id="password" />
            <button>Login</button>
            <button>Reset</button>
            <p>Forgot password?</p>
          </form>
        </div>
      </div>
    </div>
  );
}
