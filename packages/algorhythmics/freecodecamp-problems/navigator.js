function navigate(commands) {
  const visit = 'Visit';
  const history = ['Home'];
  let currIdx = 0;

  for (const command of commands) {
    if (command.startsWith(visit)) {
      const page = command.slice(visit.length + 1);

      if (currIdx !== history.length - 1) {
        history.splice(currIdx + 1);
      }

      history.push(page);
      currIdx++;
    } else if (command === 'Back') {
      if (currIdx > 0) {
        currIdx--;
      }
    } else {
      // Forward
      if (currIdx < history.length - 1) {
        currIdx++;
      }
    }
  }

  return history[currIdx];
}
