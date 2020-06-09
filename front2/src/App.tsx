import React from 'react';
import './App.css';

import Routes from './routes';
import { BrowserRouter } from 'react-router-dom';
import Header from './components/partials/Header';

function App() {
  return (
    <BrowserRouter>
      <Header>
        <Routes />
      </Header>
    </BrowserRouter>
  );
}

export default App;
