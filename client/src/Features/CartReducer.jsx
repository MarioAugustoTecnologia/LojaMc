export const totalitens = (cart) => {

    return cart.reduce((sum, produto) => sum + produto.quant, 0 )
}

export const totalpreco = (cart) => {

    return cart.reduce((total, produto) => total + produto.quant * produto.preco, 0 )
}


const CartReducer = (state, action) => {

    switch(action.type){

    case "Add": 
       return [...state, action.produto]

    case "Remove": 
       return state.filter(p => p.id !== action.id)

    case "Increase":
       const indexI = state.findIndex(p => p.id === action.id)
       state[indexI].quant = state[indexI].quant + 1;        
       return [...state]


    case "Decrease":
           const indexD = state.findIndex(p => p.id === action.id)
           state[indexD].quant = state[indexD].quant - 1;
           return  [...state]
        
        
    default:
      state
}

}

export default CartReducer