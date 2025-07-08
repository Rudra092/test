document.addEventListener("DOMContentLoaded", () => {
  const currentURL = window.location.href;

  // If there's no query string, add a random one
  if (!window.location.search) {
    const randomId = Math.floor(Math.random() * 100000);
    const newURL = `${window.location.pathname}?id=${randomId}`;
    window.history.replaceState({}, "", newURL);
  }
});
