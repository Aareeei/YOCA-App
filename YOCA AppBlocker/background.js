console.log("Background script starting");

chrome.runtime.onInstalled.addListener(() => {
    console.log("YOCA Site Blocker installed!");
});

// Listen for blocked requests and redirect to blocked.html
try {
    if (chrome.declarativeNetRequest && chrome.declarativeNetRequest.onRuleMatchedDebug) {
        chrome.declarativeNetRequest.onRuleMatchedDebug.addListener((details) => {
            console.log("Blocked request detected:", details);
            if (details.request && details.request.tabId !== -1) {
                chrome.tabs.update(details.request.tabId, {
                    url: chrome.runtime.getURL("blocked.html")
                }, () => {
                    if (chrome.runtime.lastError) {
                        console.error("Error redirecting to blocked.html:", chrome.runtime.lastError);
                    } else {
                        console.log("Successfully redirected to blocked.html");
                    }
                });
            } else {
                console.warn("No valid tabId for blocked request:", details);
            }
        });
        console.log("onRuleMatchedDebug listener registered");
    } else {
        console.error("chrome.declarativeNetRequest.onRuleMatchedDebug is not available");
    }
} catch (error) {
    console.error("Error in background script:", error);
}