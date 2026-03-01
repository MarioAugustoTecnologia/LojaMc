
import { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "bootstrap-icons/font/bootstrap-icons.css";
import Swal from 'sweetalert2';



const CadProdutos = () => {

    const [descricao, setDesc] = useState('')
    const [preco, setPreco] = useState('')
    const [imagem, setImagem] = useState('')
    const [status, setStatus] = useState('');
    const quant = 1;


    const handleKeyDown = (evento) => {
        // Código da tecla para vírgula é 188 ou 'Comma' dependendo do navegador/teclado
        if (evento.key === ',') { // Você pode adicionar o ponto se quiser também
            evento.preventDefault(); // Impede a ação padrão (digitar a vírgula)
        }
    }


    const cadastrar = (e) => {

        e.preventDefault();

        //console.log(cadobj) 
        Swal.fire({
            title: "Deseja salvar ?",
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: "Salvar",
            denyButtonText: `Não salvar`
        }).then((result) => {

            if (result.isConfirmed) {

                const cadobj = { descricao, preco, imagem, status, quant }

                fetch("https://lojamcserver.onrender.com/produtos", {
                    method: "POST",
                    headers: { 'content-type': 'application/json' },
                    body: JSON.stringify(cadobj)
                }).then((res) => {
                    toast.success('Cadastrado com sucesso !')
                    setDesc('');
                    setImagem('');
                    setPreco('')
                    setStatus('')

                }).catch((err) => {
                    toast.error('Erro ! :' + err.message)
                })
                //Swal.fire("Salvo!", "", "success");
            } else if (result.isDenied) {
                Swal.fire("Nada salvo", "", "info");
            }
        });

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

               document.getElementById('user').style.display = "none";
               localStorage.clear()
               console.clear();
               window.location.href = '/login';
            }
         });


      }

   }

     const navigate = useNavigate()

      function Retornar(){

         navigate("/adminroot/pedidos/consulta/produtos")

      }

    return (

       <div className="">

            <div className="d-flex justify-content-between bg-secondary py-3 px-5 text-white" style={{ height: 75 }}>
                <Link to="/adminroot/pedidos/consulta/produtos" className="navbar-brand fw-bolder text-white" style={{ fontSize: '18px' }} >Produtos:</Link>
               <Link style={{ fontSize: "18px", color: 'white' }} onClick={SairdaConta}>Sair da Conta:</Link>
            </div><br /><br />

            <form className="mobile-form" style={{ margin: '0 100px' }} onSubmit={cadastrar}>
                <h5>Cadastrar Produto:</h5>

                <div className="form-group">
                    <label htmlFor="desc">Descrição:</label><br />

                    <input
                        type="text"
                        id="desc"
                        name="desc"
                        className='form-control'
                        value={descricao}
                        onChange={e => setDesc(e.target.value)}

                        style={{ width: '150px' }}

                    />
                </div>
                <div className="form-group">
                    <label htmlFor="preco">Preço:</label><br />
                    <input
                        type="text"
                        id="preco"
                        name="preco"
                        className='form-control'
                        value={preco}
                        onChange={e => setPreco(e.target.value)}
                        onKeyDown={handleKeyDown}
                        style={{ width: '150px' }}

                    />
                </div>
                <div className="form-group">
                    <label htmlFor="imagem">Imagem:</label><br />
                    <input
                        type="text"
                        id="imagem"
                        name="imagem"
                        className='form-control'
                        placeholder="/Images/nomedaimagem.jpg"
                        value={imagem}
                        onChange={e => setImagem(e.target.value)}

                        style={{ width: '150px' }}

                    />
                </div>
                <div className="form-group">
                    <label htmlFor="status">Status:</label><br />
                    <select
                        type="select"
                        id="status"
                        className='form-control'
                        name="status"
                        value={status}
                        onChange={e => setStatus(e.target.value)}
                        style={{ width: '150px' }}

                    >
                        <option value=""></option>
                        <option value="Produto Disponivel">Produto Disponivel</option>
                        <option value="Produto Indisponivel">Produto Indisponivel</option>
                    </select>
                </div><br /><br />
                <div className='d-flex'>
                    <button type="submit" style={{backgroundColor:'green', color:'white', width:'90px'}}>Cadastrar:</button>
                    <button type='button' onClick={Retornar} style={{backgroundColor:'orange', color:'white', margin:'0 15px', width:'90px' }}>Voltar:</button>                 
                </div>
                <ToastContainer />
            </form>

            <footer className="py-4 bg-secondary d-flex justify-content-center" style={{ marginTop: "500px" }}>
                <p className="fw-bolder text-white">&copy; Multicompany Solutions</p>

            </footer>

        </div>

    )
}

export default CadProdutos