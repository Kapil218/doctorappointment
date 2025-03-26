import DoctorList from "../doctorCard/page";
import Pagination from "../pagination/page";
import styles from "./appointmentList.module.css";

export default function AppointmentDoctorList() {
  return (
    <div className={styles.container}>
      <div className={styles.grid}>
        <DoctorList />
      </div>
      <div className={styles.pagination}>
        <Pagination />
      </div>
    </div>
  );
}
