import './App.scss';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LayoutPage from './pages/LayoutPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LayoutPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
