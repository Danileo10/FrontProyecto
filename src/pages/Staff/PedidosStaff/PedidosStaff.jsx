import { PedidosAdmin } from "../../../components/Admin"
import { useAuth } from "../../../hooks"
import { MensajeIsStaff } from "../../Client"


export const PedidosStaff = () => {
  const {auth} = useAuth()
  
  console.log(auth.me.is_staff)
  if (!auth.me.is_staff) {
    console.log("entro")
    
    return <MensajeIsStaff></MensajeIsStaff>}
  return (
    <PedidosAdmin>
      
    </PedidosAdmin>
  )
}

