import style from "./page.module.css";
import React from "react";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <main className={style.container}>
        <section className={style.wrapper}>
          <div className={style.hero_text}>
            <h1>Health in Your Hands.</h1>
            <p>
              Take control of your healthcare with CareMate. Book appointments
              with ease, explore health blogs, and stay on top of your
              well-being, all in one place.
            </p>
            <button>Get Started</button>
          </div>
          <div className={style.hero_img}>
            <Image
              src="./landingpage.svg"
              alt="Img"
              width={1319}
              height={911}
              priority
            ></Image>
          </div>
        </section>
      </main>
    </>
  );
}
