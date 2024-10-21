import { useState, useEffect } from 'react';
import { useToken } from '../lib/useToken';

import EyeIconBox from '../components/EyeIconBox';
import { eyeOpen, togglePasswordVisibility } from '../lib/password-visibility';

import onsubmitHandler from '../lib/onsubmitHandler';

import { useNavigate } from 'react-router-dom';

const Login = () => {
  useEffect(() => {
    document.title = 'Sign in';
  });

  const navigate = useNavigate();

  const [svgPath, setSVGPath] = useState(eyeOpen);
  const [svgCX, setSVGcx] = useState('56.5');
  const [lineWidth, setLineWidth] = useState('0');

  const [passVis, setPassVis] = useState('password');

  const eyeClickHandler = () =>
    togglePasswordVisibility(
      [passVis, setPassVis],
      [svgPath, setSVGPath],
      [svgCX, setSVGcx],
      [lineWidth, setLineWidth]
    );

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  let [token, setToken] = useToken();

  const onfulfilled = async (response) => {
    const payload = await response.data;
    token = payload.Token;
    setToken(token);
    localStorage.setItem('firstName', payload.FirstName);
    localStorage.setItem('lastName', payload.LastName);

    return navigate('/private/logged-in');
  };

  const onrejected = async (response) => {
    console.log(`Promise rejected\nresponse = ${await response}`);
  };

  return (
    <body id='login'>
      <div className='card'>
        <h3>Sign in</h3>
        <form
          onSubmit={(e) =>
            onsubmitHandler(
              e,
              null,
              'GET',
              `emails/${email}/passwords/${password}`,
              onfulfilled,
              onrejected
            )
          }
        >
          <div className='field'>
            <label htmlFor='email'>Email</label>
            <input
              id='email'
              type='email'
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className='field'>
            <label htmlFor='password'>Password</label>
            <div className='password-subfield'>
              <input
                style={{ width: '100%' }}
                id='password'
                type={passVis}
                onChange={(e) => setPassword(e.target.value)}
              />
              <EyeIconBox
                eyeClickHandler={eyeClickHandler}
                svgPath={svgPath}
                svgCX={svgCX}
                lineWidth={lineWidth}
              />
            </div>
            <a href='/reset-password' style={{ fontSize: '10pt' }}>
              Forgot password?
            </a>
          </div>
          <div className='field'>
            <input
              className='submit'
              type='submit'
              value='SIGN IN'
              disabled={!(email && password)}
            />
          </div>
          <p style={{ fontSize: '10pt' }}>
            New to the site? <a href='register'>Create an account.</a>
          </p>
        </form>
      </div>
    </body>
  );
};

export default Login;
