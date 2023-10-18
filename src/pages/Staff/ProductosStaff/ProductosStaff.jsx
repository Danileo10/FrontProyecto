import { ProductosListado } from "../../../components/Staff"
import { Link } from 'react-router-dom';

export const ProductosStaff = () => {
  return (
    <div>
      <ProductosListado>
        
      </ProductosListado>
      <Link to={"/staff/productos/crear"}>
          Crear Producto
      </Link>
      
    </div>
  )
}


