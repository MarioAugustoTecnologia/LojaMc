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
                     toast.success('Cadastrado com Sucesso !')


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


   return (
      <div className="">

         <div className="d-flex justify-content-between bg-secondary py-3 px-5 text-white">

            <Link to="/" className="navbar-brand fs-4 fw-bolder text-white">Inicio:</Link>
            <Link className="navbar-link fs-5 text-white"><BsCart />{cart.length}<h6 onClick={limpar}>Limpar Carrinho:</h6><h6 onClick={SairdaConta}>Sair:</h6></Link>

         </div><br />
         <div className="container mt-3" style={{ fontFamily: 'arial' }}>
            <div className="row ">
               <div className="col-8">
                  {cart.map(p => (
                     <CartProd produto={p}></CartProd>
                  ))}
               </div>
               <div className="col-4">
                  <div className="bg-secondary p-3 text-white">
                     <h5>Total Itens:   {totalitens(cart)}</h5>
                     <h5>Total Geral: R${(totalpreco(cart)).toFixed(2)}</h5>

                  </div>

               </div>

            </div><br />
            <h3 style={{ color: 'blue', fontFamily: 'arial' }}>Descrição do Pedido:</h3><br />

            <form action="" onSubmit={cadastrar}>
               <label htmlFor="descricao" style={{ fontWeight: 'bold', fontSize: '20px' }}>Descreva o nome e quantidade de cada item do pedido: </label>
               <label style={{ fontStyle: 'italic', margin: '0 10px', fontSize: '18px' }}>Ex: Pc Home Pichau HM181, AMD ...;  1</label>
               <textarea onKeyUp={MudaCorDados} value={dados} onChange={e => setDados(e.target.value)} type="text" id="dados" style={{ width: '900px', height: '250px', fontSize: '20px' }} className="form-control" /> <br /><br />
               <h3 style={{ color: 'blue', fontFamily: 'arial' }}>Dados Pessoais e de Endereço p/ Entrega:</h3><br />

               <label htmlFor="nome" style={{ fontWeight: 'bold', fontSize: '20px' }}>Nome:</label>
               <label htmlFor="cidade" style={{ fontWeight: 'bold', fontSize: '20px', margin: '0 344px' }}>Cidade:</label>
               <br />
               <input onKeyUp={MudaCorNome} value={nome} onChange={e => setNome(e.target.value)} type="text" id="nome" style={{ width: '350px', fontSize: '20px', padding: '2px' }} className="form-control rounded-0" />
               <input onKeyUp={MudaCorCidade} value={cidade} onChange={e => setCidade(e.target.value)} type="text" id="cidade" style={{ width: '350px', fontSize: '20px', padding: '2px', margin: '0 402px', marginTop: '-34px' }} className="form-control rounded-0" /> <br />
               <label htmlFor="bairro" style={{ fontWeight: 'bold', fontSize: '20px' }}>Bairro:</label>
               <label htmlFor="cep" style={{ fontWeight: 'bold', fontSize: '20px', margin: '0 345px' }}>Cep:</label><br />
               <input onKeyUp={MudaCorBairro} value={bairro} onChange={e => setBairro(e.target.value)} type="text" id="bairro" style={{ width: '350px', fontSize: '20px', padding: '2px' }} className="form-control rounded-0" />
               <input onKeyUp={MudaCorCep} value={cep} onChange={e => setCep(e.target.value)} type="text" id="cep" style={{ width: '200px', fontSize: '20px', padding: '2px', margin: '0 402px', marginTop: '-34px' }} className="form-control rounded-0" /> <br />
               <label htmlFor="rua" style={{ fontWeight: 'bold', fontSize: '20px' }}>Rua /Avenida:</label>
               <label htmlFor="numero" style={{ fontWeight: 'bold', fontSize: '20px', margin: '0 344px' }}>Numero:</label><br />
               <input onKeyUp={MudaCorRuaAv} value={ruaav} onChange={e => setRuaav(e.target.value)} type="text" id="rua" style={{ width: '350px', fontSize: '20px', padding: '2px' }} className="form-control rounded-0" />
               <input onKeyUp={MudaCorNumero} value={numero} onChange={e => setNumero(e.target.value)} type="text" id="numero" style={{ width: '200px', fontSize: '20px', padding: '2px', margin: '0 470px', marginTop: '-37px' }} className="form-control rounded-0" /> <br />
               <label htmlFor="formapag" style={{ fontWeight: 'bold', fontSize: '20px' }}>Forma de Pagamento:</label>
               <label htmlFor="telefone" style={{ fontWeight: 'bold', fontSize: '20px', margin: '0 20px' }}>Telefones:</label> <label htmlFor="" style={{ fontSize: '18px', fontStyle: 'italic' }}>Ao menos um telefone*</label>
               <select onClick={MudaCorForma} value={formapag} onChange={e => setformapag(e.target.value)} name="formapag" id="formapag" className="form-control rounded-0" style={{ width: '100px', fontSize: '20px' }}>
                  <option value=""></option>
                  <option value="Debito">Debito</option>
                  <option value="Credito">Credito</option>
                  <option value="Pix">Pix</option>
               </select><br />
               <input type="tel" onKeyUp={MudaCorFone} value={fone} onChange={e => setFone(e.target.value)} id="fone" style={{ width: '300px', fontSize: '20px', padding: '2px', margin: '0 235px', marginTop: '-63px' }} className="form-control rounded-0" placeholder="(99)99999-9999 (99)99999-9999" /> <br />

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