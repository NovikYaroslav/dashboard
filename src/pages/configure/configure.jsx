import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CalendarWidget from '../../components/Calendar-Widget/Calendar-Widget';
import ToDoWidget from '../../components/To-do-Widget/To-do-widget';
import WatchWidget from '../../components/Watch-Widget/watch-widget';
import CalculatorWidget from '../../components/Calculator-Widget.jsx/calculator-widget';
import './configure.css';

export default function Configure() {
  const navigate = useNavigate();
  const [configuration, setConfiguration] = useState([]);
  const savedConfiguration = JSON.parse(localStorage.getItem('configuration'));

  useEffect(() => {
    // Load configuration from local storage when the component mounts
    if (savedConfiguration) {
      setConfiguration(savedConfiguration);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('configuration', JSON.stringify(configuration));
  }, [configuration]);

  // Function to check if a widget is already in the configuration
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
    <div className='configure'>
      {Object.keys(configuration).length === 0 ? (
        <h1 className='configure_title'>Select widgets you wish to use</h1>
      ) : (
        <button className='configure_button' onClick={handleDoneClick}>
          Done
        </button>
      )}
      <div className='configure_container'>
        <div className='configure_gridcell'>
          <div className='configure_gridcell-bar'>
            <h2 className='configure_gridcell-title'>Calendar</h2>
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
            <h2 className='configure_gridcell-title'>ToDo list</h2>
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
            <h2 className='configure_gridcell-title'>Watch</h2>
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
            <h2 className='configure_gridcell-title'>Calculator</h2>
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
    </div>
  );
}

{
  /* <ul>
<li>Calendar</li> */
}
{
  /* https://www.section.io/engineering-education/build-react-calendar-library/#installation */
}
{
  /* <li>Weather</li> */
}
{
  /* https://codesandbox.io/s/react-weather-widget-co08m?file=/src/hooks/useFetch.js */
}
{
  /* https://rapidapi.com/blog/access-global-weather-data-with-these-weather-apis/ */
}
{
  /* <li>Notes</li>
<li>Task bar</li>
<li>Todo checker</li>
<li>Audio Player</li> */
}
// </ul>
