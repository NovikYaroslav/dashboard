import Entry from '../../pages/entry/entry';
import Configure from '../../pages/configure/configure';
import Dashboard from '../../pages/dashboard/dashboard';
import { Routes, Route } from 'react-router-dom';

function App() {
  console.log(null === undefined);

  return (
    <Routes>
      <Route path='/' element={<Entry />} />
      <Route path='/configure' element={<Configure />} />
      <Route path='/dashboard' element={<Dashboard />} />
    </Routes>
  );
}

export default App;
