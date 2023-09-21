import Main from '../../pages/main/main';
import Configure from '../../pages/configure/configure';
import Dashboard from '../../pages/dashboard/dashboard';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Main />} />
      <Route path='/configure' element={<Configure />} />
      <Route path='/dashboard' element={<Dashboard />} />
    </Routes>
  );
}

export default App;
