function isValidMessage(message, validator) {
  const words = message.split(' ');

  if (words.length !== validator.length) {
    return false;
  }

  for (let i = 0; i < words.length; i++) {
    if (words[i][0].toLowerCase() !== validator[i].toLowerCase()) {
      return false;
    }
  }

  return true;
}
