export default function Stopwatch({
  stopWatchTime,
  stopWatchsTime,
  onStopWatchAdd,
  onStopWatchDrop,
  onStopWatchReset,
  onStopWatchResume,
  onStopWatchStop,
}) {
  return (
    <div className='watch-widget__alarm'>
      {!stopWatchTime.added && stopWatchTime.seconds === 0 && stopWatchTime.minutes === 0 ? (
        <>
          <div className='watch-widget__current-alarm'>{stopWatchsTime}</div>
          <button className='watch-widget__time-picker-btn' onClick={onStopWatchAdd}>
            Start
          </button>
        </>
      ) : (
        <>
          <div className='watch-widget__current-alarm'>{stopWatchsTime}</div>
          <div className='watch-widget__stopwatch-bar'>
            {!stopWatchTime.added && stopWatchTime.seconds > 0 ? (
              <>
                <button className='watch-widget__time-picker-btn' onClick={onStopWatchDrop}>
                  Drop
                </button>
                <button className='watch-widget__time-picker-btn' onClick={onStopWatchResume}>
                  Resume
                </button>
              </>
            ) : (
              <button className='watch-widget__time-picker-btn' onClick={onStopWatchStop}>
                Stop
              </button>
            )}
            <button className='watch-widget__time-picker-btn' onClick={onStopWatchReset}>
              Reset
            </button>
          </div>
        </>
      )}
    </div>
  );
}
