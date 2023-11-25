import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Option from '../../components/Option/Option';
import { availibleWidgets } from '../../utils/data';
import './configure.css';

export default function Configure() {
  const navigate = useNavigate();
  const [configuration, setConfiguration] = useState([]);
  const savedConfiguration = JSON.parse(localStorage.getItem('configuration'));

  useEffect(() => {
    if (savedConfiguration) {
      setConfiguration(savedConfiguration);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('configuration', JSON.stringify(configuration));
  }, [configuration]);

  function isWidgetChecked(widgetName) {
    return configuration.includes(widgetName);
  }

  function handleWidgetCheck(evt) {
    const widget = evt.target.name;
    if (configuration.includes(widget)) {
      const updatedConfiguration = configuration.filter((item) => item !== widget);
      setConfiguration(updatedConfiguration);
    } else {
      setConfiguration([...configuration, widget]);
    }
  }

  function handleDoneClick() {
    navigate('/dashboard');
  }

  return (
    <main className='configure'>
      {Object.keys(configuration).length === 0 ? (
        <h2 className='configure__title'>Select widgets you wish to use</h2>
      ) : (
        <button className='configure__button' onClick={handleDoneClick}>
          Done
        </button>
      )}
      <ul className='configure__container'>
        {availibleWidgets.map((widget) => (
          <Option
            widget={widget}
            handleWidgetCheck={handleWidgetCheck}
            isWidgetChecked={isWidgetChecked}
            key={widget}
          />
        ))}
      </ul>
    </main>
  );
}
