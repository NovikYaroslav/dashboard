import { Draggable } from 'drag-react';
import WatchWidget from '../../components/Watch-Widget/watch-widget';
import CalculatorWidget from '../../components/Calculator-Widget.jsx/calculator-widget';
import CalendarWidget from '../../components/Calendar-Widget/Calendar-Widget';
import ToDoWidget from '../../components/To-do-Widget/To-do-widget';

export default function Dashboard() {
  return (
    <>
      <Draggable>
        <WatchWidget />
      </Draggable>
      <Draggable>
        <CalculatorWidget />
      </Draggable>
      <Draggable>
        <CalendarWidget />
      </Draggable>
      <Draggable>
        <ToDoWidget />
      </Draggable>
    </>
  );
}
