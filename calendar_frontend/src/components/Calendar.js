import React from "react";
import "./Calendar.css";

// PUBLIC_INTERFACE
function Calendar() {
  /**
   * Calendar widget as per Figma spec (September 2021).
   * Modular structure, easy to extend for interactivity later.
   */
  // Days of the week
  const days = ["SAN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  // The provided month grid for September 2021 (31 days, active date: 19)
  const grid = [
    [1, 2, 3, 4, 5, 6, 7],
    [8, 9, 10, 11, 12, 13, 14],
    [15, 16, 17, 18, 19, 20, 21],
    [22, 23, 24, 25, 26, 27, 28],
    [29, 30, 31, "", "", "", ""],
  ];

  const activeDate = 19; // hardcoded based on Figma for this release

  return (
    <div className="calendar-widget">
      <div className="calendar-header">
        <button className="icon-arrow left" aria-label="Previous month">
          <svg viewBox="0 0 16 16"><path d="M11 13L6 8l5-5" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round"/></svg>
        </button>
        <span className="calendar-title">September 2021</span>
        <button className="icon-arrow right" aria-label="Next month">
          <svg viewBox="0 0 16 16"><path d="M5 3l5 5-5 5" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round"/></svg>
        </button>
      </div>
      <div className="calendar-days-row">
        {days.map((d, idx) => (
          <span className="calendar-day" key={idx}>{d}</span>
        ))}
      </div>
      <div className="calendar-dates">
        {grid.map((week, widx) => (
          <div className="calendar-week" key={widx}>
            {week.map((num, didx) => (
              <span
                className={`calendar-date${num === activeDate ? " active" : ""}`}
                key={didx}
              >
                {num}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Calendar;
