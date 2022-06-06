
// Use within a node process to reliably cleanup on keyboard interrupt

process.on("SIGINT", () => {
  console.log("Shutting Down Worker");
  process.exit();
});

