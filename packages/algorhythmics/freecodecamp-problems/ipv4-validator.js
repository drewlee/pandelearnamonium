function isValidIPv4(ipv4) {
  const parts = ipv4.split('.');

  if (parts.length !== 4) {
    return false;
  }

  const isValid = parts.every((value) => {
    const valueNum = Number(value);

    return (
      value !== '' &&
      (value.length === 1 || value[0] !== '0') &&
      !Number.isNaN(valueNum) &&
      valueNum >= 0 &&
      valueNum <= 255
    );
  });

  return isValid;
}
