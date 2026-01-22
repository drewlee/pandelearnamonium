function getAverageGrade(scores) {
  const sum = scores.reduce((sum, score) => sum + score, 0);
  const average = sum / scores.length;

  if (average < 60) {
    return 'F';
  } else if (average < 63) {
    return 'D-';
  } else if (average < 67) {
    return 'D';
  } else if (average < 70) {
    return 'D+';
  } else if (average < 73) {
    return 'C-';
  } else if (average < 77) {
    return 'C';
  } else if (average < 80) {
    return 'C+';
  } else if (average < 83) {
    return 'B-';
  } else if (average < 87) {
    return 'B';
  } else if (average < 90) {
    return 'B+';
  } else if (average < 93) {
    return 'A-';
  } else if (average < 97) {
    return 'A';
  } else {
    return 'A+';
  }
}
