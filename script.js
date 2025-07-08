document.addEventListener("DOMContentLoaded", () => {
  const VALID_DURATION = 24 * 60 * 60 * 1000; // 24 hours
  const now = Date.now();

  const urlParams = new URLSearchParams(window.location.search);
  const hasId = urlParams.has("id");

  const currentId = urlParams.get("id");
  const fullPath = window.location.pathname + `?id=${currentId}`;

  // Retrieve stored record
  const storedData = JSON.parse(localStorage.getItem("validDynamicURLInfo"));

  // CASE 1: ?id present, check if it's still valid
  if (hasId) {
    if (storedData && storedData.url === fullPath) {
      const notExpired = now - storedData.timestamp <= VALID_DURATION;

      if (notExpired) {
        const output = document.getElementById("output");
        if (output) {
          output.innerHTML = `<p>This URL is active and valid for 24 hours: <strong>${fullPath}</strong></p>`;
        }
        return;
      } else {
        document.body.innerHTML = "<h2>This URL has expired.</h2>";
        return;
      }
    } else {
      // No local match, but allow this ID to be stored now
      localStorage.setItem(
        "validDynamicURLInfo",
        JSON.stringify({
          url: fullPath,
          timestamp: now
        })
      );

      const output = document.getElementById("output");
      if (output) {
        output.innerHTML = `<p>This is a newly stored URL valid for 24 hours: <strong>${fullPath}</strong></p>`;
      }
      return;
    }
  }

  // CASE 2: No ?id — generate one
  const newId = Math.floor(Math.random() * 100000);
  const newURL = `${window.location.pathname}?id=${newId}`;

  // Store in localStorage
  localStorage.setItem(
    "validDynamicURLInfo",
    JSON.stringify({
      url: newURL,
      timestamp: now
    })
  );

  // Replace URL in-place (no reload)
  window.history.replaceState({}, "", newURL);

  const output = document.getElementById("output");
  if (output) {
    output.innerHTML = `<p>New URL created and valid for 24 hours: <strong>${newURL}</strong></p>`;
  }
});
