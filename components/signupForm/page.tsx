import React from "react";
import style from "./signup.module.css";

export default function form() {
  return (
    <div className={style.container}>
      <div className={style.form_wrapper}>
        <h2>Sign Up</h2>
        <p>
          <span>Already a member? </span> Login.
        </p>
        <div className={style.form_fields_wrapper}>
          <form className={style.form_fields}>
            <label htmlFor="role">Role</label>
            <select name="role" id="role">
              <option value="admin">Admin</option>
              <option value="user">User</option>
            </select>
            <label htmlFor="name"> Name</label>
            <input type="text" name="name" id="name" />
            <label htmlFor="phone"> Phone</label>
            <input type="text" name="phone" id="phone" />
            <label htmlFor="email"> Email</label>
            <input type="email" name="email" id="email" />
            <label htmlFor="password"> Password</label>
            <input type="password" name="password" id="password" />
            <button>Submit</button>
            <button>Reset</button>
          </form>
        </div>
      </div>
    </div>
  );
}
