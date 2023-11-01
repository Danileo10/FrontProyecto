import './RegisterAdmin.scss';
import { RegisterForm } from '../../../components/Admin/RegisterForm';
import logo from '../../../../public/logofa.png';
import logoHome from '../../../../public/house.svg';
import { Link } from 'react-router-dom';
import "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/js/fontawesome.min.js"

export const RegisterAdmin = () => {
  return (
    <>
      
      <div className='register-admin'>
        
        <div className='register-admin__content'>
          {/* <h1>Angelitos Fieles</h1> */}
          <img className='logo' src={logo} alt="Logo" />
          <RegisterForm />
          <Link to="/" className='link'>
            <button className='volver'><img src={logoHome} alt="" className="src" /></button>
          </Link>
        </div>
      </div>

    </>
  )
}


