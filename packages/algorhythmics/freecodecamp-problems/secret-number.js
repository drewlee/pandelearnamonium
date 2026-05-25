function guessNumber(secret, guess) {
  if (guess > secret) {
    return 'lower';
  } else if (guess < secret) {
    return 'higher';
  }

  return 'you got it!';
}
