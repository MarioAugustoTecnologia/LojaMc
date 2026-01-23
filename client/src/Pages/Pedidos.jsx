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

      <div className="d-flex justify-content-between bg-secondary py-3 px-5 text-white" style={{ width: "160%", height:100 }}>
        <Link to="/" className="navbar-brand fs-4 fw-bolder text-white">Inicio:</Link>

        <div className="">          
            <Link to="/adminroot/pedidos/consulta/nome" className="text-white" style={{margin:"-1250px"}}>Consulta por nome:</Link><br />
          <Link to="/adminroot/pedidos/consulta/status" className="text-white" style={{margin:"-1250px"}}>Consulta por status:</Link><br />
          <Link to="/adminroot/pedidos/consulta/produtos" className="text-white" style={{margin:"-1250px"}}>Consulta Produtos:</Link><br />
            
        </div>

        <Link style={{ fontSize: "18px", color: 'white' }} onClick={SairdaConta}>Sair da Conta:</Link>


      </div><br />

      <div className='mt-3'>

        <h3><center>Pedidos:</center></h3><br />
        <table className="table" style={{ fontFamily: 'arial', fontSize: '17px', width: '2746px', margin: '0 50px' }} id="table">
          <thead>
            <tr>
              <th className="th" scope="col">Id:</th>
              <th className="th" scope="col">Nome:</th>
              <th className="th" scope="col">Pedido:</th>
              <th className="th" scope="col">Total:</th>
              <th className="th" scope="col">Forma Pgto:</th>
              <th className="th" scope="col">Cidade:</th>
              <th className="th" scope="col">Bairro:</th>
              <th className="th" scope="col">Cep:</th>
              <th className="th" scope="col">Rua/ Av:</th>
              <th className="th" scope="col">nº:</th>
              <th className="th" scope="col">Telefone:</th>
              <th className="th" scope="col">Status:</th>
              <th className="th" scope="col">Data Pedido:</th>
              <th className="th" scope="col">Ação:</th>
            </tr>
          </thead>
          <tbody>
            {
              pedido.map(item => (
                <tr key={item.id}>
                  <td className="td">{item.id}</td>
                  <td className="td">{item.nome}</td>
                  <td className="td">{item.dados}</td>
                  <td className="td">{item.total}</td>
                  <td className="td">{item.formapag}</td>
                  <td className="td">{item.cidade}</td>
                  <td className="td">{item.bairro}</td>
                  <td className="td">{item.cep}</td>
                  <td className="td">{item.ruaav}</td>
                  <td className="td">{item.numero}</td>
                  <td className="td">{item.fone}</td>
                  <td className="td" style={{ color: getColor(item.status), fontWeight: 'bold' }}>{item.status}</td>
                  <td className="td">{item.data_cad}</td>
                  <td>
                    <button className="editar" onClick={() => { LoadEdit(item.id) }} style={{ color: 'white', backgroundColor: 'blue', border: 'none', borderRadius: '5px' }}>Editar:</button>
                    <button className="excluir" onClick={() => { handleDelete(item.id) }} style={{ color: 'white', backgroundColor: 'red', border: 'none', borderRadius: '5px' }}>Excluir:</button>

                  </td>

                </tr>
              ))

            }


          </tbody>

        </table>


      </div>

      <footer className="py-4 bg-secondary d-flex justify-content-center" style={{ marginTop: "500px", width: "160%" }}>
        <p className="fw-bolder text-white">&copy; Multicompany Solutions</p>

      </footer>

    </div>
  )
}

export default Pedidos