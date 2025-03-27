import { cookies } from "next/headers"; // ✅ Get cookies on the server
import styles from "./reviews.module.css";
import React from "react";

type Review = {
  id: number;
  patient_id: number;
  doctor_id: number;
  rating: number;
  review: string;
  created_at: string;
  appointment_id: number;
};

async function getReviews(): Promise<Review[]> {
  const cookieStore = await cookies(); // ✅ Get cookies from Next.js server
  const cookieHeader = cookieStore.toString();

  const res = await fetch("http://localhost:3000/api/v1/reviews", {
    cache: "no-store",
    headers: {
      Cookie: cookieHeader, // ✅ Manually send cookies
    },
  });
  const result = await res.json();

  if (!res.ok) {
    throw new Error("Failed to fetch reviews");
  }

  return result.data;
}

export default async function ReviewsPage() {
  const reviews = await getReviews();

  return (
    <main className={styles.container}>
      <h1 className={styles.headerText}>Patient Reviews</h1>
      <section className={styles.reviewsList}>
        {reviews.map((review) => (
          <div key={review.id} className={styles.reviewCard}>
            <div className={styles.header}>
              <h3>Doctor ID: {review.doctor_id}</h3>
              <span className={styles.rating}>⭐ {review.rating}/5</span>
            </div>
            <p className={styles.comment}>"{review.review}"</p>
            <p className={styles.date}>
              Reviewed on {new Date(review.created_at).toLocaleDateString()}
            </p>
          </div>
        ))}
      </section>
    </main>
  );
}
