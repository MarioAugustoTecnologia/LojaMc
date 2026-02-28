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

      <div className="bg-secondary text-white" style={{ height: 80 }}>      
      

        <div className="d-flex">
          <a href="" className="navbar-brand text-white">Pesquisar:</a>
          <input type="search" style={{ margin: "0 12px", width: "160px", height: '25px' }} className="form-control rounded-0" value={buscanome} onChange={(e) => setBuscaNome(e.target.value)} />
           <Link style={{ fontSize: "16px", color: 'white' }} onClick={SairdaConta}>Sair da Conta:</Link>
        </div>
       <br />
        <Link to="/adminroot/pedidos/cadprodutos" className="text-white" style={{fontSize:'15px'}}>Cadastrar Produto:</Link>
         <a href="/adminroot/pedidos" className="navbar-brand text-white" style={{margin:'120px'}}>Pedidos:</a>


      </div><br />

      <h5 style={{ fontWeight: 'bold', margin: '0 120px' }}>Produtos:</h5><br />

      <div className="container border" style={{ width: '100%' }}>
        <br /><br />

        {
          produtos.map(item => (
            <tr key={item.id}>
              <h6>{item.id}</h6>
    
              <h6>{item.descricao}</h6>
       
              <h6>{"R$" + item.preco}</h6>
              
              <h6 style={{ color: getColor(item.status), fontWeight: 'bold' }}>{item.status}</h6>
              <h6><img src={`https://lojamcserver.onrender.com${item.imagem}`} />{item.imagem}</h6>
              <h6>
                <button className="editar" onClick={() => { LoadEdit(item.id) }} style={{ color: 'white', backgroundColor: 'blue', border: 'none', borderRadius: '5px' }}>Editar:</button>
                <button className="excluir" onClick={() => { handleDelete(item.id) }} style={{ color: 'white', backgroundColor: 'red', border: 'none', borderRadius: '5px' }}>Excluir:</button>

              </h6>
                 
              <hr />


            </tr>

          ))

        }


      </div>

      <footer className="py-4 bg-secondary d-flex justify-content-center" style={{ marginTop: "500px" }}>
        <p className="fw-bolder text-white">&copy; Multicompany Solutions</p>

      </footer>

    </div>
  )
}

export default ListaProdutos