import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CalendarWidget from '../../components/Calendar-widget/Calendar-widget';
import ToDoWidget from '../../components/To-do-widget/To-do-widget';
import WatchWidget from '../../components/Watch-widget/Watch-widget';
import CalculatorWidget from '../../components/Calculator-widget/Calculator-widget';
import './configure.css';

export default function Configure() {
  const navigate = useNavigate();
  const [configuration, setConfiguration] = useState([]);
  const savedConfiguration = JSON.parse(localStorage.getItem('configuration'));

  useEffect(() => {
    if (savedConfiguration) {
      setConfiguration(savedConfiguration);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('configuration', JSON.stringify(configuration));
  }, [configuration]);

  function isWidgetChecked(widgetName) {
    return configuration.includes(widgetName);
  }

  function handleWidgetCheck(evt) {
    const widget = evt.target.name;
    if (configuration.includes(widget)) {
      const updatedConfiguration = configuration.filter((item) => item !== widget);
      setConfiguration(updatedConfiguration);
    } else {
      setConfiguration([...configuration, widget]);
    }
  }

  function handleDoneClick() {
    navigate('/dashboard');
  }

  return (
    <main className='configure'>
      {Object.keys(configuration).length === 0 ? (
        <h2 className='configure_title'>Select widgets you wish to use</h2>
      ) : (
        <button className='configure_button' onClick={handleDoneClick}>
          Done
        </button>
      )}
      {/* have to be refactored to ul/li*/}
      <div className='configure_container'>
        <div className='configure_gridcell'>
          <div className='configure_gridcell-bar'>
            <h3 className='configure_gridcell-title'>Calendar</h3>
            <input
              type='checkbox'
              name='Calendar'
              className='configure_gridcell-checkbox'
              onChange={(evt) => handleWidgetCheck(evt)}
              checked={isWidgetChecked('Calendar')}></input>
          </div>
          <CalendarWidget />
        </div>
        <div className='configure_gridcell'>
          <div className='configure_gridcell-bar'>
            <h3 className='configure_gridcell-title'>ToDo list</h3>
            <input
              type='checkbox'
              name='ToDo'
              className='configure_gridcell-checkbox'
              onChange={(evt) => handleWidgetCheck(evt)}
              checked={isWidgetChecked('ToDo')}></input>
          </div>
          <ToDoWidget />
        </div>
        <div className='configure_gridcell'>
          <div className='configure_gridcell-bar'>
            <h3 className='configure_gridcell-title'>Watch</h3>
            <input
              type='checkbox'
              name='Watch'
              className='configure_gridcell-checkbox'
              onChange={(evt) => handleWidgetCheck(evt)}
              checked={isWidgetChecked('Watch')}></input>
          </div>
          <WatchWidget />
        </div>
        <div className='configure_gridcell'>
          <div className='configure_gridcell-bar'>
            <h3 className='configure_gridcell-title'>Calculator</h3>
            <input
              type='checkbox'
              name='Calculator'
              className='configure_gridcell-checkbox'
              onChange={(evt) => handleWidgetCheck(evt)}
              checked={isWidgetChecked('Calculator')}></input>
          </div>
          <CalculatorWidget />
        </div>
      </div>
    </main>
  );
}
