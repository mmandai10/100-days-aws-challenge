const http = require("http");
const os = require("os");

const APP_VERSION = "v2";
const PORT = 3000;

const server = http.createServer((req, res) => {
  if (req.url === "/health") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ status: "healthy", version: APP_VERSION }));
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
