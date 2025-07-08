document.addEventListener("DOMContentLoaded", () => {
  const currentURL = window.location.href;
  const fullPath = window.location.pathname + window.location.search;

  // Check if there's a stored "valid" URL
  const lastValidURL = localStorage.getItem("validDynamicURL");

  // If user is visiting a URL that's not the valid one
  if (lastValidURL && lastValidURL !== fullPath) {
    document.body.innerHTML = "<h2>This URL is no longer active.</h2>";
    return; // Stop further execution
  }

  // If no query string, generate a new one
  if (!window.location.search) {
    const randomId = Math.floor(Math.random() * 100000);
    const newURL = `${window.location.pathname}?id=${randomId}`;
    window.history.replaceState({}, "", newURL);
    localStorage.setItem("validDynamicURL", window.location.pathname + "?id=" + randomId);
  } else {
    // This is a valid URL – store it
    localStorage.setItem("validDynamicURL", fullPath);
  }

  // Optional: Display confirmation
  const output = document.getElementById("output");
  if (output) {
    output.innerHTML = `<p>This URL is active: <strong>${fullPath}</strong></p>`;
  }
});
