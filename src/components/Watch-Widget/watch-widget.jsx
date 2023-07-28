import './watch-widget.css';
import { useState } from 'react';

export default function WatchWidget() {
  let timeData = new Date();
  let hours = timeData.getHours();
  let minutes = timeData.getMinutes();
  let time = `${hours}:${addLeadingZero(minutes)}`;
  const [currentTime, setCurrentTime] = useState(time);

  function addLeadingZero(number) {
    return number < 10 ? '0' + number : number;
  }

  function updateTime() {
    timeData = new Date();
    hours = timeData.getHours();
    minutes = timeData.getMinutes();
    time = `${hours}:${addLeadingZero(minutes)}`;
    setCurrentTime(time);
  }

  setInterval(updateTime, 60000);

  console.log(currentTime);
  return (
    <div className='watch-widget'>
      <div className='watch-widget_bar'>
        <button className='watch-widget__btn watch-widget__btn_active '>Watch</button>
        <button className='watch-widget__btn'>Alarm</button>
        <button className='watch-widget__btn'>Timer</button>
        <button className='watch-widget__btn'>StopWatch</button>
      </div>
      <div className='watch-widget__watch'>{currentTime}</div>
      {/* <div className='watch-widget_alarm'></div>
      <div className='watch-widget_timer'></div>
      <div className='watch-widget_stopwatch'></div> */}
    </div>
  );
}
