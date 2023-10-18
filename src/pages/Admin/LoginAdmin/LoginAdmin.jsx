import './LoginAdmin.scss';
import {LoginForm} from '../../../components/Admin/LoginForm'
import logo from '../../../../public/logofa.png';

export const LoginAdmin = () => {
  return (
    <>
      <div className='login-admin'>
        <div className='login-admin__content'>
          <h1>Fieles Angelitos</h1>
          <img className='logo' src={logo} alt="Logo" />
          <LoginForm/>
        </div>
      </div>
    </>
    
    
  )
}


