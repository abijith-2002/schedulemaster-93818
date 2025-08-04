import React from 'react';
import GeneralScreen from './pages/GeneralScreen';
import './App.css';

// PUBLIC_INTERFACE
function App() {
  /**
   * App entrypoint - renders the screen for the Figma 'General' layout with the Calendar widget centered.
   */
  return (
    <div className="App">
      <GeneralScreen />
    </div>
  );
}

export default App;
