import { Routes, Route } from 'react-router-dom';

export const App = () => {

  return (
    <Routes>
      <Route path='/' element={<Signup />}></Route>
      <Route path='/signup' element={<Signup />}></Route>
      <Route path='/login' element={<Signup />}></Route>
      <Route path='/dashboard' element={<Signup />}></Route>
    </Routes>
  );
};

export default App;
