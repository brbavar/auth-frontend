import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import App from './App.jsx';
import { Auth } from './components/Auth';
import Register from './pages/Register';
import { VerifyEmail } from './pages/VerifyEmail';
import { EmailVerification } from './pages/EmailVerification';
import LoggedIn from './pages/LoggedIn';
import { ResetPassword } from './pages/ResetPassword';
import { PasswordReset } from './pages/PasswordReset';
import PasswordResetSuccess from './pages/PasswordResetSuccess';

import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/private' element={<Auth />}>
          <Route path='/private/logged-in' element={<LoggedIn />} />
        </Route>
        <Route path='/' element={<App />} />
        <Route path='/register' element={<Register />} />
        <Route path='/please-verify' element={<VerifyEmail />} />
        <Route
          path='/verify-email/:VerificationString'
          element={<EmailVerification />}
        />
        <Route path='/reset-password' element={<ResetPassword />} />
        <Route
          path='/password-reset/:VerificationString'
          element={<PasswordReset />}
        />
        <Route
          path='/password-reset-success'
          element={<PasswordResetSuccess />}
        />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
