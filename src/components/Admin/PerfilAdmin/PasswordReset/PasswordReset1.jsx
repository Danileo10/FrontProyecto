import { Form, Button } from 'semantic-ui-react';
import { Link, Navigate } from 'react-router-dom';
import React, { useState } from 'react';
import { EmailInputForm } from './EmailInputForm';
import { ResetPassword } from './ResetPassword';
import { VerificationCodeInputForm } from './VerificationCodeInputForm';
import { BASE_API } from '../../../../utils/constants';
import { useNavigate } from 'react-router-dom';

export const PasswordReset1 = () => {
    const [step, setStep] = useState(1);
    const [email, setEmail] = useState('');
    const [idUser, setidUser ] = useState('');
    const [codeVerification, setcodeVerification] = useState('');
    const navigate = useNavigate();

    const handleEmailSubmit =  () => {
        setStep(2)
    }
        
      const handleCodeVerificationSubmit = () => {
        setStep(3)
      };


      const handlePasswordChangeSubmit = () => {
        setStep(4)
      };
      const setID = (id) => {
        setidUser(id)
      }
    
    return (

        <div>
            {step === 1 && (
                <EmailInputForm

                    handleEmailSubmit={handleEmailSubmit}
                />
            )}
            {step === 2 && (
                <VerificationCodeInputForm
                    handleCodeVerificationSubmit={handleCodeVerificationSubmit}
                    setID = {setID}
                />
            )}
            {step === 3 && (
                <ResetPassword
                    id={idUser}
                    handlePasswordChangeSubmit={handlePasswordChangeSubmit}
                />
            )}
            {step === 4 && (
                navigate('/admin')
            )}
            
            
        </div>
    );
  
}
