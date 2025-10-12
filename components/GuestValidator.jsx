"use client";

import { useEffect } from "react";
import { useSession } from "next-auth/react";

export default function GuestValidator() {
  const { data: session, status } = useSession();

  useEffect(() => {
    const validateGuest = async () => {
      try {
        const guestId = localStorage.getItem("guestId");
        const guestName = localStorage.getItem("guestName");

        // If no guestId/name, nothing to validate yet
        if (!guestId || !guestName) {
          // but if we have a session, use that
          if (status === "authenticated" && session?.user) {
            localStorage.setItem("guestId", session.user.id);
            localStorage.setItem("guestName", session.user.name || "User");
          }
          return;
        }

        // Validate guest on backend
        const res = await fetch("/api/validate-guest", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ guestId, guestName }),
          credentials: "include",
        });

        // If validation failed → fall back to session
        if (!res.ok) {
          if (status === "authenticated" && session?.user) {
            localStorage.setItem("guestId", session.user.id);
            localStorage.setItem("guestName", session.user.name || "User");
            console.log("Guest invalid → replaced with session user.");
          } else {
            console.warn("Guest invalid and no session user available.");
          }
          return;
        }

        const data = await res.json();

        // If backend says to update guest info
        if (data?.updateUser && data?.user) {
          localStorage.setItem("guestId", data.user.uuid);
          localStorage.setItem("guestName", data.user.name);
          console.log("Guest info updated from backend response.");
        }
      } catch (err) {
        console.error("Guest validation error:", err);
      }
    };

    validateGuest();
  }, [session, status]);

  return null; // invisible component
}
