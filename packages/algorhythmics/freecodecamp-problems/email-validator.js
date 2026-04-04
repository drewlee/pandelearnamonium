function validate(email) {
  const pattern =
    /^([a-z0-9\-_]{1,2}|[a-z0-9\-_][a-z0-9\-_.]+[a-z0-9\-_])@[a-z0-9\-_!.]+\.[a-z]{2,}$/i;

  return pattern.test(email) && !email.includes('..');
}
