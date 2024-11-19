// Set to false to disable performance logging
const DEBUG_PERFORMANCE = true;

function startTimer(label: string) {
  console.log("START TIMER ---");
  if (DEBUG_PERFORMANCE) console.time(label);
}

function endTimer(label: string) {
  console.log("END TIMER ---");
  if (DEBUG_PERFORMANCE) console.timeEnd(label);
}

export { startTimer, endTimer };
