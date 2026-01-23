import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2';


const EditStatusPed = () => {


    const { pedidocod } = useParams()
    const [statusped, setStatus] = useState([])
    const [id, idchange] = useState("")

    
   

    useEffect(() => {
        fetch("http://localhost:3000/pedidos/" + pedidocod).then((res) => {
            return res.json();
        }).then((resp) => {
            idchange(resp.id);

        }).catch((err) => {
            console.log(err.message);
        })
    }, []);

    useEffect(() => {
        fetch("http://localhost:3000/statusped").then((res) => {

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

            //document.getElementById("status").style.borderColor = "red";
            isproceed = false
            //errormessage += 'Nome:' 
        }
        if (!isproceed) {
            toast.warning(errormessage)
        }

        return isproceed
    }



    function MostraId(){


     document.getElementById('id').style.borderColor = 'GainsBoro';


    }


    const editar = (e) => {

        e.preventDefault();


        if (isValidate()) {

            const status = document.getElementById('status').value;

            const edtobj = { id, status }

            Swal.fire({
                title: "Deseja salvar ?",
                showDenyButton: true,
                showCancelButton: true,
                confirmButtonText: "Salvar",
                denyButtonText: `Não Salvar`
            }).then((result) => {

                if (result.isConfirmed) {
                    fetch("http://localhost:3000/pedidos/" + pedidocod, {
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

 return (

        <div className="">

            <div className="d-flex justify-content-between bg-secondary py-3 px-5 text-white" >

                <Link to="/adminroot/pedidos" className="navbar-brand fs-4 fw-bolder text-white">Pedidos:</Link>

                
            </div><br />

            <div className='d-flex justify-content-center align-items-center vh-100'>
                <div className='bg-white p-3 rounded w-25 border'>
                    
                    <h3><center>Atualizar Status do Pedido:</center></h3><br />
                    <form action='' onSubmit={editar}>
                        <div className='mb3'>
                            <label htmlFor="id" style={{ margin: '0 40px', fontSize: 25 }}>Id:</label>
                            <input type="text" onKeyUp={MostraId}
                                className='form-control rounded-0' style={{ width: 62, margin:'0 40px', fontSize: 20 }}
                                value={id} onChange={e => idchange(e.target.value)} id='id'
                            />
                        </div>
                        <div className='mb3'>
                            <label htmlFor="status" style={{ margin: '0 40px', fontSize: 25 }}>Status:</label>
                            <select style={{ fontSize: '20px', width: 280, margin: '0 40px', fontWeight: 'bold', color: 'navy' }} name='status' id='status' className='form-select' onChange={(e) => setValues({ ...values, id: e.target.value })}>
                                <option value=""></option>
                                {statusped.map(val => {
                                    return <option value={val.status}>{val.status}</option>
                                })}

                            </select>

                        </div><br />
                        <button type='submit' className='btn btn-success rounded-0' style={{ width: 120, margin: '0 40px' }} >Atualizar:</button>
                         <Link to='/adminroot/pedidos' className="btn border rounded-0" style={{ color: 'white', backgroundColor: 'orange', margin: '0 0px', fontSize: '16px', width: 120 }}>Voltar:</Link>                       <ToastContainer />
                    </form>
                </div>

            </div>
            <footer className="py-4 bg-secondary d-flex justify-content-center">
                <p className="fw-bolder text-white">&copy; Multicompany Solutions</p>

            </footer>

        </div>


    )
}

export default EditStatusPed
