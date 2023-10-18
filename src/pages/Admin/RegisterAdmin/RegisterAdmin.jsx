import './RegisterAdmin.scss';
import { RegisterForm } from '../../../components/Admin/RegisterForm';
import logo from '../../../../public/logofa.png';
import { Link } from 'react-router-dom';

export const RegisterAdmin = () => {
  return (
    <>
      <Link to="/">
        <button>Ir a Home</button>
      </Link>
      <div className='register-admin'>
        <div className='register-admin__content'>
          <h1>Fieles Angelitos</h1>
          <img className='logo' src={logo} alt="Logo" />
          <RegisterForm />
        </div>
      </div>


    </>
  )
}


