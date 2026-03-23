
// ─── Store Configuration ──────────────────────────────────────────────────────
export const STORE_NAME = "General Provision Store";
export const STORE_TAGLINE = "Daily needs, fresh finds.";
export const STORE_ADDRESS = "Hosahalli 1st Cross Karsvadi road, Mandya, Karnataka 571401";
export const STORE_PHONE = "+91 87480 99875";

// Hours: null = closed all day
export const WEEKLY_HOURS: Record<number, { open: string; close: string } | null> = {
    0: { open: "06:45", close: "21:00" },                          // Sunday — closed
    1: { open: "06:45", close: "21:30" }, // Monday
    2: { open: "06:45", close: "21:30" }, // Tuesday
    3: { open: "06:45", close: "21:30" }, // Wednesday
    4: { open: "06:45", close: "21:30" }, // Thursday
    5: { open: "06:45", close: "21:30" }, // Friday
    6: { open: "06:45", close: "21:30" }, // Saturday
};

export const DAY_NAMES = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
