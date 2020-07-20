async function pause(durationMs) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, durationMs);
  });
}
