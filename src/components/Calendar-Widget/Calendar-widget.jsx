import Calendar from 'react-calendar';
import { useState } from 'react';
import './calendar-widget.css';

export default function CalendarWidget() {
  const [date, setDate] = useState(new Date());

  return (
    <div className='calendar-widget'>
      <Calendar onChange={setDate} value={date} />
    </div>
  );
}
