import React from 'react';
import './App.css';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import MainPage from './Component/MainPage';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<MainPage/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
