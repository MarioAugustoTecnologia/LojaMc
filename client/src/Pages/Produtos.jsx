import { BsCart } from "react-icons/bs"
import React, { useContext, useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { CartContext } from "../Features/ContextProvider";
import 'bootstrap/dist/css/bootstrap.min.css'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2';


const Produtos = ({ produto }) => {

   //Função para Determinar a cor baseada na condição:

   const getColor = (status) => {

      if (status === "Produto Disponivel") {

         return 'green'
      } else {

         return 'red'
      }
   }

   const { cart } = useContext(CartContext)
   const { dispatch } = useContext(CartContext)

   const [produtodata, setProdutodata] = useState([])
   const [buscanome, setBuscaNome] = React.useState("")

   const buscarap = buscanome.toLowerCase()

   var produtos = produtodata.filter(item => item.descricao.toLowerCase().includes(buscarap))

   useEffect(() => {

      fetch("https://lojamcserver.onrender.com/produtos").then((res) => {

         return res.json()

      }).then((resp) => {

         setProdutodata(resp)

      }).catch((err) => {
         console.log(err.message)
      })

   }, [])


   function SairdaConta() {

      const loggedIn = localStorage.getItem('userLoggedIn');

      if (loggedIn === 'true') {

         Swal.fire({
            title: "Deseja sair ?",
            text: "Você não poderá reverter isso !",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sim"
         }).then((result) => {

            if (result.isConfirmed) {

               document.getElementById('user').style.display = "none";
               localStorage.clear()
               console.clear();
               window.location.href = '/login';
            }
         });


      }

   }


   const ComparaCadastro = () => {

      const loggedIn = localStorage.getItem('userLoggedIn');

      if (loggedIn === 'true') {

         Swal.fire("Você já possui Cadastro e esta Logado !");


      } else {

         window.location.href = '/cadusuario';
      }


   }

   const ComparaLogin = () => {

      const loggedIn = localStorage.getItem('userLoggedIn');

      if (loggedIn === 'true') {

         Swal.fire("Você já esta Logado !");


      } else {

         window.location.href = '/login';
      }

   }

   const usuario = localStorage.getItem('usuario');
   //const boasvindas = "Bem vindo; "   

   return (

    <div className="">

      <div className="bg-secondary" style={{height:75, width:'27%', margin:'0 600px'}}>
         <div className="d-flex"> 
               <label htmlFor="" style={{color:'white', margin:'0 10px'}}>Pesquisar:</label>
               <input type="search" style={{ width: "130px", height: '25px', margin:'0 5px'}} className="form-control rounded-0" value={buscanome} onChange={(e) => setBuscaNome(e.target.value)} />
               <Link to="/carrinho" className=" text-white" style={{ margin: '0 12px' }}><BsCart style={{fontSize: '20px' }} />{cart.length} </Link>
               <div className="">
                  <Link to="" style={{ color: 'white', fontSize: '13px'}} onClick={ComparaCadastro}>Não Possui Conta ? Criar:</Link><br />                        
                  <Link to="" onClick={ComparaLogin} style={{ color: 'white', fontSize: '13px' }}>Já Possui Conta ? - Faça o Login: </Link><br />
                  <Link style={{ color: 'white', fontSize:'15px'}} onClick={SairdaConta}>Sair:</Link>
               </div>            

         </div>
           <h6 style={{color:'white', margin:'0 20px'}}>{usuario}</h6>    
         
         
      </div>

       <div className='container mt-5'>


            <div className='row row-cols-1 row-cols-md-3 g-4'>

               {

                  produtos.map(produto => {

                     return (
                        <div className='box' key={produto.id}>
                           <img src={`http://localhost:8000${produto.imagem}`} />
                           <br />
                           <h7>{produto.descricao}</h7>
                           <h5 style={{ color: 'DarkMagenta', fontWeight: 'bold' }}>R${produto.preco}</h5>
                           <h5 style={{ fontWeight: 'bold', color: getColor(produto.status) }}>{produto.status}</h5>
                           <br />
                           <button style={{ fontSize: '13px' }} id="botao" className='btn btn-primary' onClick={() => dispatch({ type: "Add", produto: produto })} >adicionar ao carrinho</button>
                        </div>
                     )

                  })
               }

            </div>
            <ToastContainer />

         </div>          
        
        
         <footer className="py-4 bg-secondary d-flex justify-content-center" style={{ marginTop: "500px" }}>
            <p className="fw-bolder text-white">&copy; Multicompany Solutions</p>

         </footer>
         



      </div>




   )
}

export default Produtos