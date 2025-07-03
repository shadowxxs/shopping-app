import './App.css';
import Layout from './components/layout';
import Home from './pages/home';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HistoryPages from './pages/historyPages';
import { CartProvider } from './context/cartContext';

function App() {
  
  return (
    <CartProvider>
    <BrowserRouter>
    <Routes>
    <Route path='/' element={<Layout/>}>
    <Route index element={<Home/>} />
    <Route path='history' element={<HistoryPages />} />
    </Route>
    </Routes>
    </BrowserRouter>
    </CartProvider>
  );
}

export default App;
