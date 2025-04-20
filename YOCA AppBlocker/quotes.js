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

// Function to get a random quote
function getRandomQuote() {
    return quotes[Math.floor(Math.random() * quotes.length)];
}