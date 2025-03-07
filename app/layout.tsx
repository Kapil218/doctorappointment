import "./globals.css";
import Footer from "@/components/footer/page";
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
  return (
    <html lang="en">
      <body className={montserrat.className}>
        <Header />
        <main className="main_layout">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
