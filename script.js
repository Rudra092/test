document.addEventListener("DOMContentLoaded", function () {
  // Get full URL dynamically
  const fullURL = window.location.href;           // Full URL (with page)
  const baseURL = window.location.origin;         // e.g., https://username.github.io
  const path = window.location.pathname;          // e.g., /repo-name/ or / (for user site)

  console.log("Full URL:", fullURL);
  console.log("Base URL:", baseURL);
  console.log("Path:", path);

  // Combine baseURL + path to get repo root
  const repoURL = baseURL + path.replace(/index\.html$/, '').replace(/\/$/, '') + "/";
  console.log("Dynamic Repo URL:", repoURL);

  // Example use: load an image from repo path
  const img = document.createElement("img");
  img.src = repoURL + "images/sample.jpg";
  img.alt = "Dynamic Image";
  img.style.maxWidth = "200px";
  document.body.appendChild(img);
});
