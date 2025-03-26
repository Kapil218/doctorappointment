// app/details/components/Pagination.tsx
import styles from "./pagination.module.css";

const Pagination = () => {
  return (
    <div className={styles.pagination}>
      <button className={styles.button}>Prev</button>
      <span className={styles.pageNumbers}>
        <button className={styles.page}>1</button>
        <button className={`${styles.page} ${styles.active}`}>2</button>
        <button className={styles.page}>3</button>
        <span>...</span>
        <button className={styles.page}>24</button>
      </span>
      <button className={styles.button}>Next</button>
    </div>
  );
};

export default Pagination;
