import styles from "./filterSidebar.module.css";

const Sidebar = () => {
  return (
    <div className={styles.sidebar}>
      <h3>Filter By:</h3>

      <div className={styles.filterSection}>
        <h4 className={styles.title}>Rating</h4>
        <label className={styles.filterLabel}>
          <input type="radio" name="rating" /> Show all
        </label>
        <label className={styles.filterLabel}>
          <input type="radio" name="rating" /> 1 star
        </label>
        <label className={styles.filterLabel}>
          <input type="radio" name="rating" /> 2 star
        </label>
        <label className={styles.filterLabel}>
          <input type="radio" name="rating" /> 3 star
        </label>
        <label className={styles.filterLabel}>
          <input type="radio" name="rating" /> 4 star
        </label>
        <label className={styles.filterLabel}>
          <input type="radio" name="rating" /> 5 star
        </label>
      </div>

      <div className={styles.filterSection}>
        <h4 className={styles.title}>Experience</h4>
        <label className={styles.filterLabel}>
          <input type="radio" name="experience" /> 15+ years
        </label>
        <label className={styles.filterLabel}>
          <input type="radio" name="experience" /> 10-15 years
        </label>
        <label className={styles.filterLabel}>
          <input type="radio" name="experience" /> 5-10 years
        </label>
        <label className={styles.filterLabel}>
          <input type="radio" name="experience" /> 3-5 years
        </label>
        <label className={styles.filterLabel}>
          <input type="radio" name="experience" /> 1-3 years
        </label>
        <label className={styles.filterLabel}>
          <input type="radio" name="experience" /> 0-1 years
        </label>
      </div>

      <div className={styles.filterSection}>
        <h4 className={styles.title}>Gender</h4>
        <label className={styles.filterLabel}>
          <input type="radio" name="gender" /> Show all
        </label>
        <label className={styles.filterLabel}>
          <input type="radio" name="gender" /> Male
        </label>
        <label className={styles.filterLabel}>
          <input type="radio" name="gender" /> Female
        </label>
      </div>
    </div>
  );
};

export default Sidebar;
