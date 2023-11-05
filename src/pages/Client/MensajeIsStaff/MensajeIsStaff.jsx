import logo from '../../../../public/logofa.png'
import './MensajeIsStaff.scss';
import { Link } from 'react-router-dom'
export const MensajeIsStaff = () => {
  return (
    <>
        <div className='container'>
              <div className="contenedorMsg">
                  <img className='imgMsg' src={logo} alt="logo" />
                  <h1 className='msg'>Debes ser parte del Staff para ver esta vista</h1>
                  <Link to={'/home'}><button className='custom-btn btn-16'><h3>Ir al inicio</h3>o</button></Link>
              </div>

        </div>
        
    </>
  )
}


