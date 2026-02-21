import { Link, useParams, useNavigate } from "react-router-dom";
import { CartContext } from "../Features/ContextProvider";
import CartProd from "./CartProd";
import { useContext, useState, useEffect } from "react";
import { BsCart } from "react-icons/bs"
import { totalitens, totalpreco, totalsub } from "../Features/CartReducer";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2';


const Cart = () => {


   history.pushState(null, null, location.href);
   window.onpopstate = function () {
      history.go(1);
      Swal.fire("Decida a compra antes !")

   };

   const navigate = useNavigate()

   function StatusCampo() {

      if (descricao !== "") {

         Swal.fire("Decida a compra antes !")

      };

   }

   const { pcod } = useParams();

   useEffect(() => {
      fetch("https://lojamcserver.onrender.com/produtos/" + pcod).then((res) => {
         return res.json();
      }).then((resp) => {
         descchange(resp.descricao)
         precochange(resp.preco)      
         statuschange(resp.status)

      }).catch((err) => {
         console.log(err.message);
      })
   }, []);


   const [descricao, descchange] = useState("")
   const [preco, precochange] = useState("")
   //const [quant, quantchange] = useState("")
   const [itens, itenschange] = useState("")
   const [statusprod, statuschange] = useState("")

   // const navigate = useNavigate()


   const { cart } = useContext(CartContext)

   var totalgeral = (totalpreco(cart)).toFixed(2); 


     if(statusprod == 'Produto Indisponivel'){
      document.getElementById('statusprod').style.color = 'red'
     }



   const comprar = (e) => {

      e.preventDefault();

      const loggedIn = localStorage.getItem('userLoggedIn');

      if (loggedIn !== 'true') {
         Swal.fire("Usuario não Logado e/ou não Cadastrado !");

      } else {
          
         if(statusprod == 'Produto Indisponivel'){

               cart.length = cart.length - 1;
              Swal.fire("Produto Indisponivel !", "", "warning");
              navigate('/')
            

         }else{

             Swal.fire({
            title: "Deseja comprar ?",
            showDenyButton: true,
            confirmButtonText: "comprar",
            denyButtonText: `Não comprar`,

         }).then((result) => {            

            if (result.isConfirmed) {
               
               const mensagemErro = validarnumero(itens)

               if(mensagemErro){
                    Swal.fire("Informe a quantidade igual ao numero acima!", "", "error");
                    document.getElementById('itens').style.borderColor = 'red'

               }else{

               
                   const status = '_/_'
                   const quant = itens;

                   const caddados = { nome, descricao, preco, quant, status }

               fetch("https://lojamcserver.onrender.com/pedidos", {
                  method: "POST",
                  headers: { 'content-type': 'application/json' },
                  body: JSON.stringify(caddados)
               }).then((res) => {
                  Swal.fire("Compra Concluida com Sucesso !", "", "success");

                  Swal.fire({
                     title: "Ultimo Item e Deseja concluir ?",
                     showDenyButton: true,
                     confirmButtonText: "Sim",
                     denyButtonText: `Não`,

                  }).then((result) => {

                     if (result.isConfirmed) {

                        Swal.fire("Informe os dados de Endereço para Concluir !", "", "info");
                        document.getElementById('cidade').style.borderColor = 'lime'
                        document.getElementById('bairro').style.borderColor = 'lime'
                        document.getElementById('cep').style.borderColor = 'lime'
                        document.getElementById('ruaav').style.borderColor = 'lime'
                        document.getElementById('numero').style.borderColor = 'lime'
                        document.getElementById('formapag').style.borderColor = 'lime'
                        document.getElementById('fone').style.borderColor = 'lime'

                     } else if (result.isDenied) {

                        Swal.fire("Continue Comprando  !", "", "info");
                        navigate('/')
                     }
                  })


               }).catch((err) => {
                  toast.error('Erro ! :' + err.message)
               })

               
                  
             }             
              
            } else if (result.isDenied) {

               Swal.fire({
                  title: "Deseja Parar por Aqui ?",
                  showDenyButton: true,
                  showConfirmButton: true,
                  confirmButtonText: "sim ",
                  denyButtonText: `Não`,

               }).then((result) => {

                  if (result.isConfirmed) {

                     if (cart.length == 1) {
                        cart.length = cart.length - 1;
                        totalgeral = (totalsub(cart)).toFixed(2);
                        console.log(totalgeral);
                        descchange('')
                        precochange('')
                        statuschange('')
                        navigate('/')


                     } else {
                           if (cart.length >= 2) {

                               cart.length = cart.length - 1;                               

                               totalgeral = (totalsub(cart)).toFixed(2);
                               console.log(totalgeral);
                               descchange('')
                               precochange('')
                               statuschange('')

                               Swal.fire("Informe os dados de Endereço para Concluir !", "", "info");
                               document.getElementById('cidade').style.borderColor = 'lime'
                               document.getElementById('bairro').style.borderColor = 'lime'
                               document.getElementById('cep').style.borderColor = 'lime'
                               document.getElementById('ruaav').style.borderColor = 'lime'
                               document.getElementById('numero').style.borderColor = 'lime'
                               document.getElementById('formapag').style.borderColor = 'lime'

                        }



                     }

                  } else if (result.isDenied) {

                      if (cart.length == 1) {
                            cart.length = cart.length - 1;
                            totalgeral = (totalsub(cart)).toFixed(2);
                            console.log(totalgeral);
                            navigate('/')


                     } else {
                           if (cart.length >= 2) {

                               cart.length = cart.length - 1;                               

                               totalgeral = (totalsub(cart)).toFixed(2);
                               console.log(totalgeral);
                               navigate('/')                              

                        }


                     }                     

                  }
               })

            }

         });

      }

 }
        
}


   const [cidade, setCidade] = useState("")
   const [bairro, setBairro] = useState("")
   const [cep, setCep] = useState("")
   const [ruaav, setRuaav] = useState("")
   const [numero, setNumero] = useState("")
   const [formapag, setformapag] = useState("")
   const [fone, setFone] = useState("")

   //const compara = (totalpreco(cart)).toFixed(2)

   const status = 'Em andamento'

   const isValidate = () => {
      let isproceed = true
      let errormessage = "Campos não podem estar vazio  !"


      Swal.fire("Clique em Comprar caso não Clicou !", "", "error");


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

         document.getElementById('ruaav').style.borderColor = 'red';
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
      document.getElementById('ruaav').style.borderColor = 'Gainsboro'
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
   const usuario = localStorage.getItem('usuario')
   const nome = usuario

   if (nome == null) {

      navigate('/')
       Swal.fire("Usuario não Logado e/ou não Cadastrado !");
      

   }
   else {

         history.pushState(null, null, location.href);
         window.onpopstate = function () {
         history.go(1);
         Swal.fire("Decida a compra antes !")


      }
   }   

   const total = (totalpreco(cart)).toFixed(2);

   const cadastrar = (e) => {

      e.preventDefault();

      const loggedIn = localStorage.getItem('userLoggedIn');

      if (loggedIn !== 'true') {
         Swal.fire("Usuario não Logado e/ou não Cadastrado !");
         //return false

      } else {

         const quant = totalitens(cart);


         if (isValidate()) {

            Swal.fire({
               title: "Deseja Concluir ?",
               showDenyButton: true,
               showCancelButton: true,
               confirmButtonText: "concluir",
               denyButtonText: `Não concluir`,
               cancelButtonText: "cancelar"
            }).then((result) => {

               if (result.isConfirmed) {

                  const caddados = { nome, cidade, bairro, cep, ruaav, numero, formapag, fone, status, data_cad, total, quant }

                  fetch("https://lojamcserver.onrender.com/pedidos", {
                     method: "POST",
                     headers: { 'content-type': 'application/json' },
                     body: JSON.stringify(caddados)
                  }).then((res) => {
                     Swal.fire("Compra Concluida com Sucesso !", "", "success");
                     cart.length = cart.length - cart.length;
                     navigate('/')

                  }).catch((err) => {
                     toast.error('Erro ! :' + err.message)
                  })

               } else if (result.isDenied) {

                  Swal.fire("Nada Concluido", "", "info");
                  cart.length = cart.length - cart.length;

                  const status = "Cancelado"

                  const caddados = { nome, cidade, bairro, cep, ruaav, numero, formapag, fone, status, data_cad, total, quant }

                  fetch("https://lojamcserver.onrender.com/pedidos", {
                     method: "POST",
                     headers: { 'content-type': 'application/json' },
                     body: JSON.stringify(caddados)
                  }).then((res) => {

                     navigate('/')

                  }).catch((err) => {
                     toast.error('Erro ! :' + err.message)
                  })


               } else if (result.isDismissed) {

                  Swal.fire("Compra Cancelada !", "", "Info");
                  cart.length = cart.length - cart.length;

                  const status = "Cancelado"

                  const caddados = { nome, cidade, bairro, cep, ruaav, numero, formapag, fone, status, data_cad, total, quant }

                  fetch("https://lojamcserver.onrender.com/pedidos", {
                     method: "POST",
                     headers: { 'content-type': 'application/json' },
                     body: JSON.stringify(caddados)
                  }).then((res) => {

                     navigate('/')

                  }).catch((err) => {
                     toast.error('Erro ! :' + err.message)
                  })


               }

            });
         }

      }


   }

   function MudaCorItens(){

        document.getElementById("itens").style.borderColor = "gainsboro"


   }


   const validarnumero = (valor) => {


        const numero = /^[0-9]$/


        if (!numero.test(valor)) {
            // Verifica se a string tem pelo menos um espaço no meio
            return 'Numeros de 1 a 9';
        }  
    }


   return (

      <div className="">

         <div className="d-flex justify-content-between bg-secondary py-3 px-5 text-white">

            <Link className="navbar-brand fs-5 fw-bolder text-white" style={{ marginLeft: '-40px' }} onClick={StatusCampo}>Inicio:<h6>{usuario}</h6></Link>
            <Link className="navbar-link fs-5 text-white" ><BsCart />{cart.length}</Link>

         </div><br />
         <div className="container mt-3" style={{ fontFamily: 'arial' }}>
            <div className="row ">
               <div className="col-8">

                  <div className=' border mb-3' style={{width:"40%"}}>
                     {cart.map(p => (
                        <CartProd produto={p}></CartProd>

                     ))}

                     <br />
                     <div className='detail ms-4'>
                        <input type="text" id="desc" readOnly style={{ border: 'none', width:'225px', fontSize: '17px' }} value={descricao} onChange={e => descchange(e.target.value)} /> <br /><br />
                        <input type="text" onKeyDown={validarnumero} onKeyUp={MudaCorItens} id="itens" style={{width: '50px', fontSize: '20px'}} value={itens} onChange={e => itenschange(e.target.value)} /> <br /><br />
                        <input type="text" readOnly style={{ fontWeight: 'bold', color: 'DarkMagenta', border: 'none', fontSize: '20px', width:'160px'}} value={"R$" + preco} onChange={e => precochange(e.target.value)}></input> <br />
                        <input type="text" readOnly style={{ fontWeight: 'bold', color: 'Green', border: 'none', fontSize: '20px', width:'200px'}} value={statusprod} id="statusprod" onChange={e => statuschange(e.target.value)} /> <br />
                        <button type="submit" className="btn btn-success" onClick={comprar} id="botao">Comprar: </button>

                     </div>
                  </div>

               </div>
               <div className="col-4" >
                  <div className="p-3">

                     <h7 style={{color:'navy', backgroundColor:'white', fontWeight:'bold', fontSize:'17px', margin:'-550px'}}>Total Itens: <a style={{color:'green', backgroundColor:'white', fontWeight:'bold', fontSize:'17px'}}>{totalitens(cart)}</a> </h7><br />
                     <h7 style={{color:'navy', backgroundColor:'white', fontWeight:'bold', fontSize:'17px', margin:'-550px'}}>Total Geral: <a style={{color:'green', backgroundColor:'white', fontWeight:'bold', fontSize:'17px'}}>R${totalgeral}</a> </h7><br />
                                      
                  </div>

               </div>

            </div><br />

            <form action="" onSubmit={cadastrar} className="mobile-form">

               <h5 style={{ color: 'blue', fontFamily: 'arial' }}>Dados de Endereço p/ Entrega:</h5><br />

               <div className="d-flex">

                  <label htmlFor="cidade" style={{ margin: '0px', fontWeight: 'bold' }}>Cidade:</label>
               </div>

               <div className="d-flex">

                  <input
                     type="text"
                     id="cidade"
                     name="cidade"
                     value={cidade}
                     onChange={e => setCidade(e.target.value)}
                     onKeyUp={MudaCorCidade}
                     placeholder="Sua Cidade:"

                  />


               </div><br />
               <div className="d-flex">
                  <label htmlFor="bairro" style={{ fontWeight: 'bold' }}>Bairro:</label>
                  <label htmlFor="cep" style={{ margin: '0 120px', fontWeight: 'bold' }}>Cep:</label>
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
                     style={{ width: '150px' }}

                  />
                  <input
                     type="text"
                     id="cep"
                     name="cep"
                     value={cep}
                     onChange={e => setCep(e.target.value)}
                     onKeyUp={MudaCorCep}
                     style={{ margin: '0 20px', width: '120px' }}
                     placeholder="Seu Cep:"

                  />


               </div><br />
               <div className="d-flex">
                  <label htmlFor="ruaav" style={{ fontWeight: 'bold' }}>Rua/Avenida:</label>
                  <label htmlFor="numero" style={{ margin: '0 70px', fontWeight: 'bold' }}>Numero:</label>
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
                     style={{ width: '150px' }}

                  />
                  <input
                     type="text"
                     id="numero"
                     name="numero"
                     value={numero}
                     onChange={e => setNumero(e.target.value)}
                     onKeyUp={MudaCorNumero}
                     style={{ margin: '0 20px', width: '80px' }}
                     placeholder="Seu Numero:"

                  />

               </div><br />
               <div className="d-flex">
                  <label htmlFor="formapag" style={{ fontWeight: 'bold' }}>Forma de Pagamento:</label>
                  <label htmlFor="telefone" style={{ margin: '0 10px', fontWeight: 'bold' }}>Telefones:</label>
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
                     style={{ margin: '0 100px', width: '130px' }}
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