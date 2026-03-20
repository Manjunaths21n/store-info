import { WEEKLY_HOURS, DAY_NAMES } from './constants';

// ─── Helpers ──────────────────────────────────────────────────────────────────
export function toMinutes(time: string) {
    const [h, m] = time.split(":").map(Number);
    return h * 60 + m;
}

export function formatTime(time: string) {
    const [h, m] = time.split(":").map(Number);
    const period = h >= 12 ? "PM" : "AM";
    const hour = h % 12 || 12;
    return `${hour}:${m.toString().padStart(2, "0")} ${period}`;
}

export function getStatus() {
    const now = new Date();
    const day = now.getDay();
    const currentMinutes = now.getHours() * 60 + now.getMinutes();
    const todayHours = WEEKLY_HOURS[day];

    if (!todayHours) return { isOpen: false, nextInfo: getNextOpenDay(day) };

    const openMin = toMinutes(todayHours.open);
    const closeMin = toMinutes(todayHours.close);

    if (currentMinutes >= openMin && currentMinutes < closeMin) {
        const minsLeft = closeMin - currentMinutes;
        const hoursLeft = Math.floor(minsLeft / 60);
        const minsRemain = minsLeft % 60;
        const closingSoon = minsLeft <= 60;
        return {
            isOpen: true,
            closesAt: formatTime(todayHours.close),
            timeLeft: hoursLeft > 0 ? `${hoursLeft}h ${minsRemain}m` : `${minsRemain}m`,
            closingSoon,
            nextInfo: null,
        };
    }

    if (currentMinutes < openMin) {
        return {
            isOpen: false,
            opensToday: formatTime(todayHours.open),
            nextInfo: null,
        };
    }

    return { isOpen: false, nextInfo: getNextOpenDay(day) };
}

export function getNextOpenDay(fromDay: number) {
    for (let i = 1; i <= 7; i++) {
        const nextDay = (fromDay + i) % 7;
        if (WEEKLY_HOURS[nextDay]) {
            return {
                day: DAY_NAMES[nextDay],
                time: formatTime(WEEKLY_HOURS[nextDay]!.open),
            };
        }
    }
    return null;
}