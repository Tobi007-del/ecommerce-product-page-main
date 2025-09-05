console.log("e-commerce site reached service-worker.js successfully");

self.addEventListener("install", () => {
  self.skipWaiting();
});
