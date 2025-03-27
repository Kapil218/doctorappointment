"use client";

import style from "./schedule-appointment.module.css";
import React, { useState } from "react";
import BookingConfirmation from "@/components/confirmPage/page";
// import Form from "@/components/form/page";
import Footer from "@/components/footer/page";

export default function Home() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  // Function to update selectedDate
  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
  };

  return (
    <>
      <main className={style.container}>
        <section className={style.wrapper}>
          <div className={style.hero_text}>
            <h1>Book Your Next Doctor Visit in Seconds.</h1>
            <p>
              CareMate helps you find the best healthcare provider by specialty,
              location, and more, ensuring you get the care you need.
            </p>
          </div>
          <div className={style.hero_img}>{/* <Form /> */}</div>
        </section>
        <Footer />
      </main>
    </>
  );
}
