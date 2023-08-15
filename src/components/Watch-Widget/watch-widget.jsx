import './watch-widget.css';
import { useEffect, useState } from 'react';
import { WatchTabs } from '../../utils/data';
import { alarmHours, alarmMinutes } from '../../utils/calculation-functions';

export default function WatchWidget() {
  let timeData = new Date();
  let hours = timeData.getHours();
  let minutes = timeData.getMinutes();
  let time = `${hours}:${addLeadingZero(minutes)}`;
  const [currentTime, setCurrentTime] = useState(time);
  const [activeTab, setActiveTab] = useState('Watch');
  const [alertTime, setAlertTime] = useState({ hour: 0, minutes: 0, added: false });
  const [timerTime, setTimerTime] = useState({ hour: 0, minutes: 0, added: false });
  const [stopWatchTime, setStopWatchTime] = useState({
    hour: 0,
    minutes: 0,
    seconds: 0,
    added: false,
  });
  let alarmTime = `${addLeadingZero(Number(alertTime.hour))}:${addLeadingZero(
    Number(alertTime.minutes),
  )}`;
  let timersTime = `${addLeadingZero(Number(timerTime.hour))}:${addLeadingZero(
    Number(timerTime.minutes),
  )}`;
  let stopWatchsTime = `${addLeadingZero(Number(stopWatchTime.hour))}:${addLeadingZero(
    Number(stopWatchTime.minutes),
  )}:${addLeadingZero(Number(stopWatchTime.seconds))}`;

  console.log(timerTime.hour);

  // Будильник
  useEffect(() => {
    if (alertTime.added && alarmTime === currentTime) {
      alert('Time to wake up, Neo!');
    }
  }, [alertTime, currentTime, alarmTime]);

  // Таймер
  useEffect(() => {
    let timerInterval;
    if (timerTime.added) {
      timerInterval = setInterval(updateTimer, 60000);
    }
    return () => clearInterval(timerInterval);
  }, [timerTime]);

  useEffect(() => {
    if (timerTime.added && timerTime.hour === 0 && timerTime.minutes === 0) {
      setTimerTime({ hour: 0, minutes: 0, added: false });
      alert('Time is over, Neo!');
    }
  }, [timerTime]);

  // Секундомер
  useEffect(() => {
    let stopWatchInterval;
    if (stopWatchTime.added) {
      stopWatchInterval = setInterval(updateStopWatchTime, 1000);
    }
    return () => clearInterval(stopWatchInterval);
  }, [stopWatchTime]);

  function updateTime() {
    timeData = new Date();
    hours = timeData.getHours();
    minutes = timeData.getMinutes();
    time = `${hours}:${addLeadingZero(minutes)}`;
    setCurrentTime(time);
  }

  function updateTimer() {
    if (timerTime.minutes === 0) {
      setTimerTime((prevTime) => ({ ...prevTime, hour: prevTime.hour - 1, minutes: 59 }));
    } else {
      setTimerTime((prevTime) => ({ ...prevTime, minutes: prevTime.minutes - 1 }));
    }
  }

  function updateStopWatchTime() {
    console.log('StopWatch');
    if (stopWatchTime.minutes > 59) {
      console.log('StopWatch Hours');
      setStopWatchTime((prevTime) => ({ ...prevTime, hour: prevTime.hour + 1, minutes: 0 }));
    }
    if (stopWatchTime.seconds > 59) {
      console.log('StopWatch Hours');
      setStopWatchTime((prevTime) => ({ ...prevTime, minutes: prevTime.minutes + 1, seconds: 0 }));
    } else {
      console.log('StopWatch Minutes');
      setStopWatchTime((prevTime) => ({ ...prevTime, seconds: prevTime.seconds + 1 }));
    }
  }

  setInterval(updateTime, 60000);

  function addLeadingZero(number) {
    return number < 10 ? '0' + number : number;
  }

  function handleAlarmAdd(evt) {
    evt.preventDefault();
    setAlertTime({ ...alertTime, added: true });
  }

  function handleAlarmRemove() {
    setAlertTime({ hour: 0, minutes: 0, added: false });
  }

  function handleTimerTime(evt) {
    evt.preventDefault();
    setTimerTime({ ...timerTime, added: true });
  }

  function handleTimerRemove() {
    setTimerTime({ hour: 0, minutes: 0, added: false });
  }

  function handleStopWatchAdd(evt) {
    console.log('Add');
    evt.preventDefault();
    setStopWatchTime({ ...stopWatchTime, added: true });
  }

  function handleStopWatchStop(evt) {
    evt.preventDefault();
    setStopWatchTime({ ...stopWatchTime, added: false });
  }

  function handleStopWatchResume(evt) {
    evt.preventDefault();
    setStopWatchTime({ ...stopWatchTime, added: true });
  }

  function handleStopWatchDrop(evt) {
    evt.preventDefault();
    setStopWatchTime({ hour: 0, minutes: 0, seconds: 0, added: false });
  }

  function handleStopWatchReset(evt) {
    evt.preventDefault();
    setStopWatchTime({ hour: 0, minutes: 0, seconds: 0, added: true });
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
              <div className='watch-widget__current-alarm'>{alarmTime}</div>
              <button className='watch-widget__time-picker-btn' onClick={handleAlarmRemove}>
                Remove
              </button>
            </div>
          ) : (
            <div className='watch-widget__bar_time-picker'>
              <select
                className='watch-widget__time-picker-hours'
                value={alertTime.hour}
                onChange={(e) => setAlertTime({ ...alertTime, hour: e.target.value })}>
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
                onChange={(e) => setAlertTime({ ...alertTime, minutes: e.target.value })}>
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
      return (
        <div className='watch-widget__alarm'>
          {timerTime.added ? (
            <div className='watch-widget__bar_time-picker'>
              <div className='watch-widget__current-alarm'>{timersTime}</div>
              <button className='watch-widget__time-picker-btn' onClick={handleTimerRemove}>
                Remove
              </button>
            </div>
          ) : (
            <div className='watch-widget__bar_time-picker'>
              <select
                className='watch-widget__time-picker-hours'
                value={timerTime.hour}
                onChange={(e) => setTimerTime({ ...timerTime, hour: e.target.value })}>
                {alarmHours().map((hour) => (
                  <option className='watch-widget__time-picker-hour' key={hour}>
                    {addLeadingZero(hour)}
                  </option>
                ))}
              </select>
              <div style={{ margin: '0 5px', color: '#757575' }}>:</div>
              <select
                className='watch-widget__time-picker-hours'
                value={timerTime.minutes}
                onChange={(e) => setTimerTime({ ...timerTime, minutes: e.target.value })}>
                {alarmMinutes().map((minute) => (
                  <option key={minute}>{addLeadingZero(minute)}</option>
                ))}
              </select>
              {timerTime.hour == 0 && timerTime.minutes == 0 ? null : (
                <button className='watch-widget__time-picker-btn' onClick={handleTimerTime}>
                  Add
                </button>
              )}
            </div>
          )}
        </div>
      );
    }
    if (tab === 'StopWatch') {
      return (
        <div className='watch-widget__alarm'>
          {!stopWatchTime.added && stopWatchTime.seconds === 0 && stopWatchTime.minutes === 0 ? (
            <button className='watch-widget__time-picker-btn' onClick={handleStopWatchAdd}>
              Start
            </button>
          ) : (
            <>
              <div className='watch-widget__current-alarm'>{stopWatchsTime}</div>
              <div className='watch-widget__stopwatch-bar'>
                {!stopWatchTime.added && stopWatchTime.seconds > 0 ? (
                  <>
                    <button className='watch-widget__time-picker-btn' onClick={handleStopWatchDrop}>
                      Drop
                    </button>
                    <button
                      className='watch-widget__time-picker-btn'
                      onClick={handleStopWatchResume}>
                      Resume
                    </button>
                  </>
                ) : (
                  <button className='watch-widget__time-picker-btn' onClick={handleStopWatchStop}>
                    Stop
                  </button>
                )}
                <button className='watch-widget__time-picker-btn' onClick={handleStopWatchReset}>
                  Reset
                </button>
              </div>
            </>
          )}
        </div>
      );
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
