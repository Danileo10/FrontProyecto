import {Navigation} from './routes'
import 'semantic-ui-css/semantic.min.css'
import "./App.scss"
import { AuthProvider } from './context'

export const App = () => {
  return (
    <> 
      <AuthProvider>
        <Navigation/>
      </AuthProvider>
        
    </>
    
    
  )
}


