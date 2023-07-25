import './to-do_widget.css';

export default function ToDoWidget() {
  return (
    <div className='todo-widget'>
      <div className='todo_inprogress'>
        <h3>In progress</h3>
        <div className='todo_item'>
          <input type='checkbox' className='todo_checkbox'></input>
          <p className='todo-discription'>Помыть посуду</p>
        </div>
        <div className='todo_item'>
          <input type='checkbox' className='todo_checkbox'></input>
          <p className='todo-discription'>Помыть посуду</p>
        </div>
        <div className='todo_item'>
          <input type='checkbox' className='todo_checkbox'></input>
          <p className='todo-discription'>Помыть посуду</p>
        </div>
      </div>
      <div className='todo_finished'>
        <h3>Finished</h3>
        <div className='todo_item'>
          <input type='checkbox' className='todo_checkbox'></input>
          <p className='todo_discription'>Пропылесосить</p>
        </div>
        <div className='todo_item'>
          <input type='checkbox' className='todo_checkbox'></input>
          <p className='todo_discription'>Пропылесосить</p>
        </div>
        <div className='todo_item'>
          <input type='checkbox' className='todo_checkbox'></input>
          <p className='todo_discription'>Пропылесосить</p>
        </div>
        <div className='todo_item'>
          <input type='checkbox' className='todo_checkbox'></input>
          <p className='todo_discription'>Пропылесосить</p>
        </div>
      </div>
      <div className='todo_finished'>
        <h3>Add</h3>
        <input type='text' className='todo_checkbox'></input>
      </div>
    </div>
  );
}
