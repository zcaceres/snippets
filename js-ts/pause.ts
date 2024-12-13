async function pause(durationMs: number) {
  return new Promise<void>(resolve => {
    setTimeout(() => {
      resolve();
    }, durationMs);
  });
}
