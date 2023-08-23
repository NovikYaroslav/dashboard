import { useState } from 'react';
import './calculator-widget.css';
import { calculatorNumbersButtonsValues, calculatorOperatorsButtonsValues } from '../../utils/data';
import { MAX_CALC_VALUE_LENGTH } from '../../utils/const';

export default function CalculatorWidget() {
  const [calculationValues, setCalculationValues] = useState({
    left: null,
    right: null,
    operator: null,
    result: null,
  });

  function handleNumbersClick(number) {
    if (calculationValues.result) {
      return;
    }
    if (
      String(calculationValues.left).length === MAX_CALC_VALUE_LENGTH &&
      !calculationValues.operator
    ) {
      return;
    }
    if (String(calculationValues.right).length === MAX_CALC_VALUE_LENGTH) {
      return;
    }
    if (!calculationValues.operator) {
      if (number === '-/+') {
        if (calculationValues.left > 0) {
          setCalculationValues({ ...calculationValues, left: -Math.abs(calculationValues.left) });
        } else {
          setCalculationValues({ ...calculationValues, left: Math.abs(calculationValues.left) });
        }
      } else if (number === ',') {
        setCalculationValues({
          ...calculationValues,
          left: String(calculationValues.left) + '.',
        });
      } else if (!calculationValues.left) {
        setCalculationValues({ ...calculationValues, left: number });
      } else {
        setCalculationValues({ ...calculationValues, left: calculationValues.left + number });
      }
    } else {
      if (number === '-/+') {
        if (calculationValues.right > 0) {
          setCalculationValues({ ...calculationValues, right: -Math.abs(calculationValues.right) });
        } else {
          setCalculationValues({ ...calculationValues, right: Math.abs(calculationValues.right) });
        }
      } else if (number === ',') {
        setCalculationValues({
          ...calculationValues,
          right: String(calculationValues.right) + '.',
        });
      } else if (!calculationValues.right) {
        setCalculationValues({ ...calculationValues, right: number });
      } else {
        setCalculationValues({ ...calculationValues, right: calculationValues.right + number });
      }
    }
  }

  function handleOperatorClick(operator) {
    setCalculationValues({ ...calculationValues, operator: operator });
  }

  function calculate() {
    if (calculationValues.operator === '÷') {
      return Number(calculationValues.left) / Number(calculationValues.right);
    } else if (calculationValues.operator === '×') {
      return Number(calculationValues.left) * Number(calculationValues.right);
    } else if (calculationValues.operator === '-') {
      return Number(calculationValues.left) - Number(calculationValues.right);
    } else {
      return Number(calculationValues.left) + Number(calculationValues.right);
    }
  }

  function handleEquelClick() {
    setCalculationValues({ ...calculationValues, result: calculate() });
  }

  function handleDelClick() {
    if (calculationValues.result) {
      setCalculationValues({ ...calculationValues, result: null });
    } else if (calculationValues.right) {
      setCalculationValues({ ...calculationValues, right: null });
    } else if (calculationValues.operator) {
      setCalculationValues({ ...calculationValues, operator: null });
    } else if (calculationValues.left) {
      setCalculationValues({ ...calculationValues, left: null });
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
              onClick={() => handleNumbersClick(el)}>
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
