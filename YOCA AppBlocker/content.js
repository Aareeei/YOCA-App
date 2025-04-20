console.log("Auto-break script running");

// Load quotes (for break reminders)
const quotes = [
    "Stay focused! The harder you work, the luckier you get. – Gary Player",
    "Success is the sum of small efforts, repeated day in and day out. – Robert Collier",
    "You don’t have to be great to start, but you have to start to be great. – Zig Ziglar",
    "The secret of getting ahead is getting started. – Mark Twain",
    "Focus on the journey, not the destination. – Greg Anderson",
    "Productivity is never an accident. It’s the result of commitment to excellence. – Paul J. Meyer",
    "Don’t watch the clock; do what it does. Keep going. – Sam Levenson",
    "The future depends on what you do today. – Mahatma Gandhi"
];

function getRandomQuote() {
    return quotes[Math.floor(Math.random() * quotes.length)];
}

// ⏰ Auto Break Reminder System
let sessionStartTime = Date.now();
const BREAK_INTERVAL_MINUTES = 1;

function checkForBreakReminder() {
    const now = Date.now();
    const elapsedMinutes = (now - sessionStartTime) / (1000 * 60);
    if (elapsedMinutes >= BREAK_INTERVAL_MINUTES) {
        console.log("Triggering break reminder after", elapsedMinutes, "minutes");
        showBreakBanner("Take a 2-minute break!");
        sessionStartTime = now; // reset timer after showing reminder
    }
}

// ⏳ Inactivity Detection System
let lastActivityTime = Date.now();
const INACTIVITY_THRESHOLD_MINUTES = 1.5;
let inactivityTimeout;

function resetInactivityTimer() {
    lastActivityTime = Date.now();
    clearTimeout(inactivityTimeout);
    inactivityTimeout = setTimeout(checkForInactivity, INACTIVITY_THRESHOLD_MINUTES * 60 * 1000);
}

function checkForInactivity() {
    const now = Date.now();
    const inactiveMinutes = (now - lastActivityTime) / (1000 * 60);
    if (inactiveMinutes >= INACTIVITY_THRESHOLD_MINUTES) {
        console.log("User has been inactive for", inactiveMinutes, "minutes");
        showInactivityBanner();
    }
}

function showInactivityBanner() {
    console.log("Showing inactivity banner");
    const banner = document.createElement("div");
    banner.textContent = "You've been inactive for 2 minutes! Stay focused or take a break.";
    Object.assign(banner.style, {
        position: "fixed",
        top: "0",
        left: "0",
        width: "100%",
        backgroundColor: "#ff4444",
        color: "#fff",
        fontWeight: "bold",
        textAlign: "center",
        padding: "15px",
        fontSize: "16px",
        zIndex: 9999
    });
    document.body.appendChild(banner);

    setTimeout(() => {
        console.log("Removing inactivity banner");
        banner.remove();
    }, 15000); // remove after 15 seconds

    // Reset the inactivity timer after showing the banner
    resetInactivityTimer();
}

// Show banner for breaks (auto-break or focus session)
function showBreakBanner(message) {
    console.log("Showing break banner");
    const banner = document.createElement("div");
    const quote = getRandomQuote();
    banner.innerHTML = `
        <div>${message}</div>
        <div style="font-style: italic; margin-top: 10px;">${quote}</div>
    `;
    Object.assign(banner.style, {
        position: "fixed",
        top: "0",
        left: "0",
        width: "100%",
        backgroundColor: "#ffa500",
        color: "#000",
        fontWeight: "bold",
        textAlign: "center",
        padding: "15px",
        fontSize: "16px",
        zIndex: 9999
    });
    document.body.appendChild(banner);

    setTimeout(() => {
        console.log("Removing break banner");
        banner.remove();
    }, 15000); // remove after 15 seconds
}

// ⏲️ Check every minute for break reminder
setInterval(checkForBreakReminder, 60 * 1000);

// Listen for focus session end to show a break banner
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "focusSessionEnded") {
        showBreakBanner("Focus session complete! Take a 5-minute break.");
    }
});

// Set up event listeners for user activity
document.addEventListener("mousemove", resetInactivityTimer);
document.addEventListener("keydown", resetInactivityTimer);

// Start the inactivity timer
resetInactivityTimer();


// ========== 🆕 Task Timer UI + Logic ==========

function createTaskTimerUI() {
    const container = document.createElement("div");
    container.id = "task-timer-ui";
    container.innerHTML = `
    <div style="
        position: fixed; bottom: 80px; right: 20px; z-index: 9999;
        background: linear-gradient(145deg, #e0ffe0, #ffffff); 
        border: 2px solid #28a745; 
        padding: 15px;
        border-radius: 12px; 
        width: 270px; 
        box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
        font-family: Arial, sans-serif;
        display: none;
    ">
        <h4 style="margin-top: 0; color: #155724;">⏱️ Start a Task</h4>
        <label for="taskNameInput">📝 Task:</label><br/>
        <input type="text" id="taskNameInput" style="width: 100%; margin-top: 5px; padding: 5px; border: 1px solid #ccc; border-radius: 4px;" placeholder="e.g. Write report"/><br/><br/>
        <label for="taskDurationSelect">⏳ Duration:</label><br/>
        <select id="taskDurationSelect" style="width: 100%; margin-top: 5px; padding: 5px; border-radius: 4px;">
            <option value="1">1 min</option>
            <option value="5">5 min</option>
            <option value="10">10 min</option>
            <option value="15">15 min</option>
            <option value="20">20 min</option>
            <option value="30">30 min</option>
            <option value="45">45 min</option>
            <option value="60">60 min</option>
        </select><br/><br/>
        <button id="startTaskBtn" style="background-color:#28a745; color:white; border:none; padding:8px 10px; border-radius:5px; cursor:pointer; width: 100%;">🚀 Start</button>
    </div>
`;

    document.body.appendChild(container);

    // Toggle UI
    const toggleButton = document.createElement("button");
    toggleButton.textContent = "Start Task";
    Object.assign(toggleButton.style, {
        position: "fixed",
        bottom: "20px",
        right: "20px",
        zIndex: 9999,
        padding: "10px 15px",
        backgroundColor: "#28a745",
        color: "#fff",
        border: "none",
        borderRadius: "5px",
        fontSize: "14px",
        cursor: "pointer"
    });

    toggleButton.addEventListener("click", () => {
        const box = document.querySelector("#task-timer-ui > div");
        box.style.display = box.style.display === "none" ? "block" : "none";
    });

    document.body.appendChild(toggleButton);

    // Start task
    document.getElementById("startTaskBtn").addEventListener("click", () => {
        const taskName = document.getElementById("taskNameInput").value.trim();
        const minutes = parseInt(document.getElementById("taskDurationSelect").value);

        if (!taskName) return alert("Please enter a task name.");

        const task = {
            name: taskName,
            duration: minutes,
            startTime: new Date().toISOString()
        };

        alert(`Timer started for "${taskName}" (${minutes} min).`);

        setTimeout(() => {
            notifyTaskDone(task);
        }, minutes * 60 * 1000);

        // Hide UI after start
        document.querySelector("#task-timer-ui > div").style.display = "none";
        document.getElementById("taskNameInput").value = "";
    });
}

function notifyTaskDone(task) {
    const banner = document.createElement("div");
    banner.innerHTML = `
        <div>⏱️ Task timer complete for "<strong>${task.name}</strong>"</div>
        <div style="margin-top: 10px;">Did you complete the task?</div>
        <button style="margin: 10px 5px; padding: 5px 10px;" id="taskYesBtn">Yes</button>
        <button style="margin: 10px 5px; padding: 5px 10px;" id="taskNoBtn">No</button>
    `;
    Object.assign(banner.style, {
        position: "fixed",
        top: "0",
        left: "0",
        width: "100%",
        backgroundColor: "#007bff",
        color: "#fff",
        textAlign: "center",
        padding: "20px",
        fontSize: "16px",
        zIndex: 9999
    });
    document.body.appendChild(banner);

    document.getElementById("taskYesBtn").onclick = () => {
        task.completed = true;
        task.endTime = new Date().toISOString();
        saveTaskToLocalStorage(task);
        banner.remove();
    };

    document.getElementById("taskNoBtn").onclick = () => {
        task.completed = false;
        task.endTime = new Date().toISOString();
        saveTaskToLocalStorage(task);
        banner.remove();
    };
}

function saveTaskToLocalStorage(task) {
    const tasks = JSON.parse(localStorage.getItem("taskHistory") || "[]");
    tasks.push(task);
    localStorage.setItem("taskHistory", JSON.stringify(tasks));
    console.log("Task saved:", task);
}

window.addEventListener("load", createTaskTimerUI);



function createTaskSummaryUI() {
    const summaryBtn = document.createElement("button");
    summaryBtn.textContent = "View Tasks";
    Object.assign(summaryBtn.style, {
        position: "fixed",
        bottom: "60px",
        right: "20px",
        zIndex: 9999,
        padding: "10px 15px",
        backgroundColor: "#007bff",
        color: "#fff",
        border: "none",
        borderRadius: "8px",
        fontSize: "14px",
        fontWeight: "bold",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.15)",
        cursor: "pointer"
    });
    

    summaryBtn.addEventListener("click", () => {
        showTaskSummaryPopup();
    });

    document.body.appendChild(summaryBtn);
}

function showTaskSummaryPopup() {
    const tasks = JSON.parse(localStorage.getItem("taskHistory") || "[]");
    const completedTasks = tasks.filter(t => t.completed === true);
    const incompleteTasks = tasks.filter(t => t.completed === false);

    const overlay = document.createElement("div");
    Object.assign(overlay.style, {
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(0,0,0,0.6)",
        zIndex: 10000,
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    });

    const popup = document.createElement("div");
    Object.assign(popup.style, {
        backgroundColor: "#f9f9f9",
        padding: "20px",
        borderRadius: "12px",
        maxWidth: "90%",
        maxHeight: "80%",
        overflowY: "auto",
        width: "520px",
        boxShadow: "0 6px 15px rgba(0,0,0,0.25)",
        fontFamily: "Segoe UI, sans-serif",
        color: "#333",
        // <h3 style="margin-top:0; color: #007bff;">📊 Task Summary</h3> // ← This line shouldn't be here
    });
    
    

    popup.innerHTML = `
        <h3 style="margin-top:0;">📊 Task Summary</h3>
        <p><strong>Total Tasks:</strong> ${tasks.length}</p>
        <p><strong>✅ Completed:</strong> ${completedTasks.length}</p>
        <p><strong>❌ Incomplete:</strong> ${incompleteTasks.length}</p>
        <hr/>
        <ul style="padding-left: 15px;">
            ${tasks.map(t => `
                <li style="margin-bottom: 10px;">
                    <strong>${t.name}</strong> - ${t.duration} min
                    <br/><small>Status: ${t.completed ? "✅ Completed" : "❌ Incomplete"}</small>
                    <br/><small>Start: ${new Date(t.startTime).toLocaleString()}</small>
                    ${t.endTime ? `<br/><small>End: ${new Date(t.endTime).toLocaleString()}</small>` : ""}
                </li>
            `).join("")}
        </ul>
        <button id="closeSummaryBtn" style="margin-top:15px; padding: 5px 10px;">Close</button>
    `;

    overlay.appendChild(popup);
    document.body.appendChild(overlay);

    document.getElementById("closeSummaryBtn").onclick = () => overlay.remove();
}
window.addEventListener("load", () => {
    createTaskTimerUI();
    createTaskSummaryUI();
});

