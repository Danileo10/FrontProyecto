import {Navigation} from './routes'
import 'semantic-ui-css/semantic.min.css'
import "./App.scss"
import { AuthProvider } from './context'

export const App = () => {

  const handleStorageChange = (e) => {
    if (e.key === 'tokenRemovedAt') {
        // Recarga la página después de un breve retraso
        setTimeout(() => {
            window.location.reload(true);
        }); // Puedes ajustar el tiempo de espera según tus necesidades
    }
    if (e.key === 'tokenSetAt') {
      // Recarga la página después de un breve retraso
      setTimeout(() => {
          window.location.reload(true);
      }, 500); // Puedes ajustar el tiempo de espera según tus necesidades
  }
};

// Agrega un escuchador de eventos para el evento 'storage'
window.addEventListener('storage', handleStorageChange);

// Agrega un escuchador de eventos para el evento 'storage'
window.addEventListener('storage', handleStorageChange);
  return (
    <> 
      <AuthProvider>
        <Navigation/>
      </AuthProvider>
        
    </>
    
    
  )
}


