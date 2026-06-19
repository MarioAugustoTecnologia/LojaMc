import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2';


const EditarFrete = () => {


    const { valorcod } = useParams()
    const [valor, setvalorFrete] = useState('')
    const [id, idchange] = useState("")
    const [bairro, bairrochange] = useState("")

    useEffect(() => {

        fetch("https://lojamcserver.onrender.com/frete/" + valorcod).then((res) => {
           
            return res.json();

        }).then((resp) => {
            idchange(resp.id);
            setvalorFrete(resp.valor) 
            bairrochange(resp.bairro)        

        }).catch((err) => {
            console.log(err.message);
        })
    }, []); 

   
    const handleKeyDown = (evento) => {
        // Código da tecla para vírgula é 188 ou 'Comma' dependendo do navegador/teclado
        if (evento.key === ',') { // Você pode adicionar o ponto se quiser também
            evento.preventDefault(); // Impede a ação padrão (digitar a vírgula)
        }
    }



    const editar = (e) => {

        e.preventDefault();


        const edtobj = { id, valor, bairro }

        Swal.fire({
            title: "Deseja salvar ?",
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: "Salvar",
            denyButtonText: `Não Salvar`
        }).then((result) => {

            if (result.isConfirmed) {
                fetch("https://lojamcserver.onrender.com/frete/" + valorcod, {
                    method: "PATCH",
                    headers: { 'content-type': 'application/json' },
                    body: JSON.stringify(edtobj)
                }).then((res) => {
                    toast.success('Atualizado com sucesso !')                  
                    idchange('');
                    setvalorFrete('')
                    bairrochange('')

                }).catch((err) => {
                    toast.error('Erro ! :' + err.message)
                })
                //Swal.fire("Salvo!", "", "success");
            } else if (result.isDenied) {
                Swal.fire("Nada salvo", "", "info");
            }
        });



    }

    const navigate = useNavigate()
    
        function Retornar(){

         navigate("/adminroot/pedidos/consulta/frete")

      }

    return (

        <div className="">

            <div className="d-flex justify-content-between bg-secondary py-3 px-5 text-white" style={{ height: 75 }} >

                <Link to="/adminroot/pedidos" className="navbar-brand fw-bolder text-white">Pedidos:</Link>


            </div><br /><br />

            <form className="mobile-form" style={{ margin: '0 100px' }} onSubmit={editar}>
                <h5>Editar Frete:</h5><br />

                <div className="form-group">
                    <label htmlFor="id">Id:</label><br />

                    <input
                        type="text"
                        id="id"
                        name="id"
                        className='form-control'
                        value={id}
                        onChange={e => idchange(e.target.value)}

                        style={{ width: '50px' }}

                    />
                </div><br />
                <div className="form-group">
                    <label htmlFor="bairro">Bairro:</label><br />

                    <input
                        type="text"
                        id="bairro"
                        name="bairro"
                        className='form-control'
                        value={bairro}
                        onChange={e => bairrochange(e.target.value)}

                        style={{ width: '200px' }}

                    />
                </div><br />   

                <div className="form-group">
                    <label htmlFor="valor">Valor:</label><br />

                    <input
                        type="decimal"
                        id="valor"
                        name="valor"
                        className='form-control'
                        value={valor}
                        onChange={e => setvalorFrete(e.target.value)}

                        style={{ width: '100px' }}
                        onKeyDown={handleKeyDown}

                    />
                </div><br />                
                <div className='d-flex'>
                    <button type="submit" style={{ backgroundColor: 'green', color: 'white', width: '90px' }}>Atualizar:</button>
                    <button type='button' onClick={Retornar} style={{ backgroundColor: 'orange', color: 'white', margin: '0 15px', width: '90px' }}>Voltar:</button>
                </div>
                <ToastContainer />
            </form>

            <footer className="py-4 bg-secondary d-flex justify-content-center" style={{ marginTop: "500px" }}>
                <p className="fw-bolder text-white">&copy; Multicompany Solutions</p>

            </footer>

        </div>


    )
}

export default EditarFrete
