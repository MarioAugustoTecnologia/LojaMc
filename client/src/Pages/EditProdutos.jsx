import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2';


const EditProdutos = () => {


    const { produtocod } = useParams()
    const [statusprod, setStatus] = useState([])

    const [id, idchange] = useState("")    
    const [descricao, descchange] = useState("") 
    const [imagem, imagemchange] = useState("")    
    const [preco, precochange] = useState("")  
    
   

    useEffect(() => {
        fetch("https://lojamcserver.onrender.com/produtos/" + produtocod).then((res) => {
            return res.json();
        }).then((resp) => {
            idchange(resp.id);
            descchange(resp.descricao)
            imagemchange(resp.imagem)
            precochange(resp.preco)
           
            
        }).catch((err) => {
            console.log(err.message);
        })
    }, []);


     useEffect(() => {
        fetch("https://lojamcserver.onrender.com/statusprod").then((res) => {

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

  

    const editar = (e) => {

        e.preventDefault();
      
            const status = document.getElementById("status").value
            const edtobj = { id, descricao, imagem, preco, status  }

            Swal.fire({
                title: "Deseja salvar ?",
                showDenyButton: true,
                showCancelButton: true,
                confirmButtonText: "Salvar",
                denyButtonText: `Não Salvar`
            }).then((result) => {

                if (result.isConfirmed) {
                    fetch("https://lojamcserver.onrender.com/produtos/" + produtocod, {
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

 return (

        <div className="">

            <div className="d-flex justify-content-between bg-secondary py-3 px-5 text-white" >

                <Link to="/adminroot/pedidos" className="navbar-brand fs-4 fw-bolder text-white">Pedidos:</Link>

                
            </div><br />

            <div className='d-flex justify-content-center align-items-center vh-100'>
                <div className='bg-white p-3 rounded w-25 border'>
                    
                    <h3><center>Atualizar Produto:</center></h3><br />
                    <form action='' onSubmit={editar}>
                        <div className='mb3'>
                            <label htmlFor="id" style={{ margin: '0 40px', fontSize: 25 }}>Id:</label>
                            <input type="text" className='form-control rounded-0' style={{ width: 60, margin:'0 40px', fontSize: 20 }}
                                value={id} onChange={e => idchange(e.target.value)} id='id'
                            />
                        </div>
                        <div className='mb3'>
                            <label htmlFor="status" style={{ margin: '0 40px', fontSize: 25 }}>Descrição:</label>
                            <input type="text"
                                className='form-control rounded-0' style={{ width: 360, margin:'0 40px', fontSize: 20 }}
                                value={descricao} onChange={e => descchange(e.target.value)} id='id'
                            />

                        </div>
                          <div className='mb3'>
                            <label htmlFor="status" style={{ margin: '0 40px', fontSize: 25 }}>Imagem:</label>
                            <input type="text" placeholder="/Images/nome.jpg"
                                className='form-control rounded-0' style={{ width: 360, margin:'0 40px', fontSize: 20 }}
                                value={imagem} onChange={e => imagemchange(e.target.value)} id='id'
                            />
                        </div>
                          <div className='mb3'>
                            <label htmlFor="status" style={{ margin: '0 40px', fontSize: 25 }}>Preço:</label>
                           <input type="text" 
                                className='form-control rounded-0' style={{ width: 162, margin:'0 40px', fontSize: 20 }}
                                value={preco} onChange={e => precochange(e.target.value)} id='id'
                            />

                        </div>                        
                          <div className='mb3'>
                            <label htmlFor="status" style={{ margin: '0 40px', fontSize: 25 }}>Status:</label>
                            <select style={{ fontSize: '20px', width: 280, margin: '0 40px', fontWeight: 'bold', color: 'navy' }} name='status' id='status' className='form-select' onChange={(e) => setValues({ ...values, id: e.target.value })}>
                                <option value=""></option>
                                {statusprod.map(val => {
                                    return <option value={val.status}>{val.status}</option>
                                })}

                            </select>                         

                        </div> <br />

                        <button type='submit' className='btn btn-success rounded-0' style={{ width: 120, margin: '0 40px' }} >Atualizar:</button>
                         <Link to='/adminroot/pedidos/consulta/produtos' className="btn border rounded-0" style={{ color: 'white', backgroundColor: 'orange', margin: '0 0px', fontSize: '16px', width: 120 }}>Voltar:</Link>
                        <ToastContainer />                   
                    </form>
                </div>

            </div>
            <footer className="py-4 bg-secondary d-flex justify-content-center">
                <p className="fw-bolder text-white">&copy; Multicompany Solutions</p>

            </footer>

        </div>


    )
}

export default EditProdutos 
