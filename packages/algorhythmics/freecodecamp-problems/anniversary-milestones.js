function getMilestone(years) {
  if (years < 1) {
    return 'Newlyweds';
  } else if (years < 5) {
    return 'Paper';
  } else if (years < 10) {
    return 'Wood';
  } else if (years < 25) {
    return 'Tin';
  } else if (years < 40) {
    return 'Silver';
  } else if (years < 50) {
    return 'Ruby';
  } else if (years < 60) {
    return 'Gold';
  } else if (years < 70) {
    return 'Diamond';
  } else {
    return 'Platinum';
  }
}
