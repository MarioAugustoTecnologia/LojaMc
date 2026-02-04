import { Link } from "react-router-dom";
import { CartContext } from "../Features/ContextProvider"
import { useContext, useState } from "react";
import CartProd from "./CartProd";
import { BsCart } from "react-icons/bs"
import { totalitens, totalpreco } from "../Features/CartReducer";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2';


const Cart = () => {

   const { cart } = useContext(CartContext)

   const [dados, setDados] = useState("")
   const [nome, setNome] = useState("")
   const [cidade, setCidade] = useState("")
   const [bairro, setBairro] = useState("")
   const [cep, setCep] = useState("")
   const [ruaav, setRuaav] = useState("")
   const [numero, setNumero] = useState("")
   const [formapag, setformapag] = useState("")
   const [fone, setFone] = useState("")

   const total = "R$" + (totalpreco(cart)).toFixed(2); 

   var status = 'Em andamento'

   const isValidate = () => {
      let isproceed = true
      let errormessage = "Campos não podem estar vazio  !"

      if (nome === null || nome === '') {
         document.getElementById('nome').style.borderColor = 'red';
         isproceed = false
         //errormessage += 'Nome Completo:' 
      }
      if (dados === null || dados === '') {
         document.getElementById('dados').style.borderColor = 'red';
         isproceed = false
         // errormessage += 'Email:' 
      }

      if (cidade === null || cidade === '') {
         document.getElementById('cidade').style.borderColor = 'red';
         isproceed = false
         //errormessage += 'Telefone:' 
      }

      if (bairro === null || bairro === '') {

         document.getElementById('bairro').style.borderColor = 'red';
         isproceed = false
         //errormessage += 'Telefone:' 
      }
      if (cep === null || cep === '') {

         document.getElementById('cep').style.borderColor = 'red';
         isproceed = false
         //errormessage += 'Telefone:' 
      }
      if (ruaav === null || ruaav === '') {

         document.getElementById('rua').style.borderColor = 'red';
         isproceed = false
         //errormessage += 'Telefone:' 
      }
      if (numero === null || numero === '') {

         document.getElementById('numero').style.borderColor = 'red';
         isproceed = false
         //errormessage += 'Telefone:' 
      }
      if (formapag === null || formapag === '') {

         document.getElementById('formapag').style.borderColor = 'red';
         isproceed = false
         //errormessage += 'Telefone:' 
      }
      if (fone === null || fone === '') {

         document.getElementById('fone').style.borderColor = 'red';
         isproceed = false
         //errormessage += 'Telefone:' 
      }
      if (dados === null || dados === '') {

         document.getElementById('dados').style.borderColor = 'red';
         isproceed = false
         //errormessage += 'Telefone:' 
      }
      if (!isproceed) {
         toast.warning(errormessage)
      }

      return isproceed
   }

   function MudaCorDados() {
      document.getElementById('dados').style.borderColor = 'Gainsboro'
   }

   function MudaCorNome() {
      document.getElementById('nome').style.borderColor = 'Gainsboro'
   }

   function MudaCorCidade() {
      document.getElementById('cidade').style.borderColor = 'Gainsboro'
   }

   function MudaCorBairro() {
      document.getElementById('bairro').style.borderColor = 'Gainsboro'
   }

   function MudaCorCep() {
      document.getElementById('cep').style.borderColor = 'Gainsboro'
   }

   function MudaCorRuaAv() {
      document.getElementById('rua').style.borderColor = 'Gainsboro'
   }
   function MudaCorNumero() {
      document.getElementById('numero').style.borderColor = 'Gainsboro'
   }
   function MudaCorForma() {
      document.getElementById('formapag').style.borderColor = 'Gainsboro'
   }
   function MudaCorFone() {
      document.getElementById('fone').style.borderColor = 'Gainsboro'

   }


   function formataData() {
      let data = new Date(),
         dia = data.getDate().toString().padStart(2, '0'),
         mes = (data.getMonth() + 1).toString().padStart(2, '0'),
         ano = data.getFullYear();
      return `${dia}/${mes}/${ano}`;
   }


   const data_cad = formataData();

   const cadastrar = (e) => {

      e.preventDefault();

      const loggedIn = localStorage.getItem('userLoggedIn');

      if (loggedIn !== 'true') {
         Swal.fire("Usuario não Logado e/ou não Cadastrado !"); 
         //return false

      } else {

         const caddados = { nome, dados, cidade, bairro, cep, ruaav, numero, formapag, fone, status, data_cad, total }


         if (isValidate()) {

            Swal.fire({
               title: "Deseja salvar ?",
               showDenyButton: true,
               showCancelButton: true,
               confirmButtonText: "Salvar",
               denyButtonText: `Não salvar`
            }).then((result) => {

               if (result.isConfirmed) {

                  fetch("https://lojamcserver.onrender.com/pedidos", {
                     method: "POST",
                     headers: { 'content-type': 'application/json' },
                     body: JSON.stringify(caddados)
                  }).then((res) => {
                     limpar();

                  }).catch((err) => {
                     toast.error('Erro ! :' + err.message)
                  })

               } else if (result.isDenied) {
                  Swal.fire("Nada salvo", "", "info");
               }
            
            });
         }
      }
   }

   const limpar = () => {

      window.location.reload()

   }

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
               
                  localStorage.clear()
                  console.clear();
                  window.location.href = '/login';
               }
            });
   
   
         }
   
}  

 const usuario = localStorage.getItem('usuario')

return (
   
  <div className="">

         <div className="d-flex justify-content-between bg-secondary py-3 px-5 text-white">

            <Link to="/" className="navbar-brand fs-5 fw-bolder text-white">Inicio:<h6>{usuario}</h6></Link>
            <Link className="navbar-link fs-5 text-white"><BsCart />{cart.length}<h6 onClick={limpar}>Limpar Carrinho:</h6><h6 onClick={SairdaConta}>Sair:</h6></Link>

         </div><br />
         <div className="container mt-3" style={{ fontFamily: 'arial' }}>
            <div className="row ">
               <div className="col-8">
                  {cart.map(p => (
                     <CartProd produto={p}></CartProd>

                  ))} <br />
               </div>
               <div className="col-4">
                  <div className="bg-secondary p-3 text-white">
                     <h7>Total Itens:    {totalitens(cart)}</h7><br />
                     <h7>Total Geral: R${(totalpreco(cart)).toFixed(2)}</h7>

                  </div>

               </div>

            </div><br />
            <h5 style={{ color: 'blue', fontFamily: 'arial' }}>Descrição do Pedido:</h5><br />
            <form action="" onSubmit={cadastrar} className="mobile-form">
               <label htmlFor="descricao" style={{ fontWeight: 'bold', fontSize: '15px' }}>Descreva o nome e quantidade de cada item do pedido: </label>
               <label style={{ fontStyle: 'italic', margin: '0 10px', fontSize: '15px' }}>Ex: Pc Home Pichau HM181, AMD ...;  1</label><br />
               <textarea id="dados" onKeyUp={MudaCorDados} value={dados} onChange={e => setDados(e.target.value)} type="text" style={{ width: '400px', height: '250px', fontSize: '20px' }} /> <br /><br /><br />
               <h5 style={{ color: 'blue', fontFamily: 'arial' }}>Dados Pessoais e de Endereço p/ Entrega:</h5><br />

                 <div className="d-flex">
                    <label htmlFor="nome" style={{fontWeight:'bold'}}>Nome:</label>
                    <label htmlFor="cidade" style={{margin:'0 120px', fontWeight:'bold'}}>Cidade:</label>                    
                </div>             

                <div className="d-flex">
                  <input
                        type="text"
                        id="nome"
                        name="nome"
                        value={nome}
                        onChange={e => setNome(e.target.value)}
                        placeholder="Seu nome completo:"
                        onKeyUp={MudaCorNome}
                        style={{width:'150px'}}
                        
              
                    />
                      <input
                        type="text"
                        id="cidade"
                        name="cidade"
                        value={cidade}
                        onChange={e => setCidade(e.target.value)}
                        onKeyUp={MudaCorCidade}
                        style={{margin:'0 20px'}}
                        placeholder="Sua Cidade:"
                        
                    />
                   
                  
               </div><br /> 
               <div className="d-flex">
                    <label htmlFor="bairro" style={{fontWeight:'bold'}}>Bairro:</label>
                    <label htmlFor="cep" style={{margin:'0 120px', fontWeight:'bold'}}>Cep:</label>                    
                </div>             

                <div className="d-flex">
                  <input
                        type="text"
                        id="bairro"
                        name="bairro"
                        value={bairro}
                        onChange={e => setBairro(e.target.value)}
                        placeholder="Seu bairro:"
                        onKeyUp={MudaCorBairro}
                        style={{width:'150px'}}
              
                    />
                      <input
                        type="text"
                        id="cep"
                        name="cep"
                        value={cep}
                        onChange={e => setCep(e.target.value)}
                        onKeyUp={MudaCorCep}
                        style={{margin:'0 20px', width:'120px'}}
                        placeholder="Seu Cep:"
                        
                    />
                   
                  
               </div><br />
               <div className="d-flex">
                    <label htmlFor="ruaav" style={{fontWeight:'bold'}}>Rua/Avenida:</label>
                    <label htmlFor="numero" style={{margin:'0 80px', fontWeight:'bold'}}>Numero:</label>                    
                </div>             

                <div className="d-flex">
                  <input
                        type="text"
                        id="ruaav"
                        name="ruaav"
                        value={ruaav}
                        onChange={e => setRuaav(e.target.value)}
                        placeholder="Sua Rua/Av:"
                        onKeyUp={MudaCorRuaAv}
                        style={{width:'150px'}}
              
                    />
                      <input
                        type="text"
                        id="numero"
                        name="numero"
                        value={numero}
                        onChange={e => setNumero(e.target.value)}
                        onKeyUp={MudaCorNumero}
                        style={{margin:'0 20px', width:'80px'}}
                        placeholder="Seu Numero:"
                      
                        
                    />
                   
                  
               </div><br />
                <div className="d-flex">
                    <label htmlFor="formapag" style={{fontWeight:'bold'}}>Forma de Pagamento:</label>
                    <label htmlFor="telefone" style={{margin:'0 20px', fontWeight:'bold'}}>Telefones:</label>                    
                </div>             

                <div className="d-flex">
                  
                  <select onClick={MudaCorForma} value={formapag} onChange={e => setformapag(e.target.value)} name="formapag" id="formapag" >
                       <option value=""></option>
                       <option value="Debito">Debito</option>
                       <option value="Credito">Credito</option>
                       <option value="Pix">Pix</option>
                  </select>
                   <input
                        type="text"
                        id="fone"
                        name="fone"
                        value={fone}
                        onChange={e => setFone(e.target.value)}
                        onKeyUp={MudaCorFone}
                        style={{margin:'0 100px', width:'130px'}}
                        placeholder="Seu Telefone:"

                        
                    />
                   
                  
               </div><br />  
                 <button type="submit" class="btn btn-success">Salvar:</button>
                <ToastContainer />  
 

           </form>             
              
         </div>

         <footer className="py-4 bg-secondary d-flex justify-content-center" style={{ marginTop: "500px" }}>
            <p className="fw-bolder text-white">&copy; Multicompany Solutions</p>

         </footer>



      </div>
      
   
   )
}

export default Cart