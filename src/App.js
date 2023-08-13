import Header from './components/Header';
import { Routes, Route } from 'react-router-dom';

import Main from './pages/main';
import Login from './pages/login';
import Shop from './pages/shop';
import NotFound from './pages/NotFound';

import './App.scss';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Main />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/shop" element={<Shop />}></Route>
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </>
  );
}

export default App;
