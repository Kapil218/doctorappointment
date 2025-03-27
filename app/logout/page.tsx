"use client"; // ✅ Client component

import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/v1/users/logout", {
        method: "POST",
        credentials: "include", // ✅ Ensure cookies are sent
      });

      if (!res.ok) throw new Error("Failed to log out");

      // ✅ Redirect to login page after logout
      router.push("/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return <button onClick={handleLogout}>Logout</button>;
}
