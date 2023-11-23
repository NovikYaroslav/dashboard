import { useNavigate } from 'react-router-dom';
import './entry.css';

export default function Entry() {
  const navigate = useNavigate();

  function handleConfigureClick() {
    navigate('/configure');
  }

  return (
    <main className='entry'>
      <div className='entry__welcome'>
        <h1 className='entry__title'>Hello, world!</h1>
        <p className='entry__text'>Configure, create, use.</p>
        <p className='entry__text'>Welcome, to your new minimalistic dashboard.</p>
      </div>
      <button className='entry__button' onClick={handleConfigureClick}>
        Configure
      </button>
    </main>
  );
}
