// import { Draggable } from 'drag-react';
import WatchWidget from '../../components/Watch-Widget/watch-widget';
import CalculatorWidget from '../../components/Calculator-Widget.jsx/calculator-widget';
import CalendarWidget from '../../components/Calendar-Widget/Calendar-Widget';
import ToDoWidget from '../../components/To-do-Widget/To-do-widget';
import Draggable from 'react-draggable';
import drag from '../../images/icons8-перетаскивание-67.png';
import './dashboard.css';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const navigate = useNavigate();
  const config = JSON.parse(localStorage.getItem('configuration'));
  const widgetsSet = {
    Watch: <WatchWidget />,
    Calculator: <CalculatorWidget />,
    Calendar: <CalendarWidget />,
    ToDo: <ToDoWidget />,
  };

  function handleBackButtonClick() {
    navigate('/configure');
  }

  return (
    <div className='dashboard'>
      {config.map((widget) => (
        <Draggable bounds='body' handle='.dashboard__pin'>
          <div
            style={{
              width: 'fit-content',
              height: 'fit-content',
              margin: '0 5px 5px 5px',
              display: 'flex',
              flexDirection: 'column',
            }}>
            <div className='dashboard__pin' />

            {widgetsSet[widget]}
          </div>
        </Draggable>
      ))}
      <button className='dashboard__back-button' onClick={handleBackButtonClick}>
        Back to configuration
      </button>
    </div>
  );
}
