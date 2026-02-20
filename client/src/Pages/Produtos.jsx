import { BsCart } from "react-icons/bs"
import React, { useContext, useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { CartContext } from "../Features/ContextProvider";
import 'bootstrap/dist/css/bootstrap.min.css'
import Swal from 'sweetalert2';



const Produtos = () => { 
 

   const getColor = (status) => {

      if (status === "Produto Disponivel") {

         return 'green'
      } else {

         return 'red'
      }
   }

   
   const usuario = localStorage.getItem('usuario');

   
   const { cart } = useContext(CartContext)
   const { dispatch } = useContext(CartContext)

    const navigate = useNavigate()
 
   

  const handleInsertBuy = (id) => {
      
    
      navigate("/carrinho/" + id);  

} 

   const [produtodata, setProdutodata] = useState([])
   const [buscanome, setBuscaNome] = React.useState("")

   const buscarap = buscanome.toLocaleLowerCase();

   const produtos = produtodata.filter(produto => produto.descricao.toLowerCase().includes(buscarap))



   useEffect(() => {
    
      fetch('"https://lojamcserver.onrender.com/produtos')
         .then(response => response.json())
         .then(data => {
            setProdutodata(data); // Armazena o array completo no estado

         })
         .catch(error => {
            console.error("Erro ao buscar:", error);

         });
   }, []);


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

   function VerificaUsuario(){

      if(usuario){
         navigate('/meuspedidos')
      }
   }


  
   return (

      <div className="">

         <div className="bg-secondary" style={{ height: 100 }}>
            <div className="d-flex">
               <label htmlFor="" style={{ color: 'white', margin: '0 10px' }}>Busca:</label>
               <input type="search" autoFocus style={{ width: "100px", height: '25px', margin: '0 5px' }} className="form-control rounded-0" value={buscanome} onChange={(e) => setBuscaNome(e.target.value)} id="busca" />
               <Link to="" className=" text-white" style={{ margin: '0 8px' }}><BsCart style={{ fontSize: '20px' }} />{cart.length} </Link>
               <div className="">
                  <Link to="" style={{ color: 'white', fontSize: '13px' }} onClick={ComparaCadastro}>Não Possui Conta ? Criar:</Link><br />
                  <Link to="" onClick={ComparaLogin} style={{ color: 'white', fontSize: '13px' }}>Já Possui Conta ? - Faça o Login: </Link><br />
                  <Link style={{ color: 'white', fontSize: '15px' }} onClick={SairdaConta}>Sair:</Link>               
                  <a style={{ color: 'white', margin: '0 -240px', marginTop: '-25px', fontSize: '14px' }} id="user">{usuario}</a><br />
                  <a onClick={VerificaUsuario} style={{ color: 'white', fontSize:'14px', cursor:'pointer'}} >Meus Pedidos:</a>
               </div>

            </div>

         </div>
         <div className='container mt-5'>

            <div className='row row-cols-1 row-cols-md-3 g-4'>
               {
                  produtos.map((produto) => (

                     <div className='box'>
                        <img src={`"https://lojamcserver.onrender.com${produto.imagem}`} />
                        <br />
                        <span id="desc">{produto.descricao}</span>
                        <h5 style={{ color: 'DarkMagenta', fontWeight: 'bold' }} id="preco">{"R$" + produto.preco}</h5>
                        <h5 style={{ fontWeight: 'bold', color: getColor(produto.status) }} id="status">{produto.status}</h5>
                        <br />
                        <button style={{ fontSize: '13px' }} id="botao" className='btn btn-primary' onClick={() => {handleInsertBuy(produto.id)}} onMouseDown={() => dispatch({ type: "Add", produto: produto })}>adicionar ao carrinho</button>            
                                                  
                     </div>
                  ))}
            </div>

   

         </div>


         <footer className="py-4 bg-secondary d-flex justify-content-center" style={{ marginTop: "500px" }}>
            <p className="fw-bolder text-white">&copy; Multicompany Solutions</p>

         </footer>



      </div>


   )
}

export default Produtos