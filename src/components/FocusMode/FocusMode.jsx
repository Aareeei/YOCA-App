import React, { useState, useEffect } from "react";

const FocusMode = () => {
  const [isFocusModeOn, setIsFocusModeOn] = useState(false);

  useEffect(() => {
    // Load initial focus mode status
    const status = localStorage.getItem("focusMode") === "true";
    setIsFocusModeOn(status);
  }, []);

  const toggleFocusMode = () => {
    const newStatus = !isFocusModeOn;
    setIsFocusModeOn(newStatus);
    localStorage.setItem("focusMode", newStatus.toString());

    // 🔁 Send message to extension (if it's listening)
    window.postMessage({ type: "FOCUS_MODE", enabled: newStatus }, "*");
  };

  return (
    <div className="bg-white p-4 mt-4 rounded shadow">
      <div className="text-sm flex flex-col items-start gap-2">
        <p className="text-gray-700">
          Focus Mode is <strong>{isFocusModeOn ? "ON" : "OFF"}</strong>
        </p>
        <button
          onClick={toggleFocusMode}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        >
          {isFocusModeOn ? "Turn Off Focus Mode" : "Turn On Focus Mode"}
        </button>
      </div>
    </div>
  );
};

export default FocusMode;