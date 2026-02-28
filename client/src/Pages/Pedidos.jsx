import { Link, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import { useEffect, useState } from "react";


const Pedidos = ({ item }) => {

  const getColor = (status) => {

    if (status === "Entregue") {

      return 'green'

    } else {
      if (status === "Em andamento") {

        return 'orange'

      } else {
        if (status === "Cancelado") {

          return 'red'

        }
      }


    }
  }

  const [pedido, setPedidos] = useState([])

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

      <div className="d-flex text-white bg-secondary" style={{height:120 }}>
        <Link to="/" className="navbar-brandt text-white" style={{fontSize:'18px'}}>Inicio:</Link>

        <div className="" style={{margin:'20px'}}>          
           <Link to="/adminroot/pedidos/consulta/nome" style={{color:"white"}} >Consulta por nome:</Link><br />
           <Link to="/adminroot/pedidos/consulta/status" style={{color:"white"}} >Consulta por status:</Link><br />
           <Link to="/adminroot/pedidos/consulta/produtos" style={{color:"white"}} >Consulta Produtos:</Link><br />  
            <Link style={{color: 'white', margin:'-1550px' }} onClick={SairdaConta}>Sair da Conta:</Link>          
        </div>

       
      </div><br />
      <br />
         <h5 style={{fontWeight:'bold', margin:'0 120px'}}>Pedidos:</h5><br />
      
         <div className="container border" style={{width:'100%'}}>
            <br /><br />

            {
              pedido.map(item => (
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

export default Pedidos