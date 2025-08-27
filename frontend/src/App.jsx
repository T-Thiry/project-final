import { ThemeProvider } from 'styled-components';
import { theme } from './styles/theme';
import { GlobalStyles } from './styles/globalStyles';
import { Routes, Route } from 'react-router-dom';
import Landing from './components/pages/Landing';
import Signup from './components/pages/Signup';
import Login from './components/pages/Login';
import Dashboard from './components/pages/Dashboard';
import IncomeManagement from './components/pages/IncomeManagement';
import SpendingsManagement from './components/pages/SpendingsManagement';

export const App = () => {

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path="/income-management" element={<IncomeManagement />} />
        <Route path="/spendings-management" element={<SpendingsManagement />} />
      </Routes>
    </ThemeProvider>
  );
};

export default App;
