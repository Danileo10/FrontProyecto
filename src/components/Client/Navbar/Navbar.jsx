import './Navbar.scss'
import logo from '../../../../public/logofa.png'
import {Icon, Menu} from 'semantic-ui-react'
import {Link} from 'react-router-dom'


export const Navbar = () => {
  return (
    <>
      <Menu fluid='top' className='top-menu-client'>
        <Menu.Item className='top-menu-client__logo'>
            
            <Link to="/"><img className='logo_cliente' src={logo} alt="logo" /></Link>
        </Menu.Item>

        <Menu.Menu className='top-menu-client' position='left'>
            <Menu.Item className='top-menu-client__item'>
                <Link to="/"><button className="botonNavbar">Inicio</button></Link>
            </Menu.Item>
            <Menu.Item className='top-menu-client__item'><Link to="/citas"><button className="botonNavbar">Servicios</button></Link></Menu.Item>
            <Menu.Item className='top-menu-client__item'><Link to="/productos"><button className="botonNavbar">Productos</button></Link></Menu.Item>
            
        </Menu.Menu>

        <Menu.Menu position='right'>
            <Menu.Item className='top-menu-client__item'><Link to="/home"><button className="botonNavbar">Ingresar</button></Link></Menu.Item>
            <Menu.Item className='top-menu-client__item'><Link to="/register"><button className="botonNavbar">Regístrate</button></Link></Menu.Item>
        </Menu.Menu>  

        
      </Menu>
    </>
  )
}

