import './RegisterAdmin.scss';
import { RegisterForm } from '../../../components/Admin/RegisterForm';
import logo from '../../../../public/logofa.png';
import { Link } from 'react-router-dom';

export const RegisterAdmin = () => {
  return (
    <>
      
      <div className='register-admin'>
        
        <div className='register-admin__content'>
          <h1>Angelitos Fieles</h1>
          <img className='logo' src={logo} alt="Logo" />
          <RegisterForm />
          <Link to="/">
            <button className='volver'>Volver al Inicio</button>
          </Link>
        </div>
      </div>


    </>
  )
}


