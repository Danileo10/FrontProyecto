import './TopMenu.scss';
import logo from '../../../../public/logofa.png'
import { Menu } from 'semantic-ui-react'
import { useAuth } from '../../../hooks'
import { Link } from 'react-router-dom'
import nav from "../../../../public/carro.svg"
import logout_top from "../../../../public/logout1.svg"
import {useState} from 'react'

export const TopMenu = () => {
  const { auth, logout } = useAuth();
  const [modoCliente, setModoCliente] = useState(true); // Inicialmente, el modo cliente está activado
  const [showAdminOptions, setShowAdminOptions] = useState(false); // Controla si las opciones de modo admin deben mostrarse o no


  const toggleAdminOptions = () => {
    setShowAdminOptions(!showAdminOptions);
  };

  const renderName = () => {
    if (auth.me?.nombre && auth.me?.apellido) {
      return `${auth.me?.nombre} ${auth.me.apellido}`
    }

    return auth.me?.email

    
  }
  
  return (
    <>
      <Menu fixed='top' className='top-menu-admin'>
        <Menu.Item className='top-menu-admin__logo'>
          <Link to="/home">
            <img src={logo} alt="logo" className='logom' />
          </Link>

        </Menu.Item>
        {auth.me.is_staff && showAdminOptions && (
  <>
    <Menu.Item className='top-menu-admin__item'>
      <Link to={"/admin/usuarios"}>
        <button className="botonNavbar">Gestionar Usuario</button>
        
      </Link>
    </Menu.Item>

    <Menu.Item className='top-menu-admin__item'>
      <Link to={"/admin/productos"}>
        <button className="botonNavbar">Gestionar Productos</button>
      </Link>
    </Menu.Item>

    <Menu.Item className='top-menu-admin__item'>
      <Link to={"/admin/pedidos"}>
        <button className="botonNavbar">Gestionar Pedidos</button>
      </Link>
    </Menu.Item>

    <Menu.Item className='top-menu-admin__item'>
      <Link to={"/admin/citas"}>
       <button className="botonNavbar">Gestionar Citas</button>
      </Link>
    </Menu.Item>
  </>
)}

        {modoCliente && (
          <>
            <Menu.Item className='top-menu-admin__item'>
              <Link to={"/client/mascotas"}>
                <button className="botonNavbar">Mascotas</button>
              </Link>
            </Menu.Item>

            <Menu.Item className='top-menu-admin__item'>
              <Link to={"/client/productos"}>
                <button className="botonNavbar">Tienda</button>
              </Link>
            </Menu.Item>

            <Menu.Item className='top-menu-admin__item'>
              <Link to={"/client/citas"}>
               <button className="botonNavbar">Citas</button>
              </Link>
            </Menu.Item>

            <Menu.Item className='top-menu-admin__item'>
              <Link to={"/client/pedidos"}>
                <button className="botonNavbar">Pedidos</button>
              </Link>
            </Menu.Item>
          </>
        )}

        <Menu.Menu position='right'>
          <Menu.Item className='top-menu-admin__item_name'>
            Hola, {renderName()}
          </Menu.Item>

          {modoCliente &&
            <Menu.Item className='top-menu-admin__item_'>
            <Link to={"/client/carrito "}>
              <a href=""><img src={nav} alt="Icon" className='carrito' /></a>
            </Link>
          </Menu.Item>}
          

          <Menu.Item className='top-menu-admin__item'>
            <Link to={"/perfil"}>
              <button className="botonNavbar">Perfil</button>
            </Link>
          </Menu.Item>
          {auth.me.is_staff && 
          <Menu.Item className='top-menu-admin__item'>
            <button className="botonNavbar" onClick={() => {
                toggleAdminOptions();
                setModoCliente(!modoCliente);
              }}>
                {modoCliente ? 'Activar Modo Admin' : 'Activar Modo Cliente'}
              </button>
          </Menu.Item>
        }
          

          <Link to={'/'}>
            <Menu.Item onClick={logout}>
              <a href=""><img src={logout_top} alt="Icon" className='logout_top' /></a>
            </Menu.Item>
          </Link>

        </Menu.Menu>
      </Menu>
    </>
  )
}

export default TopMenu
