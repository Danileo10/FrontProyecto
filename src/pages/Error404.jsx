import { Link } from "react-router-dom"
import logo from '../../public/logofa.png'

export const Error404 = () => {
  return (
    <>
       <div className='container'>
              <div className="contenedorMsg">
                  <img className='imgMsg' src={logo} alt="logo" />
                  <h1>ERROR 404</h1>
                  <h2 className='msg'>Esta página no existe</h2>
                  <Link to={'/'}><button className='custom-btn btn-16'><h3>Ir al inicio</h3>o</button></Link>
              </div>

        </div>
        
    </>
  )
}

