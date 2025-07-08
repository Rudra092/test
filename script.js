document.addEventListener("DOMContentLoaded", () => {
  const fullPath = window.location.pathname + window.location.search;
  const VALID_DURATION = 1 * 60 * 1000; // 1 minutes in milliseconds

  const storedData = JSON.parse(localStorage.getItem("validDynamicURLInfo"));

  const now = Date.now();

  if (storedData) {
    const { url, timestamp, used } = storedData;

    // If URL is expired or already used or different from current
    if (now - timestamp > VALID_DURATION || used || url !== fullPath) {
      document.body.innerHTML = "<h2>This URL has expired or is no longer active.</h2>";
      return;
    }

    // Mark as used (one-time only)
    localStorage.setItem(
      "validDynamicURLInfo",
      JSON.stringify({ url, timestamp, used: true })
    );
  } else {
    // First-time visitor — no query string? generate one
    if (!window.location.search) {
      const randomId = Math.floor(Math.random() * 100000);
      const newURL = `${window.location.pathname}?id=${randomId}`;
      window.history.replaceState({}, "", newURL);

      // Save the new URL and timestamp
      localStorage.setItem(
        "validDynamicURLInfo",
        JSON.stringify({
          url: window.location.pathname + "?id=" + randomId,
          timestamp: now,
          used: false,
        })
      );
    } else {
      // User loaded a random ID without going through the generator — block access
      document.body.innerHTML = "<h2>Invalid or expired access.</h2>";
      return;
    }
  }

  // ✅ Show valid message
  const output = document.getElementById("output");
  if (output) {
    output.innerHTML = `<p>This URL is active and usable ONCE within 5 minutes: <strong>${fullPath}</strong></p>`;
  }
});
