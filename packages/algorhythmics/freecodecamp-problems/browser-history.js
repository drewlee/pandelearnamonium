function getBrowserHistory(commands) {
  const stack = [];
  let currIdx = 0;

  for (let i = 0; i < commands.length; i++) {
    if (commands[i] === 'Back') {
      if (currIdx > 0) {
        currIdx--;
      }
    } else if (commands[i] === 'Forward') {
      if (currIdx < stack.length - 1) {
        currIdx++;
      }
    } else {
      stack.splice(currIdx + 1);
      stack.push(commands[i]);
      currIdx = stack.length - 1;
    }
  }

  return [stack, currIdx];
}
