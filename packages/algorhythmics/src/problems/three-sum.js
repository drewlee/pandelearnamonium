// Backup of https://www.educative.io/courses/grokking-coding-interview-in-javascript/3sum
function threeSum(nums) {
  const result = [];

  // Sort the input array.
  nums.sort((a, b) => a - b);

  // Iterate over the input array, skipping the last two elements,
  // which will be covered by the two pointers.
  for (let i = 0; i < nums.length - 2; i++) {
    // Avoid duplicate entries by ensuring the current value is not the same as the previous value.
    if (i > 0 && nums[i] === nums[i - 1]) {
      continue;
    }

    // Also optimize to stop when the current value exceeds 0.
    if (nums[i] > 0) {
      break;
    }

    let low = i + 1;
    let high = nums.length - 1;

    while (low < high) {
      const sum = nums[i] + nums[low] + nums[high];

      if (sum < 0) {
        low++;
      } else if (sum > 0) {
        high--;
      } else {
        const curr = [nums[i], nums[low], nums[high]];

        if (!result.length) {
          result.push(curr);
        } else {
          const prev = result[result.length - 1];

          // Avoid duplicate results.
          if (!(prev[0] === curr[0] && prev[1] === curr[1] && prev[2] === curr[2])) {
            result.push(curr);
          }
        }

        low++;
        high--;
      }
    }
  }

  return result;
}

export { threeSum };
