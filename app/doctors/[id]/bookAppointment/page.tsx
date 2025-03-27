"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import styles from "./appointment2.module.css";
import Footer from "@/components/footer/page";

interface Doctor {
  name: string;
  location: string;
  available_times: Record<string, Record<string, string[]>>; // { date: { time_period: [slots] } }
}

const AppointmentPage = () => {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const [doctorData, setDoctorData] = useState<Doctor | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [selectedTab, setSelectedTab] = useState<"video" | "hospital">("video");
  const [selectedLocation, setSelectedLocation] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [booking, setBooking] = useState(false);

  const timeCategories = {
    morning: { label: "Morning", start: "09:00", end: "11:59" },
    afternoon: { label: "Afternoon", start: "12:00", end: "15:59" },
    evening: { label: "Evening", start: "16:00", end: "18:00" },
  };

  const convertTo12HourFormat = (time24: string) => {
    const [hour, minute] = time24.split(":").map(Number);
    const period = hour >= 12 ? "PM" : "AM";
    const formattedHour = hour % 12 || 12;
    return `${formattedHour}:${minute.toString().padStart(2, "0")} ${period}`;
  };

  const generateTimeSlots = (start: string, end: string) => {
    const slots = [];
    let current = start;

    while (current <= end) {
      slots.push(current);
      const [h, m] = current.split(":").map(Number);
      const nextHour = h + (m === 30 ? 1 : 0);
      const nextMin = m === 30 ? "00" : "30";
      current = `${nextHour.toString().padStart(2, "0")}:${nextMin}`;
    }

    return slots;
  };

  const getFilteredSlots = (
    availableSlots: string[],
    start: string,
    end: string
  ) => {
    const allSlots = generateTimeSlots(start, end);
    return allSlots.map((slot) => ({
      time: slot,
      available: availableSlots.includes(slot),
    }));
  };

  const generateDates = () => {
    const today = new Date();
    return Array.from({ length: 7 }, (_, i) => {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      return {
        day: date.toLocaleString("en-US", { weekday: "short" }),
        date: date.getDate(),
        month: date.toLocaleString("en-US", { month: "short" }),
        fullDate: date.toISOString().split("T")[0],
      };
    });
  };

  const handleBookAppointment = async () => {
    if (!id || !selectedDate || !selectedTime || !doctorData) return;

    setBooking(true);

    const shift = Object.keys(timeCategories).find(
      (key) =>
        selectedTime >=
          timeCategories[key as keyof typeof timeCategories].start &&
        selectedTime <= timeCategories[key as keyof typeof timeCategories].end
    );

    const appointmentData = {
      doctor_id: Number(id),
      appointment_time: {
        date: selectedDate,
        shift: shift || "unknown",
        slot_time: selectedTime,
      },
      location: selectedTab === "video" ? "Online" : selectedLocation,
      consultation_type: selectedTab,
    };

    try {
      const response = await fetch(
        "http://localhost:3000/api/v1/appointments/book-appointment",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(appointmentData),
        }
      );

      const data = await response.json();

      if (response.ok) {
        alert("Appointment booked successfully!");
        router.push("/appointments"); // Redirect after booking
      } else {
        alert(data.message || "Failed to book appointment");
      }
    } catch (error) {
      console.error("Error booking appointment:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setBooking(false);
    }
  };

  const availableDates = generateDates();

  useEffect(() => {
    async function fetchDoctor() {
      if (!id) return;
      try {
        setLoading(true);
        const response = await fetch(
          `http://localhost:3000/api/v1/doctors/${id}`
        );
        if (!response.ok) throw new Error("Failed to fetch doctor");

        const fetchData = await response.json();
        console.log("Fetched doctor data:", fetchData);

        setDoctorData({
          name: fetchData.data.name,
          location: fetchData.data.location || "",
          available_times: fetchData.data.available_times || {},
        });

        setSelectedLocation(fetchData.data.location || "");

        setLoading(false);
      } catch (error) {
        console.error("Error fetching doctor:", error);
        setLoading(false);
      }
    }
    fetchDoctor();
  }, [id]);

  useEffect(() => {
    if (!doctorData?.available_times) return;

    const firstAvailableDate = availableDates.find(
      (d) =>
        doctorData?.available_times?.[d.fullDate] &&
        Object.values(doctorData.available_times[d.fullDate]).some(
          (slots) => slots.length > 0
        )
    );

    setSelectedDate(firstAvailableDate ? firstAvailableDate.fullDate : "");
  }, [doctorData]);

  return (
    <>
      <main className={styles.hero}>
        <div className={styles.scdcontainer}>
          <div className={styles.slotContainer}>
            <div className={styles.heading_and_button}>
              <span>Schedule Appointment</span>
              <button
                className={styles.bookButton}
                disabled={!selectedTime || booking}
                onClick={handleBookAppointment}
              >
                {booking ? "Booking..." : "Book Appointment"}
              </button>
            </div>

            {/* Tabs for Consultation Type */}
            <div className={styles.consultationTabs}>
              <button
                className={`${styles.tabButton} ${
                  selectedTab === "video" ? styles.activeTab : ""
                }`}
                onClick={() => setSelectedTab("video")}
              >
                Book Video Consult
              </button>

              <button
                className={`${styles.tabButton} ${
                  selectedTab === "hospital" ? styles.activeTab : ""
                }`}
                onClick={() => setSelectedTab("hospital")}
              >
                Book Hospital Visit
              </button>
            </div>

            {/* Location Dropdown for Hospital Visit */}
            {selectedTab === "hospital" &&
              doctorData &&
              doctorData.location && (
                <div className={styles.locationDropdown}>
                  <select
                    onChange={(e) => setSelectedLocation(e.target.value)}
                    value={selectedLocation}
                    className={styles.selectBox}
                  >
                    <option
                      key={doctorData.location}
                      value={doctorData.location}
                    >
                      {doctorData.location}
                    </option>
                  </select>
                </div>
              )}

            <div className={styles.dateSelector}>
              {availableDates.map((d) => {
                const hasSlots =
                  doctorData?.available_times?.[d.fullDate] &&
                  Object.values(doctorData.available_times[d.fullDate]).some(
                    (slots) => slots.length > 0
                  );

                return (
                  <button
                    key={d.fullDate}
                    className={`${styles.dateButton} ${
                      selectedDate === d.fullDate ? styles.selectedDate : ""
                    }`}
                    onClick={() => setSelectedDate(d.fullDate)}
                    disabled={!hasSlots}
                  >
                    <span className={styles.day}>{d.day}</span>
                    <br />
                    <span className={styles.date}>
                      {d.date} {d.month}
                    </span>
                  </button>
                );
              })}
            </div>

            {selectedDate && doctorData?.available_times?.[selectedDate] ? (
              Object.entries(timeCategories).map(
                ([key, { label, start, end }]) => {
                  const slots = getFilteredSlots(
                    doctorData.available_times[selectedDate]?.[key] || [],
                    start,
                    end
                  );
                  return (
                    <div key={key} className={styles.timeSection}>
                      {slots.length > 0 && (
                        <>
                          <div className={styles.timeHeader}>
                            <span>{label}</span>
                            <span className={styles.slotCount}>
                              {
                                slots.filter(({ available }) => available)
                                  .length
                              }{" "}
                              Slots
                            </span>
                          </div>

                          <div className={styles.slotContainer}>
                            {slots.map(({ time, available }) => (
                              <button
                                key={time}
                                className={`${styles.slotButton} ${
                                  selectedTime === time
                                    ? styles.selectedTime
                                    : ""
                                } ${
                                  !available
                                    ? styles.greyedOut
                                    : styles.availableSlot
                                }`}
                                onClick={() =>
                                  available && setSelectedTime(time)
                                }
                                disabled={!available}
                              >
                                {convertTo12HourFormat(time)}
                              </button>
                            ))}
                          </div>
                        </>
                      )}
                    </div>
                  );
                }
              )
            ) : (
              <p className={styles.noSlotsMessage}>
                No available slots for this date.
              </p>
            )}

            <button className={styles.nextButton} disabled={!selectedTime}>
              Next
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default AppointmentPage;
