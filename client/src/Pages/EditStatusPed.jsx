import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2';


const EditStatusPed = () => {

    const { pedidocod } = useParams()
    const [statusped, setStatus] = useState([])
    const [id, idchange] = useState("")
    const [total, totalchange] = useState("")
    const [desc, descchange] = useState("")
    const [novototal, novototalchange] = useState("")
    const [quant, quantchange] = useState("")

    useEffect(() => {
        fetch("https://lojamcserver.onrender.com/pedidos/" + pedidocod).then((res) => {
            return res.json();
        }).then((resp) => {
            idchange(resp.id);
            totalchange(resp.total)
            quantchange(resp.quant)

        }).catch((err) => {
            console.log(err.message);
        })
    }, []);

    useEffect(() => {
        fetch("https://lojamcserver.onrender.com/statusped").then((res) => {

            return res.json()

        }).then((resp) => {

            setStatus(resp)

        }).catch((err) => {
            console.log(err.message)
        })

    }, [])


    const [values, setValues] = useState({
        id: ''
    })

    const isValidate = () => {
        let isproceed = true
        let errormessage = "Campos não podem estar vazio  !"
        if (id === null || id === '') {

            document.getElementById("id").style.borderColor = "red";
            isproceed = false
            //errormessage += 'Nome:' 
        }
        if (statusped === null || statusped === '') {

            document.getElementById("status").style.borderColor = "red";
            isproceed = false
            //errormessage += 'Nome:' 
        }
        if (!isproceed) {
            toast.warning(errormessage)
        }

        return isproceed
    }



    function MostraId() {


        document.getElementById('id').style.borderColor = 'GainsBoro';


    }

    function MostraStatus() {


        document.getElementById('status').style.borderColor = 'GainsBoro';


    }


    const editar = (e) => {

        e.preventDefault();


        if (isValidate()) {

            const status = document.getElementById('status').value;

            const edtobj = { id, status, total, quant }

            Swal.fire({
                title: "Deseja salvar ?",
                showDenyButton: true,
                showCancelButton: true,
                confirmButtonText: "Salvar",
                denyButtonText: `Não Salvar`
            }).then((result) => {

                if (result.isConfirmed) {
                    fetch("https://lojamcserver.onrender.com/pedidos/" + pedidocod, {
                        method: "PATCH",
                        headers: { 'content-type': 'application/json' },
                        body: JSON.stringify(edtobj)
                    }).then((res) => {
                        toast.success('Atualizado com sucesso !')
                        //setStatus('');
                        idchange('');

                    }).catch((err) => {
                        toast.error('Erro ! :' + err.message)
                    })
                    //Swal.fire("Salvo!", "", "success");
                } else if (result.isDenied) {
                    Swal.fire("Nada salvo", "", "info");
                }
            });


        }
    }

    function NovoTotal() {

        const currencyString = novototal;

        const convertToNumber = (value) => {
            if (!value) return 0;
            // 1. Remove tudo que não é número, vírgula ou ponto (o - é mantido para negativos)
            // 2. Substitui a vírgula por ponto para o padrão JS
            const cleanValue = value
                .replace(/[R$\s]/g, "") // Remove R$, espaços e pontos de milhar

            return parseFloat(cleanValue);
        };

        const number = convertToNumber(currencyString);
        console.log(number)

        var vdesc = desc * number;
        var resultado = number - vdesc;
        document.getElementById('ntotal').value = 'R$' + (resultado).toFixed(2);

    }
    const navigate = useNavigate()
    
        function Retornar(){

         navigate("/adminroot/pedidos")

      }
        

 return (

        <div className="">

            <div className="d-flex justify-content-between bg-secondary py-3 px-5 text-white" >

                <Link to="/adminroot/pedidos" className="navbar-brand fw-bolder text-white">Pedidos:</Link>


            </div><br />
         
            <form className="mobile-form" style={{ margin: '0 100px' }} onSubmit={editar}>
                <h5>Atualizar Status do Pedido:</h5>

                <div className="form-group">
                    <label htmlFor="id">Id:</label><br />

                    <input
                        type="text"
                        id="id"
                        name="id"
                        className='form-control'
                        value={id}
                        onChange={e => idchange(e.target.value)}
                        onKeyUp={MostraId}

                        style={{ width: '40px' }}

                    />
                </div>

                <div className="form-group">
                    <label htmlFor="status">Status:</label><br />
                    <select
                        type="select"
                        id="status"
                        className='form-control'
                        name="status"
                        onChange={(e) => setValues({ ...values, id: e.target.value })}
                        style={{ width: '150px' }}

                    >
                        <option value=""></option>
                        {statusped.map(val => {
                            return <option value={val.status}>{val.status}</option>
                        })}


                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="total">Total:</label><br />

                    <input
                        type="text"
                        id="total"
                        name="total"
                        className='form-control'
                        value={total}
                        onChange={e => totalchange(e.target.value)}
                        

                        style={{ width: '150px' }}

                    />
                </div><br />

                <div className='d-flex'>
                    <button type="submit" style={{ backgroundColor: 'green', color: 'white', width: '90px' }}>Atualizar:</button>
                    <button type='button' onClick={Retornar} style={{ backgroundColor: 'orange', color: 'white', margin: '0 15px', width: '90px' }}>Voltar:</button>
                </div>
                <ToastContainer />
            </form><br /><br />
             <form className="mobile-form" style={{ margin: '0 100px' }}>
                <h5>Novo Total c/ Desconto:</h5>

                <div className="form-group">
                    <label htmlFor="desc">Desconto:</label><br />

                    <input
                        type="decimal"
                        id="desc"
                        name="desc"
                        className='form-control'
                        value={desc}
                        onChange={e => descchange(e.target.value)}
                      

                        style={{ width: '100px' }}

                    />
                </div>

               
                <div className="form-group">
                    <label htmlFor="total">Novo Total:</label><br />

                    <input
                        type="decimal"
                        id="novototal"
                        name="novototal"
                        className='form-control'
                        value={total}
                        onChange={e => totalchange(e.target.value)}
                        

                        style={{ width: '150px' }}

                    />
                </div><br />

                <div className='d-flex'>
                    <button type="submit" style={{ backgroundColor: 'green', color: 'white', width: '100px' }} onClick={NovoTotal}>Novo Total:</button>
                    
                </div>
                <ToastContainer />
            </form>


            <footer className="py-4 bg-secondary d-flex justify-content-center" style={{ marginTop: "500px" }}>
                <p className="fw-bolder text-white">&copy; Multicompany Solutions</p>

            </footer>

        </div>

    )
}

export default EditStatusPed
