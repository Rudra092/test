document.addEventListener("DOMContentLoaded", () => {
  const VALID_DURATION = 24 * 60 * 60 * 1000; // 24 hours
  const now = Date.now();

  const urlParams = new URLSearchParams(window.location.search);
  const currentId = urlParams.get("id");
  const hasId = currentId !== null;

  const fullPath = window.location.pathname + (hasId ? `?id=${currentId}` : "");

  const storedData = JSON.parse(localStorage.getItem("validDynamicURLInfo"));

  // ✅ CASE 1: Has valid ID and stored, still within 24h
  if (hasId && storedData && storedData.url === fullPath) {
    const notExpired = now - storedData.timestamp <= VALID_DURATION;

    if (notExpired) {
      const output = document.getElementById("output");
      if (output) {
        output.innerHTML = `<p>This URL is active and valid for 24 hours: <strong>${fullPath}</strong></p>`;
      }
      return;
    }
  }

  // 🆕 CASE 2: ID is expired, or no ID — generate a new one
  const newId = Math.floor(Math.random() * 100000);
  const newURL = `${window.location.pathname}?id=${newId}`;

  // Store it
  localStorage.setItem(
    "validDynamicURLInfo",
    JSON.stringify({
      url: newURL,
      timestamp: now
    })
  );

  // Replace current URL and rerun script
  window.history.replaceState({}, "", newURL);

  const output = document.getElementById("output");
  if (output) {
    output.innerHTML = `<p>New URL generated (valid for 24 hours): <strong>${newURL}</strong></p>`;
  }
});
