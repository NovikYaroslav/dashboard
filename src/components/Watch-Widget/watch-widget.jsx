import './watch-widget.css';
import { useState } from 'react';
import { WatchTabs } from '../../utils/data';
import { alarmHours, alarmMinutes } from '../../utils/calculation-functions';

export default function WatchWidget() {
  let timeData = new Date();
  let hours = timeData.getHours();
  let minutes = timeData.getMinutes();
  let time = `${hours}:${addLeadingZero(minutes)}`;
  const [currentTime, setCurrentTime] = useState(time);
  const [activeTab, setActiveTab] = useState('Watch');
  const [alertTime, setAlarmTime] = useState({ hour: 0, minutes: 0, added: false });

  console.log(alarmHours());

  function updateTime() {
    timeData = new Date();
    hours = timeData.getHours();
    minutes = timeData.getMinutes();
    time = `${hours}:${addLeadingZero(minutes)}`;
    setCurrentTime(time);
  }

  setInterval(updateTime, 60000);

  function addLeadingZero(number) {
    return number < 10 ? '0' + number : number;
  }

  function handleAlarmAdd(evt) {
    evt.preventDefault();
    setAlarmTime({ ...alertTime, added: true });
  }

  function handleAlarmRemove() {
    setAlarmTime({ hour: 0, minutes: 0, added: false });
  }

  function pickActiveTab(tab) {
    if (tab === 'Watch') {
      return <div className='watch-widget__watch'>{currentTime}</div>;
    }
    if (tab === 'Alarm') {
      return (
        <div className='watch-widget__alarm'>
          {alertTime.added ? (
            <div className='watch-widget__bar_time-picker'>
              <div className='watch-widget__current-alarm'>{`${addLeadingZero(
                Number(alertTime.hour),
              )}:${addLeadingZero(Number(alertTime.minutes))}`}</div>
              <button className='watch-widget__time-picker-btn' onClick={handleAlarmRemove}>
                Remove
              </button>
            </div>
          ) : (
            <div className='watch-widget__bar_time-picker'>
              <select
                className='watch-widget__time-picker-hours'
                value={alertTime.hour}
                onChange={(e) => setAlarmTime({ ...alertTime, hour: e.target.value })}>
                {alarmHours().map((hour) => (
                  <option className='watch-widget__time-picker-hour' key={hour}>
                    {addLeadingZero(hour)}
                  </option>
                ))}
              </select>
              <div style={{ margin: '0 5px', color: '#757575' }}>:</div>
              <select
                className='watch-widget__time-picker-hours'
                value={alertTime.minutes}
                onChange={(e) => setAlarmTime({ ...alertTime, minutes: e.target.value })}>
                {alarmMinutes().map((minute) => (
                  <option key={minute}>{addLeadingZero(minute)}</option>
                ))}
              </select>
              <button className='watch-widget__time-picker-btn' onClick={handleAlarmAdd}>
                Add
              </button>
            </div>
          )}
        </div>
      );
    }
    if (tab === 'Timer') {
      return <div className='watch-widget__watch'>Timer</div>;
    }
    if (tab === 'StopWatch') {
      return <div className='watch-widget__watch'>StopWatch</div>;
    }
  }

  return (
    <div className='watch-widget'>
      <div className='watch-widget_bar'>
        {WatchTabs.map((tab) => (
          <button
            className={`watch-widget__btn ${activeTab === tab ? 'watch-widget__btn_active' : ''}`}
            onClick={() => setActiveTab(tab)}
            key={tab}>
            {tab}
          </button>
        ))}
      </div>
      {pickActiveTab(activeTab)}
    </div>
  );
}
