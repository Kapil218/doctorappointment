"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import styles from "./doctorPage.module.css";

interface Doctor {
  id: string;
  name: string;
  specialty: string;
  experience: number;
  rating: string;
  degree: string;
  location: string;
  gender: string;
  image?: string;
  available_times?: Record<string, { morning?: string[]; evening?: string[] }>; // Date → Slots object
}

const DoctorProfile = () => {
  const { id } = useParams();
  const router = useRouter();
  const [doctor, setDoctor] = useState<Doctor | null>(null);

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        if (!id) return;
        const res = await fetch(`http://localhost:3000/api/v1/doctors/${id}`);
        const data = await res.json();
        setDoctor(data.data);
      } catch (error) {
        console.error("Error fetching doctor data:", error);
      }
    };

    fetchDoctor();
  }, [id]);

  const today = new Date();
  const todayDateString = today.toISOString().split("T")[0];

  // Properly format "YYYY-MM-DD" into "March 30, 2025"
  const formatDate = (dateString: string) => {
    if (!dateString) return "Invalid Date";

    const dateParts = dateString.split("-");
    if (dateParts.length !== 3) return "Invalid Date";

    const [year, month, day] = dateParts.map(Number);
    const dateObj = new Date(year, month - 1, day);

    return dateObj.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className={styles.pageContainer}>
      <header className={styles.header}>
        <button className={styles.backButton} onClick={() => router.back()}>
          ← Back to Doctors List
        </button>
      </header>

      <div className={styles.profileSection}>
        <div className={styles.leftColumn}>
          <img
            src={doctor?.image || "/defaultpic.jpg"}
            alt={doctor?.name}
            className={styles.profileImage}
          />
        </div>
        <div className={styles.rightColumn}>
          <h1>{doctor?.name}</h1>
          <p className={styles.specialty}>{doctor?.specialty}</p>
          <p><strong>Experience:</strong> {doctor?.experience} years</p>
          <p><strong>Degree:</strong> {doctor?.degree}</p>
          <p><strong>Location:</strong> {doctor?.location}</p>
          <p><strong>Gender:</strong> {doctor?.gender}</p>
          <p>
            <strong>Rating:</strong>{" "}
            {doctor?.rating && parseFloat(doctor.rating) > 0
              ? "⭐".repeat(Math.round(parseFloat(doctor.rating)))
              : "No ratings yet"}
          </p>
        </div>
      </div>

      {/* Available Slots Section */}
      <div className={styles.appointmentSection}>
  <h2>Available Appointment Slots</h2>
  {doctor?.available_times && Object.keys(doctor.available_times).length > 0 ? (
    Object.entries(doctor.available_times)
      .filter(([date]) => date >= todayDateString) // Remove past dates
      .map(([date, slots]) => {
        const allSlots = [...(slots.morning || []), ...(slots.evening || [])];

        return (
          <div key={date} className={styles.dateContainer}>
            <h3 className={styles.dateHeader}>{formatDate(date)}</h3>
            <div className={styles.slotContainer}>
              {allSlots.length > 0 ? (
                allSlots.map((time) => (
                  <span key={time} className={styles.slotPill}>
                    {time}
                  </span>
                ))
              ) : (
                <p className={styles.noSlots}>No slots available</p>
              )}
            </div>
          </div>
        );
      })
  ) : (
    <p className={styles.noSlots}>No available appointment slots</p>
  )}
</div>
<button
    className={styles.bookButton}
    onClick={() => router.push(`/schedule-appointment/${doctor?.id}`)}
  >
    Book Appointment
  </button>
    </div>
  );
};

export default DoctorProfile;
