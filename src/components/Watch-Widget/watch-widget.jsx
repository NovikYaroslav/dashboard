import './watch-widget.css';
import { useEffect, useState } from 'react';
import Alarm from './components/Alarm';
import { watchTabs } from '../../utils/data';
import { timeTransformer } from '../../utils/tranformation-functions';
import Timer from './components/Timer';
import Stopwatch from './components/Stopwatch';

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
  let alarmTime = timeTransformer(alertTime);
  let timersTime = timeTransformer(timerTime);
  let stopWatchsTime = timeTransformer(stopWatchTime);

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

  setInterval(updateTime, 60000);

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
    if (stopWatchTime.minutes > 59) {
      setStopWatchTime((prevTime) => ({ ...prevTime, hour: prevTime.hour + 1, minutes: 0 }));
    }
    if (stopWatchTime.seconds > 59) {
      setStopWatchTime((prevTime) => ({ ...prevTime, minutes: prevTime.minutes + 1, seconds: 0 }));
    } else {
      setStopWatchTime((prevTime) => ({ ...prevTime, seconds: prevTime.seconds + 1 }));
    }
  }

  function addLeadingZero(number) {
    return number < 10 ? '0' + number : number;
  }

  // Будильник
  function handleAlarmAdd(evt) {
    evt.preventDefault();
    setAlertTime({ ...alertTime, added: true });
  }

  function handleAlarmRemove() {
    setAlertTime({ hour: 0, minutes: 0, added: false });
  }

  function handleAlarmHoursSet(e) {
    setAlertTime({ ...alertTime, hour: e.target.value });
  }

  function handleAlarmMinutesSet(e) {
    setAlertTime({ ...alertTime, minutes: e.target.value });
  }

  // Таймер
  function handleTimerTime(evt) {
    evt.preventDefault();
    setTimerTime({ ...timerTime, added: true });
  }

  function handleTimerRemove() {
    setTimerTime({ hour: 0, minutes: 0, added: false });
  }

  function handleTimerHoursSet(e) {
    setTimerTime({ ...timerTime, hour: e.target.value });
  }

  function handleTimerMinutesSet(e) {
    setTimerTime({ ...timerTime, minutes: e.target.value });
  }

  // Секундомер
  function handleStopWatchAdd(evt) {
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
        <Alarm
          alarmTime={alarmTime}
          alertTime={alertTime}
          onAlarmRemove={handleAlarmRemove}
          onAlarmAdd={handleAlarmAdd}
          onAlarmHoursSet={handleAlarmHoursSet}
          onAlarmMinutesSet={handleAlarmMinutesSet}
        />
      );
    }
    if (tab === 'Timer') {
      return (
        <Timer
          timerTime={timerTime}
          timersTime={timersTime}
          onTimerRemove={handleTimerRemove}
          onTimerTime={handleTimerTime}
          onTimerHoursSet={handleTimerHoursSet}
          onTimerMinutesSet={handleTimerMinutesSet}
        />
      );
    }
    if (tab === 'StopWatch') {
      return (
        <Stopwatch
          stopWatchTime={stopWatchTime}
          stopWatchsTime={stopWatchsTime}
          onStopWatchAdd={handleStopWatchAdd}
          onStopWatchDrop={handleStopWatchDrop}
          onStopWatchReset={handleStopWatchReset}
          onStopWatchResume={handleStopWatchResume}
          onStopWatchStop={handleStopWatchStop}
        />
      );
    }
  }

  return (
    <div className='watch-widget'>
      <div className='watch-widget_bar'>
        {watchTabs.map((tab) => (
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
