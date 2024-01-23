import CalculatorWidget from '../Calculator-widget/Calculator-widget';
import CalendarWidget from '../Calendar-widget/Calendar-widget';
import ToDoWidget from '../To-do-widget/To-do-widget';
import WatchWidget from '../Watch-widget/Watch-widget';
import './option.css';

export default function Option({ widget, handleWidgetCheck, isWidgetChecked }) {
  const widgets = {
    Calculator: <CalculatorWidget />,
    Calendar: <CalendarWidget />,
    ToDo: <ToDoWidget />,
    Watch: <WatchWidget />,
  };

  if (widget === undefined) {
    return null;
  }

  return (
    <>
      <li className='option'>
        <div className='option__bar'>
          <h3 className='option__title'>{widget}</h3>
          <input
            type='checkbox'
            name={widget}
            className='option__checkbox'
            onChange={(evt) => handleWidgetCheck(evt)}
            checked={isWidgetChecked(widget)}
          ></input>
        </div>
        {widgets[widget]}
      </li>
    </>
  );
}
