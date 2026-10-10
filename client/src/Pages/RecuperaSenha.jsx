import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const RecuperaSenha = () => {


    const [usuario, setUsuario] = useState([])
    const [buscausuario, setBuscaUsuario] = React.useState("")
    const buscarap = buscausuario.toLowerCase()

    var table = usuario.filter(item => item.email === buscarap) //Busca o Usuario pelo seu Email.


    useEffect(() => {
        fetch("https://lojamcserver.onrender.com/usuarios").then((res) => {

            return res.json()

        }).then((resp) => {

            setUsuario(resp)

        }).catch((err) => {
            console.log(err.message)
        })
    }, [])

    const navigate = useNavigate()

    const LoadEdit = (id) => {       

        navigate("/usuarios/editar/" + id); 

    }

    const validarEmailCompleto = (valor) => {


        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(valor)) {
            // Verifica se a string tem pelo menos um espaço no meio
            return 'Por favor, insira o seu email corretamente !';
        }

       

    }

    const MostraNome = () => {


        if (buscausuario !== "") {

            const mensagemErro = validarEmailCompleto(buscausuario);

            if (mensagemErro) {
                document.getElementById('busca').style.display = 'none'
                setErro(mensagemErro);
               // console.log('Erro de validação:', mensagemErro);
            } else {

                document.getElementById('busca').style.display = 'block'
                // Seleciona todas as linhas da tabela (exceto o cabeçalho <th> se estiver fora do tbody, ou todas do tbody)
                const linhas = document.querySelectorAll("table tbody tr");       

                    linhas.forEach((linha, indice) => {

                        if (indice === 0) {

                            linha.style.display = ""; // Mostra a primeira linha                       

                        } else {
                            linha.style.display = "none"; // Oculta as outras linhas
                        }
                    }
                    );           

            }

        } else {

             document.getElementById('busca').style.display = 'none'
             document.getElementById('colums').style.display = 'none'

        }

    }


    return (
        <div className="">

            <div className="bg-secondary" style={{ height: 75 }}>
                <Link to="/" className="navbar-brand fs-5 fw-bolder text-white" >Inicio:</Link>

            </div><br /><br />


            <form className="mobile-form" style={{ margin: '0 100px' }}>
                <h5>Recuperar a Senha:</h5><br />

                <div className="form-group">
                    <label htmlFor="nome">Nome:</label><br />

                    <input
                        type="email"
                        id="usuario"
                        name="nome"
                        className='form-control'
                        value={buscausuario}
                        onChange={(e) => setBuscaUsuario(e.target.value)}
                        placeholder="Digite seu e-mail:"

                        style={{ width: '180px' }}
                        onKeyDown={MostraNome}
                        onSelect={MostraNome}

                    /> <br />
                </div>   <ToastContainer /> <br />

            </form><br /><br />
            <div id='busca' className="form-group" style={{ margin: '0 120px', display: 'none' }}>

                <table>
                    <thead>
                        <tr id='colums'>
                            <th>Nome</th>
                            <th>Email</th>
                            <th>Ação</th>

                        </tr>
                    </thead>
                    <tbody>

                        {
                            table.map(item => (
                                <tr key={item.id}>
                                    <td id='nome'>{item.id}</td>
                                    <td id='email'>{item.email}</td>                                 
                                    <td>
                                        <button className="editar" onClick={() => { LoadEdit(item.id) }} style={{ color: 'white', backgroundColor: 'blue', border: 'none', borderRadius: '5px' }}>Editar:</button>


                                    </td>
                                    <hr />


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

export default RecuperaSenha