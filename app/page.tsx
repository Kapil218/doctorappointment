import style from "./page.module.css";
import React from "react";
import Image from "next/image";
import Link from "next/link"; // ✅ Use Link instead of useRouter

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
            {/* ✅ Use Link to navigate without client-side code */}
            <Link href="/appointments">
              <button>Get Started</button>
            </Link>
          </div>
          <div className={style.hero_img}>
            <Image
              src="/landingpage.svg" // ✅ Use absolute path for public images
              alt="Img"
              width={1319}
              height={911}
              priority
            />
          </div>
        </section>
      </main>
    </>
  );
}
