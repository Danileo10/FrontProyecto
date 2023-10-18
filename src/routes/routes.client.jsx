import  {ClientLayout, BasicLayout} from '../layouts'
import  {Home, Productos, RegisterAdmin, CitasClient} from '../pages'

const routesClient = [
    {
        path: '/',
        layout: ClientLayout,
        component : Home
    },
    {
        path: '/productos',
        layout: ClientLayout,
        component : Productos
    },
    {
        path: '/register',
        layout: BasicLayout,
        component : RegisterAdmin
    },
    {
        path: '/citas',
        layout: ClientLayout,
        component : CitasClient
    }
]

export default routesClient