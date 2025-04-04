"use client";
import "./globals.css";
import Header from "@/components/header/page";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={montserrat.className}>
        <Header isLoggedIn={false} />
        <main className="main_layout">{children}</main>
      </body>
    </html>
  );
}
