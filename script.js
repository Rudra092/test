document.addEventListener("DOMContentLoaded", () => {
  const VALID_DURATION = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
  const now = Date.now();

  const fullPath = window.location.pathname + window.location.search;
  const urlParams = new URLSearchParams(window.location.search);
  const hasId = urlParams.has("id");

  const storedData = JSON.parse(localStorage.getItem("validDynamicURLInfo"));

  // CASE 1: Visit with a previously generated ID (valid for 24h, multiple uses)
  if (hasId) {
    const storedURL = storedData?.url;
    const timestamp = storedData?.timestamp;

    const isSameURL = storedURL === fullPath;
    const notExpired = now - timestamp <= VALID_DURATION;

    if (isSameURL && notExpired) {
      const output = document.getElementById("output");
      if (output) {
        output.innerHTML = `<p>This URL is valid for 24 hours: <strong>${fullPath}</strong></p>`;
      }
      return;
    }

    // If expired or no match, show error
    document.body.innerHTML = "<h2>This URL has expired or is no longer active.</h2>";
    return;
  }

  // CASE 2: No ?id — generate a new one
  const newId = Math.floor(Math.random() * 100000);
  const newURL = `${window.location.pathname}?id=${newId}`;

  // Store and reload with new URL
  localStorage.setItem(
    "validDynamicURLInfo",
    JSON.stringify({
      url: newURL,
      timestamp: now,
    })
  );

  window.history.replaceState({}, "", newURL);
  location.reload();
});
