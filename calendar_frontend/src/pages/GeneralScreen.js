import React from "react";
import Calendar from "../components/Calendar";
import "./GeneralScreen.css";

// PUBLIC_INTERFACE
function GeneralScreen() {
  /**
   * The 'General' Figma page wrapper - centers the calendar in a main card as per design.
   */
  return (
    <div className="screen-general">
      <div className="main-card">
        <Calendar />
      </div>
    </div>
  );
}

export default GeneralScreen;
