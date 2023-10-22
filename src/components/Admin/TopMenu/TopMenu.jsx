import './TopMenu.scss';
import logo from '../../../../public/logofa.png'
import { Icon, Menu } from 'semantic-ui-react'
import { useAuth } from '../../../hooks'
import { Link } from 'react-router-dom'
import nav from "../../../../public/carro.svg"

export const TopMenu = () => {
  const { auth, logout } = useAuth();

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
            <img src={logo} alt="logo" className='logom'/>
          </Link>
         
        </Menu.Item>
        {auth.me.is_staff &&
          <Menu.Item className='top-menu-admin__item'>
            <Link to={"/admin/clientes"}>
              Clientes Admin
            </Link>
          </Menu.Item>
        }
        {auth.me.is_staff &&
          <Menu.Item className='top-menu-admin__item'>
            <Link to={"/admin/productos"}>
              Productos Admin
            </Link>
          </Menu.Item>
        }
        {auth.me.is_staff &&
          <Menu.Item className='top-menu-admin__item'>
            <Link to={"/admin/pedidos"}>
              Pedidos Admin
            </Link>
          </Menu.Item>
        }
        {auth.me.is_staff &&
          <Menu.Item className='top-menu-admin__item'>
            <Link to={"/admin/citas"}>
              Citas Admin
            </Link>
          </Menu.Item>
        }

        <Menu.Item className='top-menu-admin__item'>
          <Link to={"/client/mascotas"}>
            Mascotas
          </Link>
        </Menu.Item>

        <Menu.Item className='top-menu-admin__item'>
          <Link to={"/client/productos"}>
            Tienda
          </Link>
        </Menu.Item>

        <Menu.Item className='top-menu-admin__item'>
          <Link to={"/client/citas"}>
            Citas
          </Link>
        </Menu.Item>

        <Menu.Menu position='right'>
          <Menu.Item className='top-menu-admin__item_name'>
            Hola, {renderName()}
          </Menu.Item>

          <Menu.Item className='top-menu-admin__item_'>
            <Link to={"/client/carrito "}>
              <a href=""><img src={nav} alt="Icon" className='carrito' /></a>
            </Link>
          </Menu.Item>

          <Menu.Item className='top-menu-admin__item'>
            <Link to={"/perfil"}>
              Perfil
            </Link>
          </Menu.Item>

          <Link to={'/'}>
            <Menu.Item onClick={logout}>
              <Icon name='sign-out'></Icon>
            </Menu.Item>
          </Link>

        </Menu.Menu>
      </Menu>
    </>
  )
}

export default TopMenu
