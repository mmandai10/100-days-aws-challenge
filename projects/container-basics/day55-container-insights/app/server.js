const http = require("http");
const os = require("os");

const APP_VERSION = "v1";
const PORT = 3000;

const server = http.createServer((req, res) => {
  if (req.url === "/health") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ status: "healthy", version: APP_VERSION }));
    return;
  }

  if (req.url === "/stress") {
    const start = Date.now();
    const duration = 3000;
    while (Date.now() - start < duration) {
      Math.sqrt(Math.random() * 999999);
    }
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        message: "CPU stress complete",
        duration_ms: Date.now() - start,
        hostname: os.hostname(),
      })
    );
    return;
  }

  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(
    JSON.stringify({
      version: APP_VERSION,
      hostname: os.hostname(),
      timestamp: new Date().toISOString(),
    })
  );
});

server.listen(PORT, () => {
  console.log(`[${APP_VERSION}] Server running on port ${PORT}`);
});

process.on("SIGTERM", () => {
  console.log(`[${APP_VERSION}] SIGTERM received, shutting down gracefully`);
  server.close(() => {
    console.log(`[${APP_VERSION}] Server closed`);
    process.exit(0);
  });
});
