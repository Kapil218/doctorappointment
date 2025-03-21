import React from "react";
import style from "./appointments.module.css";
import SearchAppointment from "@/components/searchAppointment/page";
import Footer from "@/components/footer/page";

export default function appointments() {
  return (
    <div className={style.container}>
      <div className={style.wrapper}>
        <SearchAppointment />
      </div>

      <Footer />
    </div>
  );
}
