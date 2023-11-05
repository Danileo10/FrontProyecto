import { ProductosListado } from "../../../components/Staff"
import { Link } from 'react-router-dom';
import { useAuth } from "../../../hooks";
import { MensajeIsStaff } from "../../Client";

export const ProductosStaff = () => {
  const {auth} = useAuth()
  
  console.log(auth.me.is_staff)
  if (!auth.me.is_staff) {
    console.log("entro")
    
    return <MensajeIsStaff></MensajeIsStaff>}
  return (
    <div>
      <ProductosListado>
        
      </ProductosListado>
      <Link to={"/admin/productos/crear"}>
          <button className="editar">
            Crear Producto
          </button>
      </Link>
      
    </div>
  )
}


