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

            <div className="d-flex justify-content-between bg-secondary py-3 px-5 text-white" style={{ height: 75 }} >

                <Link to="/adminroot/pedidos" className="navbar-brand fw-bolder text-white">Pedidos:</Link>


            </div><br /><br />

            <form className="mobile-form" style={{ margin: '0 100px' }} onSubmit={editar}>
                <h5>Atualizar Produto:</h5>

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
                </div>

                <div className="form-group">
                    <label htmlFor="desc">Descrição:</label><br />

                    <input
                        type="text"
                        id="desc"
                        name="desc"
                        className='form-control'
                        value={descricao}
                        onChange={e => descchange(e.target.value)}

                        style={{ width: '200px' }}

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
                        onChange={e => precochange(e.target.value)}
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
                        onChange={e => imagemchange(e.target.value)}

                        style={{ width: '205px' }}

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
                        {statusprod.map(val => {
                            return <option value={val.status}>{val.status}</option>
                        })}
                    </select>
                </div><br /><br />

                <div className='d-flex'>
                    <button type="submit" style={{ backgroundColor: 'green', color: 'white', width: '90px' }}>Cadastrar:</button>
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

export default EditProdutos 
