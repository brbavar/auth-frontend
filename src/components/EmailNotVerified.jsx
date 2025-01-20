import { useNavigate } from 'react-router-dom';

export const EmailNotVerified = () => {
  const navigate = useNavigate();

  return (
    <div id='email-not-verified' className='container'>
      <div className='cutout'>
        <p>Oh no...</p>
        <p style={{ fontSize: '4.7vw' }}>Your email could not be verified.</p>
      </div>
      <button onClick={() => navigate('/register')}>Sign up again</button>
    </div>
  );
};
