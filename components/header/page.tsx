"use client";
import React, { useState } from "react";
import Image from "next/image";
import style from "./header.module.css";
import Link from "next/link";

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
            <Link href="/" className={style.activeLink}>
              Home
            </Link>
            <Link href="/appointments">Appointments</Link>
            <Link href="/health-blog">Health Blog</Link>
            <Link href="/reviews">Reviews</Link>
          </nav>
        </div>

        {/* Buttons */}
        <div className={style.buttonContainer}>
          <Link href="/login">
            <button className={style.loginButton}>Login</button>
          </Link>
          <Link href="/signup">
            <button className={style.registerButton}>Register</button>
          </Link>
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
