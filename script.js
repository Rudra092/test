document.addEventListener("DOMContentLoaded", () => {
  const VALID_DURATION = 1 * 60 * 1000; // 1 minutes in milliseconds
  const now = Date.now();

  const fullPath = window.location.pathname + window.location.search;
  const storedData = JSON.parse(localStorage.getItem("validDynamicURLInfo"));

  const isValidStoredURL =
    storedData &&
    now - storedData.timestamp <= VALID_DURATION &&
    !storedData.used &&
    storedData.url === fullPath;

  if (isValidStoredURL) {
    // ✅ Valid and unused — allow
    const output = document.getElementById("output");
    if (output) {
      output.innerHTML = `<p>This URL is active and usable ONCE within 5 minutes: <strong>${fullPath}</strong></p>`;
    }

    // Mark as used
    storedData.used = true;
    localStorage.setItem("validDynamicURLInfo", JSON.stringify(storedData));
  } else {
    // ❌ Invalid or expired — generate new URL
    const newId = Math.floor(Math.random() * 100000);
    const newURL = `${window.location.pathname}?id=${newId}`;

    // Update browser URL without reloading
    window.history.replaceState({}, "", newURL);

    // Store the new valid URL
    localStorage.setItem(
      "validDynamicURLInfo",
      JSON.stringify({
        url: window.location.pathname + `?id=${newId}`,
        timestamp: now,
        used: false,
      })
    );

    // Refresh the page with new state
    location.reload(); // 💡 Important to trigger logic again
  }
});
