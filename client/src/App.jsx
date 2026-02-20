import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Produtos from './Pages/Produtos'
import Cart from './Pages/Cart'
import CadUsuario from './Pages/CadUsuario'
import Login from './Pages/Login'
import Pedidos from './Pages/Pedidos'
import PrivateRoutes from './Pages/PrivateRoutes'
import EditStatusPed from './Pages/EditStatusPed'
import ConsultaNome from './Pages/ConsultaNome'
import ConsultaStatus from './Pages/ConsultaStatus'
import CadProdutos from './Pages/CadProdutos'
import ListaProdutos from './Pages/ListaProdutos'
import EditProdutos from './Pages/EditProdutos'
import MeusPedidos from './Pages/MeusPedidos'


function App() {

  return (
    
      <div className='App'>
         <BrowserRouter>
           <Routes>
              <Route path='/' element={<Produtos />}></Route>
              <Route path='/carrinho' element={<Cart />}></Route>
              <Route path='/cadusuario' element={<CadUsuario />}></Route>
              <Route path='/login' element={<Login />}></Route>
               <Route path='/meuspedidos' element={<PrivateRoutes><MeusPedidos /></PrivateRoutes>}></Route>
              <Route path='/adminroot/pedidos' element={<PrivateRoutes><Pedidos /></PrivateRoutes>}></Route>
              <Route path='/adminroot/pedidos/status/editar/:pedidocod' element={<PrivateRoutes><EditStatusPed /></PrivateRoutes>}></Route>
              <Route path='/adminroot/pedidos/consulta/nome' element={<PrivateRoutes><ConsultaNome /></PrivateRoutes>}></Route>
              <Route path='/adminroot/pedidos/consulta/status' element={<PrivateRoutes><ConsultaStatus /></PrivateRoutes>}></Route>                    
              <Route path='/adminroot/pedidos/cadprodutos' element={<PrivateRoutes><CadProdutos /></PrivateRoutes>}></Route>
               <Route path='/adminroot/pedidos/consulta/produtos' element={<PrivateRoutes><ListaProdutos /></PrivateRoutes>}></Route>
               <Route path='/adminroot/pedidos/produtos/editar/:produtocod' element={<PrivateRoutes><EditProdutos /></PrivateRoutes>}></Route>
         
           </Routes>
         </BrowserRouter>        
        
        
      </div> 
           

  )
}

export default App
