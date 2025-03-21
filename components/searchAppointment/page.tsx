import React from "react";
import style from "./searchAppointment.module.css";
import Image from "next/image";

export default function SearchAppointment() {
  return (
    <div className={style.container}>
      <h2>Find a doctor at your own ease</h2>
      <div className={style.searchBox}>
        <Image
          src="/search.svg"
          alt="Search Icon"
          width={20}
          height={20}
          priority
          className={style.searchIcon}
        />
        <input
          type="search"
          className={style.input}
          placeholder="Search doctors"
        />
        <button className={style.searchButton}>Search</button>
      </div>
    </div>
  );
}
