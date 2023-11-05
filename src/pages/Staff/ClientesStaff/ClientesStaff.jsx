import { ClientesListado } from "../../../components/Staff"
import { useAuth } from "../../../hooks"
import { MensajeIsStaff } from "../../Client"


export const ClientesStaff = () => {
  const {auth} = useAuth()
  
  console.log(auth.me.is_staff)
  if (!auth.me.is_staff) {
    console.log("entro")
    
    return <MensajeIsStaff/>}
  return (
    <div>
      <ClientesListado>
        
      </ClientesListado>
    </div>
  )
}



