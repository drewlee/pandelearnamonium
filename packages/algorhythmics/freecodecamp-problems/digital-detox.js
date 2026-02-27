function digitalDetox(logs) {
  // Convert string values to timestamps of milliseconds (epoch time).
  const tsLogs = logs.map((dtStr) => Date.parse(dtStr));
  // Sort values for comparison purposes.
  tsLogs.sort((a, b) => a - b);

  // Track number of logins per day.
  const dateNum = new Date(tsLogs[0]).getDate();
  const loginsByDay = new Map([[dateNum, 1]]);

  for (let i = 1; i < tsLogs.length; i++) {
    // Determine if logins were within 4 hours.
    const diffMs = tsLogs[i] - tsLogs[i - 1];
    const diffHours = diffMs / 1000 / 60 / 60;

    if (diffHours < 4) {
      return false;
    }

    // Store the number of logins for the current day.
    const currDateNum = new Date(tsLogs[i]).getDate();
    const logins = loginsByDay.has(currDateNum) ? loginsByDay.get(currDateNum) : 0;

    loginsByDay.set(currDateNum, logins + 1);
  }

  // Iterate over the number of logins per day.
  // Determine if there were more than 2 logins for a given day.
  for (const value of loginsByDay.values()) {
    if (value > 2) {
      return false;
    }
  }

  return true;
}
