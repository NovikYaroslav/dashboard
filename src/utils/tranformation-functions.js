export function addLeadingZero(number) {
  return number < 10 ? '0' + number : number;
}

export function timeTransformer(timeData) {
  if (timeData.seconds !== undefined) {
    return `${addLeadingZero(Number(timeData.hour))}:${addLeadingZero(
      Number(timeData.minutes),
    )}:${addLeadingZero(Number(timeData.seconds))}`;
  }
  return `${addLeadingZero(Number(timeData.hour))}:${addLeadingZero(Number(timeData.minutes))}`;
}
