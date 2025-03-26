import DoctorCard from "../doctorCard/page";
import styles from "./doctorList.module.css";

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

const DoctorList = () => {
  return (
    <div className={styles.grid}>
      {doctors.map((doctor, index) => (
        <DoctorCard key={index} {...doctor} />
      ))}
    </div>
  );
};

export default DoctorList;
