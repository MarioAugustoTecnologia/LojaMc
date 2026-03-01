import { Link, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import React, { useEffect, useState } from "react";


const ConsultaStatus = ({item}) => {


  const getColor = (status) => {

      if (status === "Entregue"){

         return 'green'

      }else{  if (status === "Em andamento"){

          return 'orange'

      }else{  if (status === "Cancelado"){

          return 'red'

      }}

      
      }
   }

  const [pedido, setPedidos] = useState([])  
  const [buscapedido, setBuscaPedido] = React.useState("")
  const buscarap = buscapedido.toLowerCase()


    var table = pedido.filter(item => item.status.toLowerCase().includes(buscarap))



  useEffect(() => {
    fetch("https://lojamcserver.onrender.com/pedidos").then((res) => {

      return res.json()

    }).then((resp) => {

      setPedidos(resp)

    }).catch((err) => {
      console.log(err.message)
    })
  }, [])

  const navigate = useNavigate()

  const LoadEdit = (id) => {
    navigate("/adminroot/pedidos/status/editar/" + id);
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

        fetch("https://lojamcserver.onrender.com/pedidos/" + id, {

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


  function SairdaConta() {

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

        const loggedIn = localStorage.getItem('userLoggedIn');

        if (loggedIn === 'true') {

          localStorage.clear()
          console.clear();
          window.location.href = '/login';

        }

      }
    });

  }

 


  return (
    <div className="">

      <div className="d-flex justify-content-between bg-secondary py-3 px-5 text-white">
       

        <div className="d-flex">
             <a href="" className="navbar-brand text-white" style={{fontSize:"18px"}}>Pesquisar:</a>
             <input type="search" style={{ margin: "0 15px", width: "240px", height: '25px' }} className="form-control rounded-0" value={buscapedido} onChange={(e) => setBuscaPedido(e.target.value)} />
        </div>

        <Link style={{ fontSize: "16px", color: 'white' }} onClick={SairdaConta}>Sair da Conta:</Link>


      </div><br />

    <div className="container border" style={{width:'100%'}}>
            <br /><br />

            {
              table.map(item => (
                <tr key={item.id}>
                  <h6>{item.id}</h6>
                  <h6>{item.nome}</h6>
                  <h6>{item.descricao}</h6>
                  <h6>{item.quant}</h6>
                  <h6>{item.preco}</h6>
                  <h6>{item.total}</h6>
                  <h6>{item.taxaentrega}</h6>
                  <h6>{item.formapag}</h6>
                  <h6>{item.cidade}</h6>
                  <h6>{item.bairro}</h6>
                  <h6>{item.cep}</h6>
                  <h6>{item.ruaav}</h6>
                  <h6>{item.numero}</h6>
                  <h6>{item.fone}</h6>
                  <h6 style={{ color: getColor(item.status), fontWeight: 'bold' }}>{item.status}</h6>
                  <h6>{item.data_cad}</h6>
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

export default ConsultaStatus