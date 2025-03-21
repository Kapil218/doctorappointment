import style from "./schedule-appointment.module.css";
import React from "react";

import Footer from "@/components/footer/page";

export default function Home() {
  return (
    <>
      <main className={style.container}>
        <section className={style.wrapper}>
          <div className={style.hero_text}>
            <h1>Book Your Next Doctor Visit in Seconds.</h1>
            <p>
              CareMate helps you find the best healthcare provider by specialty,
              location, and more, ensuring you get the care you need.
            </p>
          </div>
          <div className={style.hero_img}>
            {/* <Image
              src="./Mask group.svg"
              alt="Img"
              width={1319}
              height={911}
              priority
            ></Image> */}
          </div>
        </section>
        <Footer />
      </main>
    </>
  );
}
