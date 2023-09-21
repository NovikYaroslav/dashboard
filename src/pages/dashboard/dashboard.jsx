// import { Draggable } from 'drag-react';
import WatchWidget from '../../components/Watch-Widget/watch-widget';
import CalculatorWidget from '../../components/Calculator-Widget.jsx/calculator-widget';
import CalendarWidget from '../../components/Calendar-Widget/Calendar-Widget';
import ToDoWidget from '../../components/To-do-Widget/To-do-widget';
import Draggable from 'react-draggable';

export default function Dashboard() {
  const config = JSON.parse(localStorage.getItem('configuration'));
  const widgetsSet = {
    Watch: <WatchWidget />,
    Calculator: <CalculatorWidget />,
    Calendar: <CalendarWidget />,
    ToDo: <ToDoWidget />,
  };

  return (
    <>
      {config.map((widget) => (
        <Draggable bounds='body'>
          <div
            style={{
              maxWidth: 'fit-content',
              maxHeight: 'fit-content',
              display: 'flex',
              flexDirection: 'column',
            }}>
            <h1 className='handle' style={{ width: '100%', margin: '0' }}>
              --
            </h1>
            {widgetsSet[widget]}
          </div>
        </Draggable>
      ))}
    </>
  );
}
