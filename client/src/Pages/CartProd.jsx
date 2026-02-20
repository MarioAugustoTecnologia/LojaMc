import { useContext } from 'react'
import {CartContext} from "../Features/ContextProvider"


const CartProd = ({produto}) => {  


  

  const {cart, dispatch} = useContext(CartContext)


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

   

return ( 
  
  <div className=' border mb-3'>
        <img src={`https://lojamcserver.onrender.com${produto.imagem}`} alt="" className='w-25 h-25' />
         <div className='buttons'>
                <button className='rounded-circle px-2' onClick={() => Decrease(produto.id)}><b>-</b></button>
                <button className='rounded'>{produto.quant}</button>
                <button className='rounded-circle px-2' onClick={() => Increase(produto.id)}><b>+</b></button>
          </div>
   

            
  </div> 
  

  )
}

export default CartProd