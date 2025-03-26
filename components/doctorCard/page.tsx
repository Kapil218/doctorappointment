import React from "react";
import styles from "./doctorCard.module.css";

interface DoctorProps {
  name: string;
  specialty: string;
  experience: number;
  rating: number;
  image: string;
}

const DoctorCard: React.FC<DoctorProps> = ({
  name,
  specialty,
  experience,
  rating,
  image,
}) => {
  return (
    <div className={styles.card}>
      <img src={image} alt={name} className={styles.image} />
      <h3>{name}</h3>
      <p>
        {specialty} • {experience} Years
      </p>
      <p>Ratings: {rating} ⭐</p>
      <button className={styles.button}>Book Appointment</button>
    </div>
  );
};

export default DoctorCard;
