function getNumRotations(num) {
  const result = [];
  const oNumStr = String(num);
  const nLen = oNumStr.length;
  let numStr = oNumStr;

  for (let i = 0; i < nLen; i++) {
    numStr = numStr.slice(1) + numStr[0];
    result.push(Number(numStr));
  }

  return result;
}

function getOpenIssues(issues, prs) {
  for (const pr of prs) {
    if (issues.includes(pr)) {
      continue;
    }

    const rotations = getNumRotations(pr);

    for (const num of rotations) {
      const idx = issues.indexOf(num);
      if (idx > -1) {
        issues.splice(idx, 1);
      }
    }
  }

  const result = [];

  for (const issue of issues) {
    if (prs.includes(issue)) {
      result.push(issue);
      continue;
    }

    const rotations = getNumRotations(issue);
    let hasRotation = false;

    for (const num of rotations) {
      const idx = prs.indexOf(num);
      if (idx > -1) {
        hasRotation = true;
        break;
      }
    }

    if (!hasRotation) {
      result.push(issue);
    }
  }

  return result;
}
