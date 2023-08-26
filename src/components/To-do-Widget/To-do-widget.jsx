import { useState, useEffect } from 'react';
import './to-do_widget.css';

export default function ToDoWidget() {
  const [inProgressItems, setInProgressItems] = useState([]);
  const [finishedItems, setFinishedItems] = useState([]);
  const [newItemText, setNewItemText] = useState('');
  const savedTasks = JSON.parse(localStorage.getItem('Tasks'));

  console.log(savedTasks.inProgressTasks);
  console.log(savedTasks.finishedTasks);

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
    <div className='todo-widget'>
      {inProgressItems.length > 0 ? (
        <div className='todo_inprogress'>
          {' '}
          <h3 className='todo__title'>In progress:</h3>
          {inProgressItems.map((item, i) => (
            <div className='todo_item' key={item.task + i}>
              <div className='todo_item-task'>
                <input
                  type='checkbox'
                  checked={item.status}
                  onChange={() => handleDoneCheck(item)}
                  className='to-do__checkbox'></input>
                <p className='to-do__discription'>{item.task}</p>
              </div>
              <button className='to-do__delete' onClick={() => handleTaskDelete(item)}></button>
            </div>
          ))}{' '}
        </div>
      ) : null}

      {finishedItems.length > 0 ? (
        <div className='todo_finished'>
          <h3 className='todo__title'>Finished:</h3>
          {finishedItems.map((item) => (
            <div className='todo_item' key={item.task}>
              <div className='todo_item-task'>
                <input
                  type='checkbox'
                  checked={item.status}
                  onChange={() => handleUnDoneCheck(item)}
                  className='to-do__checkbox'></input>
                <p className='to-do__discription to-do__discription_finished'>{item.task}</p>
              </div>
              <button className='to-do__delete' onClick={() => handleTaskDelete(item)}></button>
            </div>
          ))}
        </div>
      ) : null}
      <div className='todo_add-bar'>
        <form className='to-do__form' onSubmit={handleFormSubmit}>
          <input
            placeholder='Add your task'
            type='text'
            value={newItemText}
            onChange={(evt) => setNewItemText(evt.target.value)}
            className='to-do__add-area'></input>
          <button className='to-do__add' type='submit'>
            Add
          </button>
        </form>
      </div>
      {inProgressItems.length > 0 || finishedItems.length > 0 ? (
        <button className='to-do__delete-all' onClick={handleTasksRemove}>
          Remove all tasks
        </button>
      ) : null}
    </div>
  );
}
