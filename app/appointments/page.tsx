"use client";

import { useState, useEffect } from "react";
import styles from "./appointments.module.css"; // Ensure CSS is in the same directory
import { useRouter } from "next/navigation";

interface Doctor {
  id: string;
  name: string;
  degree: string;
  specialty: string;
  experience: number;
  rating: number; // Changed from string to number
  image?: string;
}

const DoctorsPage = () => {
  const router = useRouter();
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [filters, setFilters] = useState({
    rating: "",
    experience: "",
    gender: "",
  });
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchDoctors = async () => {
      const params = new URLSearchParams();

      if (query.trim() !== "") params.append("query", query);
      if (filters.rating) params.append("rating", filters.rating);
      if (filters.experience) params.append("experience", filters.experience);
      if (filters.gender) params.append("gender", filters.gender);

      params.append("page", page.toString());
      params.append("perPage", "6");

      const res = await fetch(`http://localhost:3000/api/v1/doctors?${params}`);
      const data = await res.json();

      console.log("sachin", data);
      if (data.statusCode === 200) {
        console.log("kapil", data);
        setDoctors(data.data.doctors);
        setTotalPages(data.data.pagination.totalPages);
      }
    };

    fetchDoctors();
  }, [query, JSON.stringify(filters), page]);

  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setPage(1); // Reset pagination when filters change
  };

  return (
    <div className={styles.container}>
      {/* Search Bar */}
      <div className={styles.searchBar}>
        <input
          type="text"
          placeholder="Search doctors"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button>Search</button>
      </div>

      {/* Header */}
      <h2 className={styles.header}>{doctors.length} doctors available</h2>
      <p className={styles.subHeader}>
        Book appointments with minimum wait-time & verified doctor details
      </p>

      <div className={styles.content}>
        {/* Sidebar Filters */}
        <aside className={styles.sidebar}>
          <h3>Filter By:</h3>
          <button
            onClick={() =>
              setFilters({ rating: "", experience: "", gender: "" })
            }
          >
            Reset
          </button>

          <div>
            <h4>Rating</h4>
            {["", "1", "2", "3", "4", "5"].map((r) => (
              <label key={r}>
                <input
                  type="radio"
                  name="rating"
                  value={r}
                  checked={filters.rating === r}
                  onChange={() => handleFilterChange("rating", r)}
                />
                {r ? `${r} star` : "Show all"}
              </label>
            ))}
          </div>

          <div>
            <h4>Experience</h4>
            {["", "15", "10-15", "5-10", "3-5", "1-3", "0-1"].map((exp) => (
              <label key={exp}>
                <input
                  type="radio"
                  name="experience"
                  value={exp}
                  checked={filters.experience === exp}
                  onChange={() => handleFilterChange("experience", exp)}
                />
                {exp ? `${exp} years` : "Show all"}
              </label>
            ))}
          </div>

          <div>
            <h4>Gender</h4>
            {["", "Male", "Female"].map((g) => (
              <label key={g}>
                <input
                  type="radio"
                  name="gender"
                  value={g}
                  checked={filters.gender === g}
                  onChange={() => handleFilterChange("gender", g)}
                />
                {g || "Show all"}
              </label>
            ))}
          </div>
        </aside>

        {/* Doctor Cards */}
        <section className={styles.doctorsGrid}>
          {doctors.map((doctor) => (
            <div key={doctor.id} className={styles.card}>
              <img src={doctor.image || "/defaultpic.jpg"} alt={doctor.name} />
              <h3>
                {doctor.name}, {doctor.degree}
              </h3>
              <p>
                🦷 {doctor.specialty} · {doctor.experience} Years
              </p>
              <p>Ratings: {"⭐".repeat(doctor.rating)}</p>
              <button
                onClick={() =>
                  router.push(`/doctors/${doctor.id}/bookAppointment`)
                }
              >
                Book Appointment
              </button>
            </div>
          ))}
        </section>
      </div>

      {/* Pagination */}
      <div className={styles.pagination}>
        <button
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page === 1}
        >
          &lt; Prev
        </button>
        {[...Array(totalPages)].slice(0, 5).map((_, index) => (
          <button
            key={index + 1}
            onClick={() => setPage(index + 1)}
            className={page === index + 1 ? styles.active : ""}
          >
            {index + 1}
          </button>
        ))}
        {totalPages > 5 && <span>...</span>}
        <button
          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          disabled={page === totalPages}
        >
          Next &gt;
        </button>
      </div>
    </div>
  );
};

export default DoctorsPage;
