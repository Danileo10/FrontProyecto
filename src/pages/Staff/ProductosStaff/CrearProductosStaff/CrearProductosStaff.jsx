import { ProductoForm } from "../../../../components/Admin"
import { useAuth } from "../../../../hooks"
import { MensajeIsStaff } from "../../../Client"


const CrearProductosStaff = () => {
  const {auth} = useAuth()
  
  console.log(auth.me.is_staff)
  if (!auth.me.is_staff) {
    console.log("entro")
    
    return <MensajeIsStaff></MensajeIsStaff>}
  return (
    <>
      <ProductoForm>
        
      </ProductoForm>
    </>
  )
}

export default CrearProductosStaff
