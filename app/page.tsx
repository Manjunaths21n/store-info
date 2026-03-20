"use client";

import { useEffect, useState } from "react";
import "./page.css";
import {
  getStatus, WEEKLY_HOURS, DAY_NAMES, STORE_NAME, STORE_TAGLINE,
  formatTime, STORE_ADDRESS, STORE_PHONE
} from "./_utils/index";

// ─── Component ────────────────────────────────────────────────────────────────
export default function Home() {
  const [status, setStatus] = useState(getStatus());
  const [tick, setTick] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const interval = setInterval(() => {
      setStatus(getStatus());
      setTick((t) => !t);
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  const now = new Date();
  const todayHours = WEEKLY_HOURS[now.getDay()];

  return (
    <>
      <div className="page">
        <main className="main">
          {/* Store Header */}
          <div className="store-header">
            <div className="store-icon">🏪</div>
            <h1 className="store-name">{STORE_NAME}</h1>
            <p className="store-tagline">{STORE_TAGLINE}</p>
          </div>

          {/* Status Card */}
          {mounted && (
            <div className="status-card">
              {status.isOpen ? (
                <>
                  <div className={`status-pill ${status.closingSoon ? "soon" : "open"}`}>
                    <span className={`dot ${status.closingSoon ? "soon" : "open"}`} />
                    {status.closingSoon ? "Closing Soon" : "Open Now"}
                  </div>
                  <div className={`status-headline ${status.closingSoon ? "soon" : "open"}`}>
                    {status.closingSoon ? "Closing\nSoon" : "We're\nOpen!"}
                  </div>
                  <p className="status-sub">
                    {status.closingSoon
                      ? <>Closes at <strong>{status.closesAt}</strong> — only <strong>{status.timeLeft}</strong> left.</>
                      : <>Come on in! We close at <strong>{status.closesAt}</strong> today.</>
                    }
                  </p>
                  <div className="divider" />
                  <div className="time-row">
                    <span className="time-label">Closes in</span>
                    <span className="time-value">{status.timeLeft}</span>
                  </div>
                </>
              ) : (
                <>
                  <div className="status-pill closed">
                    <span className="dot closed" />
                    Closed
                  </div>
                  <div className="status-headline closed">We're\nClosed.</div>
                  <p className="status-sub">
                    {status.opensToday
                      ? <>We open today at <strong>{status.opensToday}</strong>. See you soon!</>
                      : status.nextInfo
                        ? <>Next open <strong>{status.nextInfo.day}</strong> at <strong>{status.nextInfo.time}</strong>.</>
                        : <>Check back soon.</>
                    }
                  </p>
                  {status.opensToday && (
                    <>
                      <div className="divider" />
                      <div className="time-row">
                        <span className="time-label">Opens today at</span>
                        <span className="time-value">{status.opensToday}</span>
                      </div>
                    </>
                  )}
                </>
              )}
            </div>
          )}

          {/* Weekly Hours */}
          <div className="hours-card">
            <p className="section-title">Weekly Hours</p>
            {DAY_NAMES.map((day, i) => {
              const hours = WEEKLY_HOURS[i];
              const isToday = i === now.getDay();
              return (
                <div key={day} className={`hours-row ${isToday ? "today" : ""}`}>
                  <span className="day-name">{day}</span>
                  {hours
                    ? <span>{formatTime(hours.open)} – {formatTime(hours.close)}</span>
                    : <span className="closed-label">Closed</span>
                  }
                </div>
              );
            })}
          </div>

          {/* Contact Info */}
          <div>
            <div className="info-row"><span className="info-icon">📍</span>{STORE_ADDRESS}</div>
            <div className="info-row"><span className="info-icon">📞</span>{STORE_PHONE}</div>
          </div>
        </main>

        <footer>Updates every 30 seconds</footer>
      </div>
    </>
  );
}
