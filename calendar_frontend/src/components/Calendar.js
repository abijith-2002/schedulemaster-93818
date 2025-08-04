import React, { useState } from "react";
import "./Calendar.css";

// PUBLIC_INTERFACE
function Calendar() {
  /**
   * Calendar widget (Figma inspired) with interactive month/year navigation.
   * Users can switch months and years using header arrows.
   */

  // Days of the week, matching Figma (note 'SAN' instead of 'SUN')
  const days = ["SAN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  // Month names
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  // Set the initial month/year to September 2021 (as in Figma)
  const initialMonth = 8; // September (0-indexed)
  const initialYear = 2021;

  // State management for shown month and year
  const [activeMonth, setActiveMonth] = useState(initialMonth);
  const [activeYear, setActiveYear] = useState(initialYear);

  // Date for "today" and for selected date (active highlight)
  const [selectedDay, setSelectedDay] = useState(
    activeMonth === 8 && activeYear === 2021 ? 19 : null
  );

  // Helper: Number of days in the given month/year
  function getDaysInMonth(month, year) {
    // JS Date: month is 0-indexed
    return new Date(year, month + 1, 0).getDate();
  }

  // Helper: Index of weekday for 1st of the month (0 - Sunday/SAN)
  function getMonthStartDay(month, year) {
    return new Date(year, month, 1).getDay();
  }

  // Generate 5-row (at least) calendar grid for activeMonth/activeYear
  function generateCalendarGrid(month, year) {
    const daysInMonth = getDaysInMonth(month, year);
    const startDay = getMonthStartDay(month, year);
    // Figma uses Sunday ("SAN") as first day; adjust to match (0)
    const rows = [];
    let week = [];
    let dayCounter = 1;

    // Pad first week with empty if month doesn't start on SAN/Sunday
    for (let i = 0; i < 7; i++) {
      if (i < startDay) {
        week.push("");
      } else {
        week.push(dayCounter++);
      }
    }
    rows.push(week);

    // Fill rest of the weeks
    while (dayCounter <= daysInMonth) {
      week = [];
      for (let i = 0; i < 7; i++) {
        if (dayCounter > daysInMonth) {
          week.push("");
        } else {
          week.push(dayCounter++);
        }
      }
      rows.push(week);
    }

    // Always return exactly 5 weeks for consistent Figma-style appearance
    while (rows.length < 5) {
      rows.push(Array(7).fill(""));
    }
    // If there's a 6th partial week
    if (rows.length > 5) rows.length = 5;

    return rows;
  }

  // Handlers for month navigation
  function gotoPrevMonth() {
    setSelectedDay(null); // Deselect day on navigation for clarity
    setActiveMonth((month) => {
      if (month === 0) {
        setActiveYear((year) => year - 1);
        return 11;
      }
      return month - 1;
    });
  }

  function gotoNextMonth() {
    setSelectedDay(null);
    setActiveMonth((month) => {
      if (month === 11) {
        setActiveYear((year) => year + 1);
        return 0;
      }
      return month + 1;
    });
  }

  // Create the actual calendar date grid
  const calendarGrid = generateCalendarGrid(activeMonth, activeYear);

  // Format title display
  const title = `${monthNames[activeMonth]} ${activeYear}`;

  return (
    <div className="calendar-widget">
      <div className="calendar-header">
        <button
          className="icon-arrow left"
          aria-label="Previous month"
          onClick={gotoPrevMonth}
        >
          <svg viewBox="0 0 16 16"><path d="M11 13L6 8l5-5" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round"/></svg>
        </button>
        <span className="calendar-title">{title}</span>
        <button
          className="icon-arrow right"
          aria-label="Next month"
          onClick={gotoNextMonth}
        >
          <svg viewBox="0 0 16 16"><path d="M5 3l5 5-5 5" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round"/></svg>
        </button>
      </div>
      <div className="calendar-days-row">
        {days.map((d, idx) => (
          <span className="calendar-day" key={idx}>{d}</span>
        ))}
      </div>
      <div className="calendar-dates">
        {calendarGrid.map((week, widx) => (
          <div className="calendar-week" key={widx}>
            {week.map((num, didx) => (
              <span
                className={`calendar-date${num === selectedDay && selectedDay !== null ? " active" : ""}`}
                key={didx}
                // Optionally, add onClick here for future date selection logic
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
