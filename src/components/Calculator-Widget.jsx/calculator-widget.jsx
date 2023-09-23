import { useEffect, useState } from 'react';
import './calculator-widget.css';
import { calculatorNumbersButtonsValues, calculatorOperatorsButtonsValues } from '../../utils/data';
import {
  calculate,
  makeValueInversion,
  makeValueFractional,
} from '../../utils/calculation-functions';
import { MAX_VALUE_LENGTH } from '../../utils/const';

export default function CalculatorWidget() {
  const [calculationValues, setCalculationValues] = useState({
    left: '',
    right: '',
    operator: '',
    result: undefined,
  });
  const savedCalcValues = JSON.parse(localStorage.getItem('Calculator'));

  useEffect(() => {
    localStorage.setItem('Calculator', JSON.stringify(calculationValues));
  }, [calculationValues]);

  useEffect(() => {
    if (savedCalcValues) {
      setCalculationValues(savedCalcValues);
    }
  }, []);

  function handleNumbersAreaClick(value) {
    const targetValue = calculationValues.operator ? 'right' : 'left';

    if (calculationValues.result) {
      return;
    }

    if (calculationValues[targetValue].length === MAX_VALUE_LENGTH) {
      return;
    }

    if (value === '-/+' || value === ',') {
      modificateValue(targetValue, value);
    } else {
      setCalculationValues({
        ...calculationValues,
        [targetValue]: calculationValues[targetValue] + value,
      });
    }
  }

  function modificateValue(value, modificator) {
    if (modificator === '-/+') {
      const reversedValue = makeValueInversion(calculationValues[value]);
      setCalculationValues({ ...calculationValues, [value]: reversedValue });
    } else {
      const fractionalValue = makeValueFractional(calculationValues[value]);
      setCalculationValues({ ...calculationValues, [value]: fractionalValue });
    }
  }

  function handleOperatorClick(operator) {
    if (calculationValues.left) setCalculationValues({ ...calculationValues, operator: operator });
  }

  function handleEquelClick() {
    setCalculationValues({ ...calculationValues, result: calculate(calculationValues) });
  }

  function handleDelClick() {
    if (calculationValues.result) {
      setCalculationValues({ ...calculationValues, result: undefined });
    } else if (calculationValues.right) {
      setCalculationValues({ ...calculationValues, right: '' });
    } else if (calculationValues.operator) {
      setCalculationValues({ ...calculationValues, operator: '' });
    } else if (calculationValues.left) {
      setCalculationValues({ ...calculationValues, left: '' });
    }
  }

  return (
    <div className='calculator-widget'>
      <div className='calculator-widget__calculation-area'>
        <div className={`${calculationValues.result ? 'calculator-widget__calculation-line' : ''}`}>
          {calculationValues.left} {calculationValues.operator} {calculationValues.right}
        </div>

        {calculationValues.result ? (
          <div className='calculator-widget__calculation-result'>{calculationValues.result}</div>
        ) : null}
      </div>

      <div className='calculator-widget__symbols-area'>
        <div className='calculator-widget__numbers-area'>
          {calculatorNumbersButtonsValues.map((el) => (
            <button
              className='calculator-widget__button'
              key={el}
              onClick={() => handleNumbersAreaClick(el)}>
              {el}
            </button>
          ))}
        </div>
        <div className='calculator-widget__operators-area'>
          <button className='calculator-widget__button-operators' onClick={handleDelClick}>
            Del
          </button>
          {calculatorOperatorsButtonsValues.map((el) => (
            <button
              className='calculator-widget__button-operators'
              key={el}
              onClick={() => handleOperatorClick(el)}>
              {el}
            </button>
          ))}
          <button className='calculator-widget__button-operators' onClick={handleEquelClick}>
            =
          </button>
        </div>
      </div>
    </div>
  );
}
