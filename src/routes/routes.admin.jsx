import { PasswordReset1 } from '../components/Admin';
import { ClientVerification } from '../components/Admin/PerfilAdmin/ClientVerification';
import { ClientesEditar } from '../components/Staff';
import {AdminLayout, ClientLayout} from '../layouts';
import {CarritodeCompras, HomeAdmin, Perfil, ProductosAdmin} from '../pages';
import { RegisterAdmin, MascotasAdmin, CitasAdmin } from '../pages';
import { CitasStaff, ClientesStaff, PedidosStaff, ProductosStaff, EditarProductosStaff } from '../pages/Staff';
import CrearProductosStaff from '../pages/Staff/ProductosStaff/CrearProductosStaff/CrearProductosStaff';



const routesAdmin = [
    {
        path: "/admin",
        layout : AdminLayout,
        component : HomeAdmin
    },
    {
        path: "/admin/register",
        layout : AdminLayout,
        component : RegisterAdmin
    },
    {
        path: "/admin/mascotas",
        layout : AdminLayout,
        component : MascotasAdmin,
    },
    {
        path: "/admin/citas",
        layout: AdminLayout,
        component : CitasAdmin,
    },
    {
        path: "/admin/perfil",
        layout: AdminLayout,
        component: Perfil,
    },
    {
        path: "/admin/verification/:token",
        layout: ClientLayout,
        component: ClientVerification
    },
    {
        path: "/admin/resetpassword/correo",
        layout: ClientLayout,
        component: PasswordReset1
    },
    {
        path: "/admin/productos",
        layout: AdminLayout,
        component: ProductosAdmin,
    },
    {
        path: "/admin/carrito",
        layout: AdminLayout,
        component: CarritodeCompras
    },
    {
        path: "/staff/clientes",
        layout: AdminLayout,
        component: ClientesStaff,
    },
    {
        path: "/staff/clientes/editar/:id",
        layout: AdminLayout,
        component: ClientesEditar,
    },
    {
        path: "/staff/productos",
        layout: AdminLayout,
        component: ProductosStaff,
    },
    {
        path: "/staff/productos/crear",
        layout: AdminLayout,
        component: CrearProductosStaff
    },
    {
        path: "/staff/productos/editar/:id",
        layout: AdminLayout,
        component: EditarProductosStaff
    },
    {
        path: "/staff/pedidos",
        layout: AdminLayout,
        component: PedidosStaff,
    },
    {
        path: "/staff/citas",
        layout: AdminLayout,
        component: CitasStaff
    }
]

export default routesAdmin