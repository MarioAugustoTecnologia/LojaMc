
import { useState } from 'react';
import { Link } from "react-router-dom";
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

                fetch("http://localhost:3000/produtos", {
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





    return (

        <div className="">

            <div className="d-flex justify-content-between bg-secondary py-3 px-5 text-white">
                <Link to="/adminroot/pedidos/consulta/produtos" className="navbar-brand fs-4 fw-bolder text-white" >Produtos:</Link>

            </div>

            <h4 style={{ margin: '0 771px', marginTop: '100px', fontSize:'25px', fontWeight:'bold', width:'300px' }}>Cadastrar Produto:</h4>


            <div className='d-flex justify-content-center align-items-center vh-100'>
                <div className='bg-white p-3 rounded border' style={{ marginTop: '-450px', width:'45%'}}>

                    <form class="row g-3" onSubmit={cadastrar}>
                        <div class="col-md-6">
                            <label for="desc" class="form-label" style={{fontSize:'22px'}}>Descrição</label>
                            <input  style={{fontSize:'22px'}} type="text" class="form-control" id="desc" value={descricao} onChange={(e) => setDesc(e.target.value)} />
                        </div>
                        <div class="col-md-6">
                            <label for="preco" class="form-label" style={{fontSize:'22px'}}>Preço:</label>
                            <input type="decimal" class="form-control" id="preco" onKeyDown={handleKeyDown} value={preco} onChange={(e) => setPreco(e.target.value)} style={{width:'160px', fontSize:'22px'}} />

                        </div>
                        <div class="col-12">
                            <label for="imagem" class="form-label"  style={{fontSize:'22px'}}>Imagem</label>
                            <input  style={{fontSize:'22px', width:'400px'}} type="text" class="form-control" id="imagem" placeholder="/Images/nomedaimagem.jpg" value={imagem} onChange={(e) => setImagem(e.target.value)} />
                        </div>
                        <div class="col-12">
                            <label for="status" class="form-label"  style={{fontSize:'22px'}}>Status:</label>
                            <select type="select" class="form-control" id="status" style={{ width: '220px', fontSize:'22px' }} value={status} onChange={(e) => setStatus(e.target.value)} >
                                <option value=""></option>
                                <option value="Produto Disponivel">Produto Disponivel</option>
                                <option value="Produto Indisponivel">Produto Indisponivel</option>


                            </select>
                        </div>

                        <div class="col-12">
                            <button type="submit" class="btn btn-success">Cadastrar:</button>
                            <Link to="/adminroot/pedidos/consulta/produtos" className="btn border rounded" style={{ color: 'white', backgroundColor: 'orange', margin: '0 20px', fontSize: '16px', width: 120 }}>Voltar:</Link>
                        </div>
                        <ToastContainer />
                    </form>
                </div></div>

            <footer className="py-4 bg-secondary d-flex justify-content-center" style={{ marginTop: "500px" }}>
                <p className="fw-bolder text-white">&copy; Multicompany Solutions</p>

            </footer>

        </div>




    )
}

export default CadProdutos