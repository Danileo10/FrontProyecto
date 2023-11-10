import { Navbar } from '../../components/Client'
import { FooterAdmin } from '../../components/Admin/FooterAdmin/FooterAdmin';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks';
import { useEffect } from 'react';
import './ClientLayout.scss';

export const ClientLayout = (props) => {
    const {children} = props;
    const {auth} = useAuth()
    const navigate = useNavigate('')

    useEffect(() => {
      if (auth) {
        navigate('/home');
      }
    }, [auth, navigate]);
  
    if (auth) {
      return null;
    }

  return (
    <>
      <div>
        <Navbar/>
       
      </div>

      
      <link rel="preconnect" href="https://fonts.googleapis.com"/>
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
      <link href="https://fonts.googleapis.com/css2?family=Manrope:wght@600&family=Poppins:wght@300;500&display=swap" rel="stylesheet"/>
      {children} 
      <FooterAdmin/>
    </>
  )
}

