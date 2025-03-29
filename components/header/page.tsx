"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import style from "./header.module.css";
import Link from "next/link";
import { usePathname, useRouter } from 'next/navigation';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const overlay = document.querySelector(`.${style.overlay}`);
      if (menuOpen && overlay && event.target === overlay) {
        setMenuOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [menuOpen]);

  // Close menu after navigation
  const handleNavClick = (path: string) => {
    router.push(path);
    setMenuOpen(false);
  };

  const handleLogout = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/v1/users/logout", {
        method: "POST",
        credentials: "include",
      });

      if (!res.ok) throw new Error("Failed to log out");
      setMenuOpen(false);
      router.push("/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const isActive = (path: string) => {
    return pathname === path ? style.activeLink : "";
  };

  const isLoggedIn = true; // Replace with actual auth check

  const NavLinks = ({ mobile = false }) => (
    <>
      <Link 
        href="/" 
        className={isActive('/')}
        onClick={() => mobile && handleNavClick('/')}
      >
        Home
      </Link>
      <Link 
        href="/appointments" 
        className={isActive('/appointments')}
        onClick={() => mobile && handleNavClick('/appointments')}
      >
        Appointments
      </Link>
      <Link 
        href="/health-blog" 
        className={isActive('/health-blog')}
        onClick={() => mobile && handleNavClick('/health-blog')}
      >
        Health Blog
      </Link>
      <Link 
        href="/reviews" 
        className={isActive('/reviews')}
        onClick={() => mobile && handleNavClick('/reviews')}
      >
        Reviews
      </Link>
    </>
  );

  return (
    <header className={style.container}>
      <div className={style.wrapper}>
        <div className={style.link_wrapper}>
          <Image
            src="/logo.svg"
            alt="MedCare Logo"
            width={191}
            height={56}
            priority
          />
          <nav className={style.navLinks}>
            <NavLinks />
          </nav>
        </div>

        <div className={style.buttonContainer}>
          {isLoggedIn ? (
            <button onClick={handleLogout} className={style.logoutButton}>
              Logout
            </button>
          ) : (
            <>
              <Link href="/login">
                <button className={style.loginButton}>Login</button>
              </Link>
              <Link href="/signup">
                <button className={style.registerButton}>Register</button>
              </Link>
            </>
          )}
        </div>

        <button
          className={`${style.hamburger} ${menuOpen ? style.active : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        {/* Overlay */}
        <div className={`${style.overlay} ${menuOpen ? style.active : ''}`} />

        {/* Mobile Menu */}
        <div className={`${style.mobileMenu} ${menuOpen ? style.active : ''}`}>
          <nav>
            <NavLinks mobile={true} />
          </nav>
          <div className={style.buttonContainer}>
            {isLoggedIn ? (
              <button onClick={handleLogout} className={style.logoutButton}>
                Logout
              </button>
            ) : (
              <>
                <Link href="/login">
                  <button className={style.loginButton}>Login</button>
                </Link>
                <Link href="/signup">
                  <button className={style.registerButton}>Register</button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
