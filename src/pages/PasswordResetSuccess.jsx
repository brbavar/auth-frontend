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
    <div id='logged-in' className='cutout'>
      Your password has been updated!
    </div>
  );
};

export default PasswordResetSuccess;
