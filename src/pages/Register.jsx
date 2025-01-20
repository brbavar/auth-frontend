import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToken } from '../lib/useToken';

import EyeIconBox from '../components/EyeIconBox';
import { eyeOpen, togglePasswordVisibility } from '../lib/password-visibility';

import onsubmitHandler from '../lib/onsubmitHandler';
import { removeErrors } from '../lib/removeErrors';

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

  let [token, setToken] = useToken();

  const navigate = useNavigate();

  const onPost = async (response) => {
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

  const onNotPost = async (response) => {
    const errorField = document.createElement('div');
    errorField.classList.add('field');
    errorField.id = 'error-field';

    const errors = (await response).response.data.errors;
    for (let error of errors) errorField.innerHTML += `${error.msg}<br>`;
    errorField.style.color = 'red';
    errorField.style.fontSize = '10pt';

    document.getElementById('registration-form').appendChild(errorField);
  };

  return (
    <div id='register' className='card'>
      <h3>Create an account</h3>
      <form
        id='registration-form'
        onSubmit={(e) =>
          onsubmitHandler(e, null, 'POST', 'register/', onPost, onNotPost)
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
              removeErrors();
            }}
          />
        </div>
        <div className='name-section'>
          <div className='field'>
            <label htmlFor='first-name'>First name</label>
            <input
              id='first-name'
              name='First name'
              type='text'
              onChange={removeErrors()}
            />
          </div>
          <div className='field'>
            <label htmlFor='last-name'>Last name</label>
            <input
              id='last-name'
              name='Last name'
              type='text'
              onChange={removeErrors()}
            />
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
                  removeErrors();
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
                onChange={removeErrors()}
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
        <div className='field'>
          <input
            className='submit'
            type='submit'
            name='Create account'
            value='Create account'
            disabled={!(email && password)}
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
