import { addLeadingZero } from '../../../utils/tranformation-functions';
import { alarmHours, alarmMinutes } from '../../../utils/calculation-functions';

export default function Timer({
  timerTime,
  timersTime,
  onTimerRemove,
  onTimerTime,
  onTimerHoursSet,
  onTimerMinutesSet,
}) {
  return (
    <div className='watch-widget__alarm'>
      {timerTime.added ? (
        <div className='watch-widget__bar_time-picker'>
          <div className='watch-widget__current-alarm'>{timersTime}</div>
          <button className='watch-widget__time-picker-btn' onClick={onTimerRemove}>
            Remove
          </button>
        </div>
      ) : (
        <div className='watch-widget__bar_time-picker'>
          <select
            className='watch-widget__time-picker-hours'
            value={timerTime.hour}
            onChange={(e) => onTimerHoursSet(e)}>
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
            onChange={(e) => onTimerMinutesSet(e)}>
            {alarmMinutes().map((minute) => (
              <option key={minute}>{addLeadingZero(minute)}</option>
            ))}
          </select>
          {timerTime.hour == 0 && timerTime.minutes == 0 ? null : (
            <button className='watch-widget__time-picker-btn' onClick={onTimerTime}>
              Add
            </button>
          )}
        </div>
      )}
    </div>
  );
}
