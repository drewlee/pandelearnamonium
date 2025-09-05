/**
 * Email address format validation.
 *
 * @param email - The user entered email address.
 * @returns Whether the email address is of valid format.
 */
export function isValidEmail(email: string): boolean {
  // Validation is by no means meant to be exhaustive and is primarily for
  // the benefit of the user as opposed to a strict syntactic check.
  const emailRegExp = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  return emailRegExp.test(email);
}
