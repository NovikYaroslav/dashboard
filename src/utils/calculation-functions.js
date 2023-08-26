export function alarmHours() {
  let hours = [];
  for (let i = 0; i < 24; i++) {
    hours.push(i);
  }
  return hours;
}

export function alarmMinutes() {
  let minutes = [];
  for (let i = 0; i < 60; i++) {
    minutes.push(i);
  }
  return minutes;
}

export function calculatorNumbers() {
  let numbers = [];
  for (let i = 0; i < 10; i++) {
    numbers.push(i);
  }
  return numbers;
}

export function calculate(calculationValues) {
  switch (calculationValues.operator) {
    case '÷':
      return Number(calculationValues.left) / Number(calculationValues.right);
    case '×':
      return Number(calculationValues.left) * Number(calculationValues.right);
    case '-':
      return Number(calculationValues.left) - Number(calculationValues.right);
    default:
      return Number(calculationValues.left) + Number(calculationValues.right);
  }
}

export function makeValueInversion(value) {
  if (!value) {
    return '';
  }
  return value > 0 ? -Math.abs(value) : Math.abs(value);
}

export function makeValueFractional(value) {
  if (!value) {
    return '';
  } else if (value.includes('.')) {
    return value;
  } else {
    return value + '.';
  }
}
