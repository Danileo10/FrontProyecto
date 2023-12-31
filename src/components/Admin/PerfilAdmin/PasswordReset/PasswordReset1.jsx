
import  { useState } from 'react';
import { EmailInputForm } from './EmailInputForm';
import { ResetPassword } from './ResetPassword';
import { VerificationCodeInputForm } from './VerificationCodeInputForm';

import { useNavigate } from 'react-router-dom';

export const PasswordReset1 = () => {
    const [step, setStep] = useState(1);
    
    const [idUser, setidUser ] = useState('');
    
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
                navigate('/home')
            )}
            
            
        </div>
    );
  
}
