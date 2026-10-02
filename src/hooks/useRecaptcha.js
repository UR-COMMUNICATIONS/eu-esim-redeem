import { useState, useRef, useCallback, useEffect } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import useModal from './useModal';

const useRecaptcha = () => {
  const [capchaToken, setCapchaToken] = useState('');
  const recaptchaRef = useRef(null);
  // const { setIsAuthDialogOpen } = useModal();


  const handleRecaptcha = useCallback((token) => {
    // console.log('token', token);
    setCapchaToken(token || '');
    // setIsAuthDialogOpen(true)
  }, []);

  useEffect(() => {
    const refreshCaptcha = () => {
      if (recaptchaRef.current && capchaToken) {
        recaptchaRef.current.reset();
        setCapchaToken('');
      }
    };

    let tokenRefreshTimeout = null;

    if (capchaToken) {
      tokenRefreshTimeout = setTimeout(refreshCaptcha, 110000); // 110 seconds
    }

    return () => {
      if (tokenRefreshTimeout) {
        clearTimeout(tokenRefreshTimeout);
      }
    };
  }, [capchaToken]);

  return { capchaToken, setCapchaToken, recaptchaRef, handleRecaptcha };
};

export default useRecaptcha;