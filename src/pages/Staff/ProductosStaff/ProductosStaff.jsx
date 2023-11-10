import { ProductosListado } from "../../../components/Staff"
import { Link } from 'react-router-dom';
import { useAuth } from "../../../hooks";
import { MensajeIsStaff } from "../../Client";
import './ProductosStaff.scss'

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
      
      
    </div>
  )
}


