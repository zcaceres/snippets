// https://github.com/Polly-Contrib/Polly.Contrib.WaitAndRetry/blob/7596d2dacf22d88bbd814bc49c28424fb6e921e9/src/Polly.Contrib.WaitAndRetry/Backoff.DecorrelatedJitterV2.cs#L22
export function decorrelatedJitterBackoff(
  medianFirstRetryDelay: number,
  maxRetries: number,
  random?: () => number,
) {
  const factor = 4;
  const out = [];

  let prev = 0;
  for (let i = 0; i < maxRetries; i++) {
    const rand = random ?? Math.random;
    if (factor < 0.1) {
      throw Error("factor should be >= 0.1");
    }
    var t = i + rand();
    var next = Math.pow(2, t) * Math.tanh(Math.sqrt(factor * t));
    out.push((next - prev) * (1 / 1.4) * medianFirstRetryDelay);
    prev = next;
  }

  return out;
}
