"use client";
import { useState } from "react";
import style from "./appointmentScheduler.module.css"; // ✅ Ensure correct CSS module import

export default function AppointmentScheduler() {
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const dates = [
    { day: "Thu", date: "22", month: "Dec" },
    { day: "Fri", date: "23", month: "Dec" },
    { day: "Sat", date: "24", month: "Dec" },
    { day: "Sun", date: "25", month: "Dec" },
    { day: "Mon", date: "26", month: "Dec" },
    { day: "Tue", date: "27", month: "Dec" },
    { day: "Wed", date: "28", month: "Dec" },
  ];

  const timeSlots = [
    ["9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM"],
    ["11:00 AM", "11:30 AM", "12:00 AM", "12:30 PM"],
  ];

  return (
    <div className={style.appointmentContainer}>
      <div className={style.headingContainer}>
        <h2>Schedule Appointment</h2>
        <button className={style.bookAppointmentBtn}>Book Appointment</button>
      </div>

      {/* Tabs */}
      <div className={style.tabContainer}>
        <button className={`${style.tab} ${style.active}`}>
          Book Video Consult
        </button>
        <button className={style.tab}>Book Hospital Visit</button>
      </div>

      {/* Location Dropdown */}
      <select className={style.locationDropdown}>
        <option>MedicareHeart Institute, Okhla Road</option>
      </select>

      {/* Date Selector */}
      <div className={style.dateSelector}>
        <button className={style.arrowBtn}>{"<"}</button>
        <span>December 2022</span>
        <button className={style.arrowBtn}>{">"}</button>
      </div>

      {/* Dates */}
      <div className={style.dateList}>
        {dates.map((item, index) => (
          <button
            key={index}
            className={`${style.dateBtn} ${index === 0 ? style.active : ""}`}
          >
            <div className={style.day}>{item.day}</div>
            <div className={style.date}>
              {item.date} {item.month}
            </div>
            {/* <div className={style.month}></div> */}
          </button>
        ))}
      </div>

      {/* Time Slots */}
      <div className={style.timeSection}>
        <h3 className={style.timeHeader}>
          Morning <span>2 Slots</span>
        </h3>
        <div className={style.timeSlots}>
          {timeSlots[0].map((time, index) => (
            <button
              key={index}
              className={`${style.timeBtn} ${
                selectedTime === time ? style.selected : ""
              }`}
              onClick={() => setSelectedTime(time)}
            >
              {time}
            </button>
          ))}
        </div>
      </div>

      <div className={style.timeSection}>
        <h3 className={style.timeHeader}>
          Afternoon <span>3 Slots</span>
        </h3>
        <div className={style.timeSlots}>
          {timeSlots[1].map((time, index) => (
            <button
              key={index}
              className={`${style.timeBtn} ${
                selectedTime === time ? style.selected : ""
              }`}
              onClick={() => setSelectedTime(time)}
            >
              {time}
            </button>
          ))}
        </div>
      </div>

      {/* Next Button */}
      <button className={style.nextBtn}>Next</button>
    </div>
  );
}
