"use client";

import "./globals.css";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Header from "@/components/header/page";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const [showPage, setShowPage] = useState(false);
  const [currentChildren, setCurrentChildren] = useState(children);

  useEffect(() => {
    setShowPage(false); // Hide new page
    const timeout = setTimeout(() => {
      setCurrentChildren(children); // Set new page content AFTER animation
      setShowPage(true); // Show the new page smoothly
    }, 500); // Duration matches CSS animation

    return () => clearTimeout(timeout);
  }, [pathname, children]);

  return (
    <html lang="en">
      <body className={montserrat.className}>
        <Header />
        <main className="main_layout">
          {!showPage && <div className="loading-overlay" />}{" "}
          {/* 🔹 Loading overlay */}
          {showPage && <div className="fade-in">{currentChildren}</div>}
        </main>
      </body>
    </html>
  );
}
