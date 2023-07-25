import './main.css';

export default function Main() {
  return (
    <div className='main'>
      <div className='main_welcome'>
        <h1 className='main_title'>Hello, world!</h1>
        <p className='main_text'>Configure, create, act.</p>
        <p className='main_text'>Welcome, to your new dashboard.</p>
      </div>
      <button className='main_button'>Configure</button>
    </div>
  );
}
