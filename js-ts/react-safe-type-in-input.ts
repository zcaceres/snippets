export async function typeText(input: HTMLInputElement, text: string) {
  input.focus();
  await pause(500);
  for (const char of text.split("")) {
    // Create and dispatch events for each character
    const inputEvent = new InputEvent("input", {
      bubbles: true,
      cancelable: true,
      inputType: "insertText",
      data: char,
    });

    const keydownEvent = new KeyboardEvent("keydown", {
      bubbles: true,
      cancelable: true,
      key: char,
      // char: char,
      keyCode: char.charCodeAt(0),
    });

    const keyupEvent = new KeyboardEvent("keyup", {
      bubbles: true,
      cancelable: true,
      key: char,
      // char: char,
      keyCode: char.charCodeAt(0),
    });

    // Dispatch events in order
    input.dispatchEvent(keydownEvent);
    input.value += char;
    input.dispatchEvent(inputEvent);
    input.dispatchEvent(keyupEvent);

    await pause(50 + Math.random() * 100);
  }

  // Dispatch a final change event
  const changeEvent = new Event("change", { bubbles: true, cancelable: true });
  input.dispatchEvent(changeEvent);
}
