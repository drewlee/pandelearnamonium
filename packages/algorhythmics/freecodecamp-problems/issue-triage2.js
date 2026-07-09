function triageIssue(title, labels) {
  const nLabels = [...labels];

  if (!nLabels.length) {
    if (title.includes('error') || title.includes('bug')) {
      nLabels.push('bug', 'needs triage');
    } else if (title.includes('feature') || title.includes('add')) {
      nLabels.push('enhancement', 'discussing');
    }
  } else if (
    nLabels[1] === 'needs triage' &&
    (title.includes('simpler') || title.includes('easy'))
  ) {
    nLabels[1] = 'good first issue';
  } else if (nLabels[1] === 'discussing' && (title.includes('planned') || title.includes('next'))) {
    nLabels[1] = 'on the roadmap';
  } else if (nLabels[1] === 'needs triage' || nLabels[1] === 'discussing') {
    nLabels[1] = 'help wanted';
  }

  if (title.includes('security')) {
    nLabels.push('critical');
  }

  return nLabels;
}
