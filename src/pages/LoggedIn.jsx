import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const LoggedIn = () => {
  useEffect(() => {
    document.title = "You're in!";
  });

  const navigate = useNavigate();

  setTimeout(() => {
    const cutout = document.querySelector('#logged-in > .cutout');
    cutout.innerHTML = 'Tap or click this box to log back out.';
    cutout.addEventListener('click', () => {
      localStorage.clear();
      navigate('/');
    });
  }, 10000);

  return (
    <body id='logged-in'>
      <div className='cutout'>
        You logged in successfully, {localStorage.getItem('firstName')}{' '}
        {localStorage.getItem('lastName')}!
      </div>
    </body>
  );
};

export default LoggedIn;
