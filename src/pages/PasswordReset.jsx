import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { onrejected } from '../lib/onrejected';
import onsubmitHandler from '../lib/onsubmitHandler';
import { buttonContainerClickHandler } from '../lib/buttonContainerClickHandler';

import EyeIconBox from '../components/EyeIconBox';
import { eyeOpen, togglePasswordVisibility } from '../lib/password-visibility';

export const PasswordReset = () => {
  const [svgPath1, setSVGPath1] = useState(eyeOpen);
  const [svgCX1, setSVGcx1] = useState('56.5');
  const [lineWidth1, setLineWidth1] = useState('0');

  const [passVis1, setPassVis1] = useState('password');

  const eyeClickHandler1 = () =>
    togglePasswordVisibility(
      [passVis1, setPassVis1],
      [svgPath1, setSVGPath1],
      [svgCX1, setSVGcx1],
      [lineWidth1, setLineWidth1]
    );

  const [svgPath2, setSVGPath2] = useState(eyeOpen);
  const [svgCX2, setSVGcx2] = useState('56.5');
  const [lineWidth2, setLineWidth2] = useState('0');

  const [passVis2, setPassVis2] = useState('password');

  const eyeClickHandler2 = () =>
    togglePasswordVisibility(
      [passVis2, setPassVis2],
      [svgPath2, setSVGPath2],
      [svgCX2, setSVGcx2],
      [lineWidth2, setLineWidth2]
    );

  const [currPass, setCurrPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [passConfirmation, setPassConfirmation] = useState('');
  const [isDisabled, setIsDisabled] = useState(true);

  if (!isDisabled && !(currPass && newPass && passConfirmation))
    setIsDisabled(true);
  if (isDisabled && currPass && newPass && passConfirmation)
    setIsDisabled(false);

  const email = localStorage.getItem('email');

  const navigate = useNavigate();

  const onfulfilled = () => {
    return navigate('/password-reset-success');
  };

  return (
    <div id='password-reset' className='card'>
      <form
        id='password-reset-form'
        onSubmit={(e) => {
          onsubmitHandler(
            e,
            null,
            'GET',
            `get-password/${email}/${currPass}`,
            onsubmitHandler(
              e,
              { Email: email },
              'PUT',
              'reset-password',
              onfulfilled,
              (response) => onrejected(response, 'password-reset-form')
            )
          );
        }}
      >
        <div className='field'>
          <label htmlFor='currPass'>Current password</label>
          <div className='password-subfield'>
            <input
              id='currPass'
              type={passVis1}
              onChange={(e) => setCurrPass(e.target.value)}
            />
            <EyeIconBox
              eyeClickHandler={eyeClickHandler1}
              svgPath={svgPath1}
              svgCX={svgCX1}
              lineWidth={lineWidth1}
            />
          </div>
        </div>
        <div className='field'>
          <label htmlFor='newPass'>New password</label>
          <div className='password-subfield'>
            <input
              id='newPass'
              type={passVis2}
              onChange={(e) => {
                setNewPass(e.target.value);
              }}
            />
            <EyeIconBox
              eyeClickHandler={eyeClickHandler2}
              svgPath={svgPath2}
              svgCX={svgCX2}
              lineWidth={lineWidth2}
            />
          </div>
        </div>
        <div className='field'>
          <label htmlFor='passConfirmation'>Confirm password</label>
          <div className='password-subfield'>
            <input
              id='passConfirmation'
              type={passVis2}
              onChange={(e) => {
                setPassConfirmation(e.target.value);
              }}
            />
            <EyeIconBox
              eyeClickHandler={eyeClickHandler2}
              svgPath={svgPath2}
              svgCX={svgCX2}
              lineWidth={lineWidth2}
            />
          </div>
        </div>
        <div
          className='field'
          onClick={() =>
            buttonContainerClickHandler(
              'Must complete form to submit',
              'password-reset-form'
            )
          }
        >
          <input
            className='submit'
            type='submit'
            value='RESET'
            disabled={isDisabled}
          />
        </div>
      </form>
    </div>
  );
};
