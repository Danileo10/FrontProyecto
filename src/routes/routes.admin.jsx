import { PasswordReset1 } from '../components/Admin';
import { ClientVerification } from '../components/Admin/PerfilAdmin/ClientVerification';
import {AdminLayout, ClientLayout} from '../layouts';
import {CarritodeCompras, HomeAdmin, Pedidos, Perfil, ProductosAdmin} from '../pages';
import { RegisterAdmin, MascotasAdmin, CitasAdmin } from '../pages';
import { CitasStaff, ClientesStaff, PedidosStaff, ProductosStaff } from '../pages/Staff';
import CrearProductosStaff from '../pages/Staff/ProductosStaff/CrearProductosStaff/CrearProductosStaff';



const routesAdmin = [
    {
        path: "/home",
        layout : AdminLayout,
        component : HomeAdmin
    },
    {
        path: "/client/register",
        layout : AdminLayout,
        component : RegisterAdmin
    },
    {
        path: "/client/mascotas",
        layout : AdminLayout,
        component : MascotasAdmin,
    },
    {
        path: "/client/citas",
        layout: AdminLayout,
        component : CitasAdmin,
    },
    {
        path: "/perfil",
        layout: AdminLayout,
        component: Perfil,
    },
    {
        path: "/client/verification/:token",
        layout: AdminLayout,
        component: ClientVerification
    },
    {
        path: "/client/resetpassword/correo",
        layout: ClientLayout,
        component: PasswordReset1
    },
    {
        path: "/client/productos",
        layout: AdminLayout,
        component: ProductosAdmin,
    },
    {
        path: "/client/pedidos",
        layout: AdminLayout,
        component: Pedidos
    },
    {
        path: "/client/carrito",
        layout: AdminLayout,
        component: CarritodeCompras
    },
    {
        path: "/admin/usuarios",
        layout: AdminLayout,
        component: ClientesStaff,
    },
    {
        path: "/admin/productos",
        layout: AdminLayout,
        component: ProductosStaff,
    },
    {
        
    },
    {
        path: "/admin/productos/crear",
        layout: AdminLayout,
        component: CrearProductosStaff
    },
    {
        path: "/admin/pedidos",
        layout: AdminLayout,
        component: PedidosStaff,
    },
    {
        path: "/admin/citas",
        layout: AdminLayout,
        component: CitasStaff
    }
]

export default routesAdmin