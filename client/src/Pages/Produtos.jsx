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

          <nav className="d-flex bg-secondary text-white " style={{height:20}}>               


            <div className="d-flex justify-content-center">
               <a href="" className="navbar-brand text-white" style={{fontSize:'15px'}}>Pesquisar:</a>
               <input type="search" style={{ margin: "0 12px", width: "130px", height: '25px'}} className="form-control rounded-0" value={buscanome} onChange={(e) => setBuscaNome(e.target.value)}  />
                         
            </div>
            <Link to="/carrinho" className="navbar-link fs-5 text-white" style={{margin:'-5px'}}><BsCart style={{margin:'10px', fontSize:'20px'}} />{cart.length} </Link>
         </nav>                  
    
         <div className="d-flex justify-content-between bg-secondary py-3 px-5 text-white">
            <h5 className="text-white" id="user" style={{marginBlock:'10px', fontSize:'15px'}} > {usuario}</h5>
            <Link className="navbar-link fs-5 text-white"><a style={{fontSize:'15px', margin:'-650px'}} onClick={SairdaConta}>Sair:</a></Link>
            <div className="">
               <Link to="" style={{ color: 'white' , fontSize:'13px', margin:'-1680px'}} onClick={ComparaCadastro}>Não Possui Conta ? Criar Conta:</Link><br />
               <Link to="" onClick={ComparaLogin} style={{ color: 'white', fontSize:'13px', margin:'-1680px' }}>Já Possui Conta ? - Faça o Login: </Link>

            </div>
            

         </div>

         <div className='container mt-5'>


            <div className='row row-cols-1 row-cols-md-3 g-4'>

               {

                  produtos.map(produto => {

                     return (
                        <div className='box' key={produto.id}>
                           <img src={`https://lojamcserver.onrender.com${produto.imagem}`} />
                           <br />
                           <h5>{produto.descricao}</h5>
                           <h4 style={{ color: 'DarkMagenta', fontWeight: 'bold' }}>R${produto.preco}</h4>
                           <h5 style={{ fontWeight: 'bold', color: getColor(produto.status) }}>{produto.status}</h5>
                           <br />
                           <button id="botao" className='btn btn-primary' onClick={() => dispatch({ type: "Add", produto: produto })} >adicionar ao carrinho</button>
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