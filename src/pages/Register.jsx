import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToken } from '../lib/useToken';

import EyeIconBox from '../components/EyeIconBox';
import { eyeOpen, togglePasswordVisibility } from '../lib/password-visibility';

import { onrejected } from '../lib/onrejected';
import onsubmitHandler from '../lib/onsubmitHandler';
import { buttonContainerClickHandler } from '../lib/buttonContainerClickHandler';

const Register = () => {
  useEffect(() => {
    document.title = 'Create an account';
  });

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
  const [isDisabled, setIsDisabled] = useState(true);

  if (!isDisabled && !(email && password)) setIsDisabled(true);
  if (isDisabled && email && password) setIsDisabled(false);

  let [token, setToken] = useToken();

  const navigate = useNavigate();

  const onfulfilled = async (response) => {
    ({ token } = await response.data);
    setToken(token);

    if (response.status === 400) {
      return;
    } else {
      const card = document.querySelector('div.card#register');
      card.querySelectorAll('*').forEach((elem) => elem.remove());
      const h2 = document.createElement('h2');
      card.appendChild(h2);
      h2.textContent = 'Your account was successfully created!';
      setTimeout(() => navigate('/please-verify'), 3000);
    }
  };

  return (
    <div id='register' className='card'>
      <h2>Create an account</h2>
      <form
        id='registration-form'
        onSubmit={(e) =>
          onsubmitHandler(
            e,
            null,
            'POST',
            'register/',
            onfulfilled,
            (response) => onrejected(response, 'registration-form')
          )
        }
      >
        <div className='field'>
          <label htmlFor='email'>Email</label>
          <input
            id='email'
            name='Email'
            type='email'
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>
        <div className='name-section'>
          <div className='field'>
            <label htmlFor='first-name'>First name</label>
            <input id='first-name' name='First name' type='text' />
          </div>
          <div className='field'>
            <label htmlFor='last-name'>Last name</label>
            <input id='last-name' name='Last name' type='text' />
          </div>
        </div>
        <div className='password-section'>
          <div className='field'>
            <label htmlFor='password'>Password</label>
            <div className='password-subfield'>
              <input
                style={{ width: '100%' }}
                id='password'
                name='Password'
                type={passVis}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              <EyeIconBox
                eyeClickHandler={eyeClickHandler}
                svgPath={svgPath}
                svgCX={svgCX}
                lineWidth={lineWidth}
              />
            </div>
          </div>
          <div className='field'>
            <label htmlFor='confirm'>Confirm password</label>
            <div className='password-subfield'>
              <input
                style={{ width: '100%' }}
                id='confirm'
                name='Confirm password'
                type={passVis}
              />
              <EyeIconBox
                eyeClickHandler={eyeClickHandler}
                svgPath={svgPath}
                svgCX={svgCX}
                lineWidth={lineWidth}
              />
            </div>
          </div>
        </div>
        <div
          className='field'
          onClick={() =>
            buttonContainerClickHandler(
              'Must provide email and password to submit',
              'registration-form'
            )
          }
        >
          <input
            className='submit'
            type='submit'
            name='Create account'
            value='Create account'
            disabled={isDisabled}
            style={{ pointerEvents: isDisabled ? 'none' : '' }}
          />
        </div>
        <p style={{ fontSize: '10pt' }}>
          Already have an account? <a href='/'>Sign in.</a>
        </p>
      </form>
    </div>
  );
};

export default Register;
