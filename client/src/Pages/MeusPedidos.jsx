import { Link, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import React, { useEffect, useState, useContext } from "react";
import { CartContext } from "../Features/ContextProvider";
import { BsCart } from "react-icons/bs"


const MeusPedidos = () => {


  const getColor = (status) => {

    if (status === "Entregue") {

      return 'green'

    } else {
      if (status === "Em andamento") {

        return 'orange'

      } else {
        if (status === "Cancelado") {

          return 'red'

        }
      }


    }
  }

  const usuario = localStorage.getItem('usuario');
  console.log(usuario)

  const [pedido, setPedidos] = useState([])

  var table = pedido.filter(item => item.nome == usuario)


  useEffect(() => {
    fetch("https://lojamcserver.onrender.com/pedidos").then((res) => {

      return res.json()

    }).then((resp) => {

      setPedidos(resp)

    }).catch((err) => {
      console.log(err.message)
    })
  }, [])

 

     const { cart } = useContext(CartContext)


  return (
    <div className="">

         <div className="bg-secondary d-flex justify-content-between py-3 px-5 text-white" style={{ height: 100 }}>

           <Link to="/" className="navbar-brand fs-5 fw-bolder text-white" style={{ marginLeft: '-40px' }}>Inicio:<h6>{usuario}</h6></Link>
           <Link className="navbar-link fs-5 text-white" ><BsCart />{cart.length}</Link>
     
                  
         </div><br /><br /><br />

         <div className="container border">
            <br /><br />

           {
              table.map(item => (
                <tr key={item.id}>
            
                  <h6>{item.descricao}</h6>
             
                  <h6>{item.preco}</h6>
                  <h6>{item.quant}</h6>
                  <h6 style={{ color: getColor(item.status), fontWeight: 'bold' }}>{item.status}</h6>
                  <h6>{item.data_cad}</h6>
                  <h6>{item.total}</h6>
                  <hr />

                </tr>
              ))

            } 


         </div>            
 

      <footer className="py-4 bg-secondary d-flex justify-content-center" style={{ marginTop: "500px"}}>
        <p className="fw-bolder text-white">&copy; Multicompany Solutions</p>

      </footer>

    </div>
  )
}

export default MeusPedidos