import React from "react";
import style from "./appointments.module.css";
import AppointmentDoctorList from "@/components/appointmentDoctorList/page";
import SearchAppointment from "@/components/searchAppointment/page";
import Footer from "@/components/footer/page";
import Sidebar from "@/components/filterSidebar/page";

export default function Appointments() {
  return (
    <div className={style.container}>
      <SearchAppointment />

      <div className={style.wrapper}>
        <h2>6 doctors available</h2>
        <div className={style.content}>
          <div className={style.sidebar}>
            <Sidebar />
          </div>

          <div className={style.main}>
            <AppointmentDoctorList />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
