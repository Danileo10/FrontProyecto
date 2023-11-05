import { ProductoForm } from "../../../../components/Admin"
import { useAuth } from "../../../../hooks"
import { Error404 } from "../../../Error404"

const CrearProductosStaff = () => {
  const {auth} = useAuth()
  
  console.log(auth.me.is_staff)
  if (!auth.me.is_staff) {
    console.log("entro")
    
    return <Error404></Error404>}
  return (
    <>
      <ProductoForm>
        
      </ProductoForm>
    </>
  )
}

export default CrearProductosStaff
