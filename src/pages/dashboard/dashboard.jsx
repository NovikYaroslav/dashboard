import { useNavigate } from 'react-router-dom';
import Draggable from 'react-draggable';
import WatchWidget from '../../components/Watch-widget/Watch-widget';
import CalculatorWidget from '../../components/Calculator-widget/Calculator-widget';
import CalendarWidget from '../../components/Calendar-widget/Calendar-widget';
import ToDoWidget from '../../components/To-do-widget/To-do-widget';
import './dashboard.css';

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
    <main className='dashboard'>
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
    </main>
  );
}
