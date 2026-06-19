import { Link, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import React, { useEffect, useState } from "react";


const ConsultaFrete = ({item}) => {
  

  const [bairro, setBairros] = useState([])  
  const [buscabairro, setBuscaBairro] = React.useState("")
  const buscarap = buscabairro.toLowerCase()
  
  var table = bairro.filter(item => item.bairro.toLowerCase().includes(buscarap))


  useEffect(() => {
    fetch("https://lojamcserver.onrender.com/frete").then((res) => {

      return res.json()

    }).then((resp) => {

      setBairros(resp)

    }).catch((err) => {
      console.log(err.message)
    })
  }, [])

  const navigate = useNavigate()

  const LoadEdit = (id) => {
    navigate("/adminroot/frete/valor/editar/" + id);
  }


  const handleDelete = (id) => {

    Swal.fire({
      title: "Deseja Excluir ?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Excluir",
      denyButtonText: `Não Excluir`
    }).then((result) => {

      if (result.isConfirmed) {

        fetch("https://lojamcserver.onrender.com/frete/" + id, {

          method: "DELETE"

        }).then((res) => {

          window.location.reload();

        }).catch((err) => {
          toast.error('Erro ! :' + err.message)
        })

      } else if (result.isDenied) {
        Swal.fire("Nada excluido", "", "info");
      }
    });

  }  


  return (
    <div className="">

      <div className="d-flex justify-content-between bg-secondary py-3 px-5 text-white" >
        

        <div className="d-flex">
            <a href="" className="navbar-brand text-white" style={{fontSize:'16px', margin:'-5px'}}>Pesquisar:</a>
             <input type="search" style={{ width: "120px", height: '25px', margin: '0 15px' }} className="form-control rounded-0" value={buscabairro} onChange={(e) => setBuscaBairro(e.target.value)} />
        </div>  

            <Link to="/adminroot/pedidos" style={{ color: "white" }} >Pedidos:</Link>    


      </div><br />

     <div className="container border" style={{width:'100%'}}>
            <br /><br />

            {
              table.map(item => (
                <tr key={item.id}>         
                              
                  <h6>{item.regiao}</h6>
                  <h6>{item.bairro}</h6>
                  <h6>{item.valor}</h6>
                 
                  <h6>
                    <button className="editar" onClick={() => { LoadEdit(item.id) }} style={{ color: 'white', backgroundColor: 'blue', border: 'none', borderRadius: '5px' }}>Editar:</button>
                    <button className="excluir" onClick={() => { handleDelete(item.id) }} style={{ color: 'white', backgroundColor: 'red', border: 'none', borderRadius: '5px' }}>Excluir:</button>

                  </h6>
                    <hr />                 
                

                </tr>
              
              ))

            }
          

         </div>          

      <footer className="py-4 bg-secondary d-flex justify-content-center" style={{ marginTop: "500px"}}>
        <p className="fw-bolder text-white">&copy; Multicompany Solutions</p>

      </footer>

    </div>
  )
}

export default ConsultaFrete