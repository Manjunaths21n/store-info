
// ─── Store Configuration ──────────────────────────────────────────────────────
export const STORE_NAME = "The Corner Store";
export const STORE_TAGLINE = "Fresh finds, every day.";
export const STORE_ADDRESS = "42 Maple Street, Downtown";
export const STORE_PHONE = "+1 (555) 012-3456";

// Hours: null = closed all day
export const WEEKLY_HOURS: Record<number, { open: string; close: string } | null> = {
    0: null,                          // Sunday — closed
    1: { open: "09:00", close: "21:00" }, // Monday
    2: { open: "09:00", close: "21:00" }, // Tuesday
    3: { open: "09:00", close: "21:00" }, // Wednesday
    4: { open: "09:00", close: "21:00" }, // Thursday
    5: { open: "09:00", close: "22:00" }, // Friday
    6: { open: "10:00", close: "22:00" }, // Saturday
};

export const DAY_NAMES = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
