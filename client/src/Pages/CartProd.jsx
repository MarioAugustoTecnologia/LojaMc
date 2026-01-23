import { useContext } from 'react'
import {CartContext} from "../Features/ContextProvider"


const CartProd = ({produto}) => { 
  

  const Increase = (id) => {

     const indexI = cart.findIndex(p => p.id === id)

     if(cart[indexI].quant < 10){

        dispatch({type: "Increase", id})
     }

  } 

  const Decrease = (id) => {

      const indexD = cart.findIndex(p => p.id === id)

          if(cart[indexD].quant > 1){

                dispatch({type: "Decrease", id})
           }

  }

  const {cart, dispatch} = useContext(CartContext)
   

return (


  
 
  
  <div className=' border mb-3'>
        <img src={`https://lojamcserver.onrender.com${produto.imagem}`} alt="" className='w-25 h-25' />
        <div className='detail ms-4'>
            <h5>{produto.descricao}</h5>            
            <h4 style={{color:'DarkMagenta', fontWeight:'bold'}}>R${produto.preco}</h4>        
            <div className='buttons'>
                <button className='rounded-circle px-2' onClick={() => Decrease(produto.id)}><b>-</b></button>
                <button className='rounded'>{produto.quant}</button>
                <button className='rounded-circle px-2' onClick={() => Increase(produto.id)}><b>+</b></button>
            </div>
            <button className='btn btn-sm btn-warning' onClick={() => dispatch({type: "Remove", id: produto.id})}>Remover</button>
            
        </div>       
  </div> 
  

  )
}

export default CartProd