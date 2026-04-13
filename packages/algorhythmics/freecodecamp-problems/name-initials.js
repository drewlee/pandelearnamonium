function getInitials(name) {
  let result = '';

  const parts = name.split(' ');
  for (const part of parts) {
    result += `${part[0].toUpperCase()}.`;
  }

  return result;
}
