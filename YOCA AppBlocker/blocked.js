

chrome.storage.local.get(["focusMode"], function (result) {
    if (result.focusMode) {
      // Start blocking or run face detection
      console.log("Focus Mode is ON - activating AppBlocker...");
      // ... your logic here
    } else {
      console.log("Focus Mode is OFF - no action taken.");
    }
  });