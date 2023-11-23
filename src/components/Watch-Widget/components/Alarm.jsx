import { alarmHours, alarmMinutes } from '../../../utils/calculation-functions';
import { addLeadingZero } from '../../../utils/tranformation-functions';

export default function Alarm({
  alertTime,
  alarmTime,
  onAlarmRemove,
  onAlarmAdd,
  onAlarmHoursSet,
  onAlarmMinutesSet,
}) {
  return (
    <div className='watch-widget__alarm'>
      {alertTime.added ? (
        <div className='watch-widget__bar-time-picker'>
          <div className='watch-widget__current-alarm'>{alarmTime}</div>
          <button className='watch-widget__time-picker-btn' onClick={onAlarmRemove}>
            Remove
          </button>
        </div>
      ) : (
        <div className='watch-widget__bar-time-picker'>
          <select
            className='watch-widget__time-picker-hours'
            value={alertTime.hour}
            onChange={(e) => onAlarmHoursSet(e)}>
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
            onChange={(e) => onAlarmMinutesSet(e)}>
            {alarmMinutes().map((minute) => (
              <option key={minute}>{addLeadingZero(minute)}</option>
            ))}
          </select>
          <button className='watch-widget__time-picker-btn' onClick={onAlarmAdd}>
            Add
          </button>
        </div>
      )}
    </div>
  );
}
