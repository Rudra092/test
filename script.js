document.addEventListener("DOMContentLoaded", () => {
  const VALID_DURATION = 24 * 60 * 1000; // 24 hour
  const now = Date.now();

  const fullPath = window.location.pathname + window.location.search;
  const storedData = JSON.parse(localStorage.getItem("validDynamicURLInfo"));

  const urlParams = new URLSearchParams(window.location.search);
  const hasId = urlParams.has("id");

  const isValidStoredURL =
    storedData &&
    now - storedData.timestamp <= VALID_DURATION &&
    !storedData.used &&
    storedData.url === fullPath;

  if (isValidStoredURL) {
    // ✅ Valid and unused — allow
    const output = document.getElementById("output");
    if (output) {
      output.innerHTML = `<p>This URL is active and usable ONCE within 1 minute: <strong>${fullPath}</strong></p>`;
    }

    // Mark as used
    storedData.used = true;
    localStorage.setItem("validDynamicURLInfo", JSON.stringify(storedData));
  } else if (hasId) {
    // ❌ Has ?id but it's invalid/expired/used
    document.body.innerHTML = "<h2>This URL has expired or is no longer active.</h2>";
  } else {
    // 🆕 First-time visit (no ?id) → generate new
    const newId = Math.floor(Math.random() * 100000);
    const newURL = `${window.location.pathname}?id=${newId}`;

    // Update URL
    window.history.replaceState({}, "", newURL);

    // Save as valid URL
    localStorage.setItem(
      "validDynamicURLInfo",
      JSON.stringify({
        url: window.location.pathname + `?id=${newId}`,
        timestamp: now,
        used: false,
      })
    );

    // Trigger logic again with new URL (safe reload)
    location.reload();
  }
});
