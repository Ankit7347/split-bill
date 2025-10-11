"use client";

import { useEffect } from "react";

export default function GuestValidator() {
  useEffect(() => {
    const validateGuest = async () => {
      try {
        const guestId = localStorage.getItem("guestId");
        const guestName = localStorage.getItem("guestName");

        // If no guestId/name, nothing to validate
        if (!guestId || !guestName) return;

        // Hit backend API to validate token / guest
        const res = await fetch("/api/validate-guest", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ guestId, guestName }),
          credentials: "include", // to send cookies (next-auth session)
        });

        if (!res.ok) {
          // Invalid guest or token → do nothing (keep guest as-is)
          return;
        }

        const data = await res.json();
        console.log(data);
        
        // Use updateUser field from API response
        if (data?.updateUser) {
          // If updateUser is true, update localStorage with new guest/user info
          if (data?.user) {
            localStorage.setItem("guestId", data.user.uuid);
            localStorage.setItem("guestName", data.user.name);
          }
        }
      } catch (err) {
        console.error("Guest validation error:", err);
      }
    };

    validateGuest();
  }, []);

  return null; // invisible component
}
