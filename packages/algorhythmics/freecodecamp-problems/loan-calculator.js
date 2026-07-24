function getLoanSchedule(loanAmount, annualRate, monthlyPayment) {
  const payments = [loanAmount];
  const monthlyRate = annualRate / 100 / 12;
  let balance = loanAmount;

  while (balance > 0) {
    const accrued = balance * monthlyRate;
    balance = balance + accrued - monthlyPayment;

    if (balance < 0) {
      balance = 0;
    }

    payments.push(Math.round(balance));
  }

  return payments;
}
