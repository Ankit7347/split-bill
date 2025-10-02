// utils/sendMail.js

export async function sendMail({ to, subject, message, emailType }) {
  try {
    const res = await fetch("/api/send-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ to, subject, message, emailType }),
    });

    const data = await res.json();

    if (!res.ok) {
      return {
        success: false,
        error: data?.error || "Failed to send email",
      };
    }

    return {
      success: true,
    };
  } catch (err) {
    console.error("sendMail error:", err);
    return {
      success: false,
      error:
        err instanceof Error
          ? err.message
          : "An unexpected error occurred while sending email.",
    };
  }
}
