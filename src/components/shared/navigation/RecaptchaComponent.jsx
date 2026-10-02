
// 1. First, install the react-google-recaptcha package
// npm install react-google-recaptcha --save

// 2. Create a ReCaptcha component
import React, { useRef, useEffect } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';

const RecaptchaComponent = ({ onVerify }) => {
  const recaptchaRef = useRef(null);
  const siteKey = import.meta.env.VITE_captchaKey;

  const handleRecaptchaChange = (token) => {
    if (onVerify) {
      onVerify(token);
    }
  };

  return (
    <div className="recaptcha-container">
      <ReCAPTCHA
        ref={recaptchaRef}
        sitekey={siteKey}
        onChange={handleRecaptchaChange}
      />
    </div>
  );
};

export default RecaptchaComponent;

