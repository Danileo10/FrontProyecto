import { ProductosListado } from "../../../components/Staff"
import { Link } from 'react-router-dom';

export const ProductosStaff = () => {
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


