import React from "react";
import style from "./appointments.module.css";
import SearchAppointment from "@/components/searchAppointment/page";
import Footer from "@/components/footer/page";
import Sidebar from "@/components/filterSidebar/page";
import DoctorCard from "@/components/doctorCard/page";
import Pagination from "@/components/pagination/page";

const doctors = [
  {
    name: "Dr Jane Doe, MBBS",
    specialty: "Dentist",
    experience: 9,
    rating: 5,
    image: "/doctor1.jpg",
  },
  {
    name: "Dr Sam Wilson, BDS",
    specialty: "Dentist",
    experience: 5,
    rating: 4,
    image: "/doctor2.jpg",
  },
  {
    name: "Dr Pepper Potts, BHMS",
    specialty: "Dentist",
    experience: 5,
    rating: 4,
    image: "/doctor3.jpg",
  },
  {
    name: "Dr Tony Stark, MDS",
    specialty: "Dentist",
    experience: 4,
    rating: 5,
    image: "/doctor4.jpg",
  },
  {
    name: "Dr Meghan, MD",
    specialty: "Dentist",
    experience: 3,
    rating: 4,
    image: "/doctor5.jpg",
  },
  {
    name: "Dr Dev Patel, FNB",
    specialty: "Dentist",
    experience: 2,
    rating: 4,
    image: "/doctor6.jpg",
  },
];

export default function Appointments() {
  return (
    <div className={style.container}>
      <SearchAppointment />

      <div className={style.wrapper}>
        <h2>{doctors.length} doctors available</h2>
        <div className={style.content}>
          <div className={style.sidebar}>
            <Sidebar />
          </div>

          <div className={style.main}>
            <div className={style.grid}>
              {doctors.map((doctor, index) => (
                <DoctorCard key={index} {...doctor} />
              ))}
            </div>
            <div className={style.pagination}>
              <Pagination />
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
