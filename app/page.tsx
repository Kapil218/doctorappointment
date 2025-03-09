import style from "./page.module.css";
import React from "react";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <main className={style.container}>
        <section className={style.wrapper}>
          <div className={style.hero_text}>
            <h1 className={style.heading}>Welcome to MedCare</h1>
            <p className={style.para}>dhkabdksabhkdbsakhdbkh</p>
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
