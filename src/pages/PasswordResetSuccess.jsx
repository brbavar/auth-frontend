import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const PasswordResetSuccess = () => {
  useEffect(() => {
    document.title = 'Reset successful';
  });

  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate('/');
    }, 10000);
  }, [navigate]);

  return (
    <body id='logged-in'>
      <div className='cutout'>Your password has been updated!</div>
    </body>
  );
};

export default PasswordResetSuccess;
