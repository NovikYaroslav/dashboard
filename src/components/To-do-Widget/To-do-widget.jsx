import { useState, useEffect } from 'react';
import './to-do-widget.css';

export default function ToDoWidget() {
  const [inProgressItems, setInProgressItems] = useState([]);
  const [finishedItems, setFinishedItems] = useState([]);
  const [newItemText, setNewItemText] = useState('');
  const savedTasks = JSON.parse(localStorage.getItem('Tasks'));

  useEffect(() => {
    if (savedTasks) {
      setInProgressItems(savedTasks.inProgressTasks);
      setFinishedItems(savedTasks.finishedTasks);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      'Tasks',
      JSON.stringify({ inProgressTasks: inProgressItems, finishedTasks: finishedItems }),
    );
  }, [inProgressItems, finishedItems]);

  const handleFormSubmit = (evt) => {
    evt.preventDefault();
    if (newItemText.trim() === '') {
      return;
    }
    setInProgressItems([...inProgressItems, { status: false, task: newItemText }]);
    setNewItemText('');
  };

  function handleDoneCheck(finishedItem) {
    setInProgressItems(inProgressItems.filter((item) => item !== finishedItem));
    setFinishedItems([...finishedItems, { status: true, task: finishedItem.task }]);
  }

  function handleUnDoneCheck(itemToDo) {
    setFinishedItems(finishedItems.filter((item) => item !== itemToDo));
    setInProgressItems([...inProgressItems, { status: false, task: itemToDo.task }]);
  }

  function handleTaskDelete(itemToDelete) {
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
    <div className='to-do-widget'>
      {inProgressItems.length > 0 ? (
        <div className='to-do-widget_inprogress'>
          {' '}
          <h3 className='to-do-widget__title'>In progress:</h3>
          {inProgressItems.map((item, i) => (
            <div className='to-do-widget__item' key={item.task + i}>
              <div className='to-do-widget__item-task'>
                <input
                  type='checkbox'
                  checked={item.status}
                  onChange={() => handleDoneCheck(item)}
                  className='to-do-widget__checkbox'></input>
                <p className='to-do-widget__discription'>{item.task}</p>
              </div>
              <button
                className='to-do-widget__delete'
                onClick={() => handleTaskDelete(item)}></button>
            </div>
          ))}{' '}
        </div>
      ) : null}

      {finishedItems.length > 0 ? (
        <div className='to-do-widget_finished'>
          <h3 className='to-do-widget__title'>Finished:</h3>
          {finishedItems.map((item) => (
            <div className='to-do-widget__item' key={item.task}>
              <div className='to-do-widget__item-task'>
                <input
                  type='checkbox'
                  checked={item.status}
                  onChange={() => handleUnDoneCheck(item)}
                  className='to-do-widget__checkbox'></input>
                <p className='to-do-widget__discription to-do-widget__discription_finished'>
                  {item.task}
                </p>
              </div>
              <button
                className='to-do-widget__delete'
                onClick={() => handleTaskDelete(item)}></button>
            </div>
          ))}
        </div>
      ) : null}
      <div className='to-do-widget_add-bar'>
        <form className='to-do-widget__form' onSubmit={handleFormSubmit}>
          <input
            placeholder='Add your task'
            type='text'
            value={newItemText}
            onChange={(evt) => setNewItemText(evt.target.value)}
            className='to-do-widget__add-area'></input>
          <button className='to-do-widget__add' type='submit'>
            Add
          </button>
        </form>
      </div>
      {inProgressItems.length > 0 || finishedItems.length > 0 ? (
        <button className='to-do-widget__delete-all' onClick={handleTasksRemove}>
          Remove all tasks
        </button>
      ) : null}
    </div>
  );
}
