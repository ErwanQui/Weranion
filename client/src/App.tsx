import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import React from 'react';
import Login from './pages/Login/Login';
import Main from './pages/Main/Main';

import theme from './theme';
import { ThemeProvider } from '@emotion/react';

function App() {

  return (
    
    <ThemeProvider theme={theme}>
      <Router>
        <div className='App'>
          <Routes>
            {/* <Route
            path='/'
            element={
              <Home />
            }
          /> */}
            <Route
              path='/'
              element={
                <Login/>
              }
            />
            <Route
              path='/main'
              element={
                <Main/>
              }
            />
            {/* <Route
            path='/chat'
            element={<Chat username={username} room={room} />}
          /> */}
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
