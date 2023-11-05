import { CitasListado } from "../../../components/Staff"
import { useAuth } from "../../../hooks"

import { Error404} from './../../Error404'

export const CitasStaff = () => {
  const {auth} = useAuth()
  
  console.log(auth.me.is_staff)
  if (!auth.me.is_staff) {
    console.log("entro")
    
    return <Error404></Error404>
    
    
    
  }

  return (
    <div>
      <CitasListado>
        
      </CitasListado>
    </div>
  )
}

