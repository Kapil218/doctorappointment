"use client";
import React, { useState } from "react";
import Image from "next/image";
import style from "./header.module.css";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className={style.container}>
      <div className={style.wrapper}>
        {/* Logo */}
        <div className={style.link_wrapper}>
          <Image
            src="/logo.svg"
            alt="MedCare Logo"
            width={191}
            height={56}
            priority
          />

          {/* Navigation Links */}
          <nav className={`${style.navLinks} ${menuOpen ? style.navOpen : ""}`}>
            <a href="#" className={style.activeLink}>
              Home
            </a>
            <a href="#">Appointments</a>
            <a href="#">Health Blog</a>
            <a href="#">Reviews</a>
          </nav>
        </div>

        {/* Buttons */}
        <div className={style.buttonContainer}>
          <button className={style.loginButton}>Login</button>
          <button className={style.registerButton}>Register</button>
        </div>
        {/* Hamburger Icon */}
        <button
          className={`${style.hamburger} ${menuOpen ? style.active : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          btn
        </button>
      </div>
    </header>
  );
}
