import styles from "./doctorCard.module.css";

interface DoctorProps {
  name?: string;
  specialty?: string;
  experience?: number;
  rating?: number;
  image?: string;
}

const DoctorCard = ({
  name = "Unknown Doctor",
  specialty = "Specialty Not Available",
  experience = 0,
  rating = 0,
  image = "/default-doctor.jpg",
}: DoctorProps) => {
  return (
    <div className={styles.card}>
      <img src={image} alt={name} className={styles.image} />
      <h3>{name}</h3>
      <p>
        {specialty} • {experience} Years
      </p>
      <p>Ratings: {"⭐".repeat(rating)}</p>
      <button className={styles.button}>Book Appointment</button>
    </div>
  );
};

export default DoctorCard;
