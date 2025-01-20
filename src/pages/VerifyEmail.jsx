import { useNavigate } from 'react-router-dom';

export const VerifyEmail = () => {
  const navigate = useNavigate();

  setTimeout(() => {
    navigate('/');
  }, 10000);

  return (
    <div id='verify-email' className='cutout'>
      <p style={{ fontSize: '6vw' }}>Thanks for signing up!</p>
      <p style={{ fontSize: '2.9vw' }}>
        We just sent you a verification email. You must verify your email
        address to enjoy all this site has to offer. So, what are you waiting
        for? Check your inbox!
      </p>
    </div>
  );
};
