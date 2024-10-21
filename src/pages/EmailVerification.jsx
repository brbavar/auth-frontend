import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useToken } from '../lib/useToken';
import axios from 'axios';

import { EmailVerified } from '../components/EmailVerified';
import { EmailNotVerified } from '../components/EmailNotVerified';

export const EmailVerification = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isSuccess, setIsSuccess] = useState(false);
  const { VerificationString } = useParams();
  const [, setToken] = useToken();

  useEffect(() => {
    const loadVerification = async () => {
      try {
        const response = await axios.put(
          `${import.meta.env.VITE_BASE_URL}verify-email`,
          {
            VerificationString,
          }
        );
        const { token } = response.data;
        setToken(token);

        setIsSuccess(true);
        setIsLoading(false);
      } catch (e) {
        setIsSuccess(false);
        setIsLoading(false);
      }
    };

    loadVerification();
  }, [setToken, VerificationString]);

  if (isLoading)
    return (
      <body id='loading'>
        <div>Loading...</div>
      </body>
    );
  if (!isSuccess) return <EmailNotVerified />;
  return <EmailVerified />;
};
