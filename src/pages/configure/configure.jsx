import CalendarWidget from '../../components/Calendar-Widget/Calendar-Widget';
import ToDoWidget from '../../components/To-do-Widget/To-do-widget';
import WatchWidget from '../../components/Watch-Widget/watch-widget';
import './configure.css';

export default function Configure() {
  return (
    <div className='configure'>
      <h1 className='configure_title'>Select boards you wish to use</h1>
      <div className='configure_container'>
        <div className='configure_gridcell'>
          <div className='configure_gridcell-bar'>
            <h2 className='configure_gridcell-title'>Calendar</h2>
            <input type='checkbox' className='configure_gridcell-checkbox'></input>
          </div>
          <CalendarWidget />
        </div>
        <div className='configure_gridcell'>
          <div className='configure_gridcell-bar'>
            <h2 className='configure_gridcell-title'>ToDo list</h2>
            <input type='checkbox' className='configure_gridcell-checkbox'></input>
          </div>
          <ToDoWidget />
        </div>
        <div className='configure_gridcell'>
          <div className='configure_gridcell-bar'>
            <h2 className='configure_gridcell-title'>Watch</h2>
            <input type='checkbox' className='configure_gridcell-checkbox'></input>
          </div>
          <WatchWidget />
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
