"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import styles from "./doctorPage.module.css";

interface Doctor {
  id: string;
  name: string;
  specialty: string;
  experience: number;
  rating: number;
  degree: string;
  location: string;
  gender: string;
  image?: string;
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
        const result: Doctor = data.data;
        setDoctor(result);
      } catch (error) {
        console.error("Error fetching doctor data:", error);
      }
    };

    fetchDoctor();
  }, [id]);

  if (!doctor) {
    return <p className={styles.loading}>Loading...</p>;
  }

  return (
    <div className={styles.profileContainer}>
      <img
        src={doctor.image || "/defaultpic.jpg"}
        alt={doctor.name}
        className={styles.profileImage}
      />
      <h1 className={styles.profileName}>{doctor.name}</h1>
      <p className={styles.profileSpecialty}>{doctor.specialty}</p>
      <p className={styles.profileText}>
        <strong>Experience:</strong> {doctor.experience} years
      </p>
      <p className={styles.profileText}>
        <strong>Degree:</strong> {doctor.degree}
      </p>
      <p className={styles.profileText}>
        <strong>Location:</strong> {doctor.location}
      </p>
      <p className={styles.profileText}>
        <strong>Gender:</strong> {doctor.gender}
      </p>
      <p className={styles.profileText}>
        <strong>Rating:</strong>{" "}
        {doctor.rating > 0
          ? "⭐".repeat(Math.round(doctor.rating))
          : "No ratings yet"}
      </p>

      <button
        className={styles.bookButton}
        onClick={() =>
          router.push(
            `http://localhost:3001/doctors/${doctor.id}/bookAppointment`
          )
        }
      >
        Book Appointment
      </button>
    </div>
  );
};

export default DoctorProfile;
