import { useState } from 'react';
import './to-do_widget.css';

export default function ToDoWidget() {
  const [inProgressItems, setInProgressItems] = useState([]);
  const [finishedItems, setFinishedItems] = useState([]);
  const [newItemText, setNewItemText] = useState('');

  const handleFormSubmit = (evt) => {
    evt.preventDefault();
    if (newItemText.trim() === '') {
      return;
    }
    setInProgressItems([...inProgressItems, { status: false, task: newItemText }]);
    setNewItemText('');
  };

  function handleDoneCheck(finishedItem) {
    console.log(finishedItem);
    setInProgressItems(inProgressItems.filter((item) => item !== finishedItem));
    setFinishedItems([...finishedItems, { status: true, task: finishedItem.task }]);
  }

  function handleUnDoneCheck(itemToDo) {
    console.log(itemToDo);
    setFinishedItems(finishedItems.filter((item) => item !== itemToDo));
    setInProgressItems([...inProgressItems, { status: false, task: itemToDo.task }]);
  }

  function handleTaskDelete(itemToDelete) {
    console.log(itemToDelete);
    if (itemToDelete.status) {
      setFinishedItems(finishedItems.filter((item) => item !== itemToDelete));
    }
    setInProgressItems(inProgressItems.filter((item) => item !== itemToDelete));
  }

  function handleTasksRemove() {
    setInProgressItems([]);
    setFinishedItems([]);
  }

  return (
    <div className='todo-widget'>
      <div className='todo_inprogress'>
        {inProgressItems.length > 0 ? <h3>In progress</h3> : null}
        {inProgressItems.map((item) => (
          <div className='todo_item' key={item.task}>
            <input
              type='checkbox'
              checked={item.status}
              onChange={() => handleDoneCheck(item)}
              className='todo_checkbox'></input>
            <p className='todo-discription'>{item.task}</p>
            <button onClick={() => handleTaskDelete(item)}>Delete</button>
          </div>
        ))}
      </div>
      <div className='todo_finished'>
        {finishedItems.length > 0 ? <h3>Finished</h3> : null}
        {finishedItems.map((item) => (
          <div className='todo_item' key={item.task}>
            <input
              type='checkbox'
              checked={item.status}
              onChange={() => handleUnDoneCheck(item)}
              className='todo_checkbox'></input>
            <p className='todo-discription'>{item.task}</p>
            <button onClick={() => handleTaskDelete(item)}>Delete</button>
          </div>
        ))}
      </div>
      <div className='todo_add-bar'>
        <h3>Add task</h3>
        <form onSubmit={handleFormSubmit}>
          <textarea
            type='text'
            value={newItemText}
            onChange={(evt) => setNewItemText(evt.target.value)}
            className='todo_checkbox'></textarea>
          <button type='submit'>Add</button>
        </form>
      </div>
      {inProgressItems.length > 0 || finishedItems.length > 0 ? (
        <button onClick={handleTasksRemove}>Remove all tasks</button>
      ) : null}
    </div>
  );
}
