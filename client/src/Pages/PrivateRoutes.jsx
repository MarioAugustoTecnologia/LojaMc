import { Navigate } from 'react-router-dom';

const PrivateRoutes = ({children}) => { 
  
  return localStorage.getItem('usuario') ? children : <Navigate to='/adminroot/pedidos'/> 
    
  
}

export default PrivateRoutes