import { Link, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import React, { useEffect, useState } from "react";


const ListaProdutos = ({ item }) => {


  const getColor = (status) => {

    if (status === "Produto Disponivel") {

      return 'green'
    } else {

      return 'red'
    }
  }


  const [produtodata, setProdutodata] = useState([]);
  const [buscanome, setBuscaNome] = React.useState("")

  const buscarap = buscanome.toLowerCase()

  var produtos = produtodata.filter(item => item.descricao.toLowerCase().includes(buscarap))


  useEffect(() => {

    fetch("https://lojamcserver.onrender.com/produtos").then((res) => {

      return res.json()

    }).then((resp) => {

      setProdutodata(resp)

    }).catch((err) => {
      console.log(err.message)
    })

  }, [])



  const navigate = useNavigate()

  const LoadEdit = (id) => {
    navigate("/adminroot/pedidos/produtos/editar/" + id);
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

        fetch("https://lojamcserver.onrender.com/produtos/" + id, {

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

      <div className="d-flex justify-content-between bg-secondary py-3 px-5 text-white" style={{ height: 80 }}>
        <Link to="/adminroot/pedidos" className="navbar-brand fs-4 fw-bolder text-white">Pedidos:</Link>
         <div className="">          
            <Link to="/adminroot/pedidos/cadprodutos" className="text-white" style={{margin:"-330px"}}>Cadastrar Produto:</Link>
          
        </div>

        <div className="d-flex justify-content-center">
          <center><a href="" className="navbar-brand text-white fs-5">Pesquisar:</a></center>
          <input type="search" style={{ margin: "0 12px", width: "300px", height: '35px' }} className="form-control rounded-0" value={buscanome} onChange={(e) => setBuscaNome(e.target.value)} />
        </div>
        <Link style={{ fontSize: "18px", color: 'white' }} onClick={SairdaConta}>Sair da Conta:</Link>


      </div><br />

      <div className='mt-3'>

        <h3><center>Produtos:</center></h3><br /><br />
        <table className="table" style={{ fontFamily: 'arial', fontSize: '17px', margin: '0 160px', width: 1450 }} id="table">
          <thead>
            <tr>
              <th className="th" scope="col">Id:</th>
              <th className="th" scope="col">Descrição:</th>
              <th className="th" scope="col">Preço:</th>
              <th className="th" scope="col">Status:</th>
              <th className="th" scope="col">Imagem:</th>
              <th className="th" scope="col">Ação:</th>
            </tr>
          </thead>
          <tbody>
            {
              produtos.map(item => (
                <tr key={item.id}>
                  <td className="td">{item.id}</td>
                  <td className="td">{item.descricao}</td>
                  <td className="td">{item.preco}</td>
                  <td className="td" style={{ fontWeight: 'bold', color: getColor(item.status) }}>{item.status}</td>
                  <td className="td"><img src={`https://lojamcserver.onrender.com${item.imagem}`} />{item.imagem}</td>
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

      <footer className="py-4 bg-secondary d-flex justify-content-center" style={{ marginTop: "500px" }}>
        <p className="fw-bolder text-white">&copy; Multicompany Solutions</p>

      </footer>

    </div>
  )
}

export default ListaProdutos