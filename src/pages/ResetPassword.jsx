import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import onsubmitHandler from '../lib/onsubmitHandler';

export const ResetPassword = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const onfulfilled = async (response) => {
    localStorage.setItem('email', email);
    document.getElementById('please-provide-email').textContent =
      'Check your inbox. We just sent you a link you can use to update your password.';
    document.getElementById('email-input').remove();
    document.getElementById('password-reset-form').remove();
    setTimeout(() => {
      navigate('/');
    }, 10000);
  };

  const onrejected = async (response) => {
    console.log(response);
  };

  return (
    <body id='reset-password'>
      <div className='card'>
        <h2>Forgot your password?</h2>
        <h3 id='please-provide-email'>
          To reset it please provide your email address:
        </h3>
        <form
          id='password-reset-form'
          onSubmit={(e) =>
            onsubmitHandler(
              e,
              null,
              'GET',
              `check-if-reset-sendable/${email}`,
              onfulfilled,
              onrejected
            )
          }
        >
          <input
            id='email-input'
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <input
            className='submit'
            type='submit'
            value='SEND RESET EMAIL'
            disabled={!email}
          />
        </form>
      </div>
    </body>
  );
};
