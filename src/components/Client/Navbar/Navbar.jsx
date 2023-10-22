import './Navbar.scss'
import logo from '../../../../public/logofa.png'
import {Icon, Menu} from 'semantic-ui-react'
import {Link} from 'react-router-dom'


export const Navbar = () => {
  return (
    <>
      <Menu fluid='top' className='top-menu-client'>
        <Menu.Item className='top-menu-client__logo'>
            <img  src={logo} alt="logo" />
          
        </Menu.Item>

        <Menu.Menu className='top-menu-client' position='left'>
            <Menu.Item className='top-menu-client__item'>
                <Link to="/">Inicio</Link>
            </Menu.Item>
            <Menu.Item className='top-menu-client__item'><Link to="/citas">Servicios</Link></Menu.Item>
            <Menu.Item className='top-menu-client__item'><Link to="/productos">Productos</Link></Menu.Item>
            
        </Menu.Menu>

        <Menu.Menu position='right'>
            <Menu.Item className='top-menu-client__item'><Link to="/admin">Ingresar</Link></Menu.Item>
            <Menu.Item className='top-menu-client__item'><Link to="/register">Regístrate</Link></Menu.Item>
        </Menu.Menu>  

        
      </Menu>
    </>
  )
}

