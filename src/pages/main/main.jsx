import './main.css';
import { useNavigate } from 'react-router-dom';

export default function Main() {
  const navigate = useNavigate();

  function handleConfigureClick() {
    navigate('/configure');
  }

  return (
    <div className='main'>
      <div className='main_welcome'>
        <h1 className='main_title'>Hello, world!</h1>
        <p className='main_text'>Configure, create, use.</p>
        <p className='main_text'>Welcome, to your new dashboard.</p>
      </div>
      <button className='main_button' onClick={handleConfigureClick}>
        Configure
      </button>
    </div>
  );
}
