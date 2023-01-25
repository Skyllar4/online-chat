import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import { Profile } from './Components/Profile/Profile';
import { MainChatComponent } from './Components/MainChat/MainChatComponent';
import { MainAuth } from './Components/AuthComponents/MainAuth/MainAuth';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <BrowserRouter>
    <React.StrictMode>
      <Routes>
        <Route path='/' element={<App />} />
        <Route path='/auth' element={<MainAuth />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/general' element={<MainChatComponent/>} />
      </Routes>
    </React.StrictMode>
  </BrowserRouter>
);

reportWebVitals();
