import React, { useState } from 'react';//4=> criação do Login...
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate, Link } from 'react-router-dom';
import bcrypt from 'bcryptjs';
import "bootstrap-icons/font/bootstrap-icons.css";
import Swal from 'sweetalert2';


const Login = () => {

  const [usuario, setUsuario] = useState('')
  const [senha, setSenha] = useState('')



  const LoginForm = (e) => {

    e.preventDefault()

    if (validate()) {

      //console.log('proceed')
      fetch('https://lojamcserver.onrender.com/usuarios/' + usuario).then((res) => {

        return res.json()

      }).then((resp) => {

        console.log(resp)

        if (Object.keys(resp).length === 0) {

          toast.error('Entre com um usuario valido...')

        } else {

          bcrypt.compare(senha, resp.hashedPassword, function (err, isMatch) {
            if (err) {
              throw err
            }
            else if (!isMatch) {
              toast.error('Senha Invalida ! ...')
            }
            else {
              //toast.success('Logado com sucesso !')
              localStorage.setItem('usuario', usuario)
              localStorage.setItem('userLoggedIn', 'true')

              if (usuario !== 'admin') {
                navigate('/')
                Swal.fire({
                  position: "center",
                  icon: "success",
                  title: "Você está logado agora !",
                  showConfirmButton: false,
                  timer: 1800
                });

              } else {

                navigate('/adminroot/pedidos')
                 Swal.fire({
                  position: "center",
                  icon: "success",
                  title: "Você está logado agora !",
                  showConfirmButton: false,
                  timer: 1800
                });
              }


            }
          })
        }

      }).catch((err) => {
        toast.error('Usuario e/ou Senha invalidos...')

      })

    }

  }

  const validate = () => {

    let result = true

    if (usuario === '' || usuario === null && senha === '' || senha === null) {
      result = false
      toast.warning('Digite o nome de usuario e a senha !')
      document.getElementById('usuario').style.borderColor = 'red';
      document.getElementById('senha').style.borderColor = 'red';
    } else if (senha === '' || senha === null) {
      result = false
      toast.warning('Digite a senha !')
      document.getElementById('senha').style.borderColor = 'red';
    } else if (usuario === '' || usuario === null) {
      result = false
      toast.warning('Digite o nome de usuario !')
      document.getElementById('usuario').style.borderColor = 'red';
    }
    return result
  }

  function MostraUsuario() {

    document.getElementById('usuario').style.borderColor = 'GainsBoro';

  }

  function MostraSenha() {

    document.getElementById('senha').style.borderColor = 'GainsBoro';

  }

  function MostraTexto() {


    var inputPass = document.getElementById('senha');
    var btnshowPass = document.getElementById('mostrasenha')

    if (inputPass.type === 'password') {
      inputPass.setAttribute('type', 'text')
      btnshowPass.classList.replace('bi-eye-fill', 'bi-eye-slash')

    }
    else {
      inputPass.setAttribute('type', 'password')
      btnshowPass.classList.replace('bi-eye-slash', 'bi-eye-fill')

    }
  }

  const navigate = useNavigate()

    function CadUsuario(){
      
        navigate('/login')

    }



  return (

    <div className="">

            <div className="bg-secondary" style={{ height: 75 }}>
                <Link to="/" className="navbar-brand fs-5 fw-bolder text-white" >Inicio:</Link>

            </div><br /><br />
       

            <form className="mobile-form" style={{margin:'0 100px'}}>
                <h5>Login:</h5>

                <div className="form-group">
                    <label htmlFor="nome">Nome:</label><br />

                    <input
                        type="text"
                        id="usuario"
                        name="nome"
                        value={usuario}
                        onChange={e => setUsuario(e.target.value)}
                        placeholder="Seu nome completo"
                        onKeyUp={MostraUsuario}
                        style={{width:'150px'}}
              
                    />
                </div>             

                <div className="form-group">
                    <label htmlFor="senha">Senha:</label><br />
                    <input
                        type="password"
                        id="senha"
                        name="senha"
                        value={senha}
                        onChange={e => setSenha(e.target.value)}
                        onKeyUp={MostraSenha}
                        style={{width:'150px'}}
                        
                    /><i class="bi bi-eye-fill" id='mostrasenha' onClick={MostraTexto} style={{ fontSize: 20, margin:'0 20px'}}></i>
                </div><br /><br />
                    
                <div className='d-flex'>
                    <button onClick={(e) => LoginForm(e)} type="submit" style={{backgroundColor:'green', color:'white', width:'90px'}}>Login:</button>
                    <button onClick={CadUsuario} style={{backgroundColor:'orange', color:'white', margin:'0 15px', width:'90px'}}>Cadastro:</button>
  
                </div>    
                <ToastContainer />
            </form>


            <footer className="py-4 bg-secondary d-flex justify-content-center" style={{ marginTop: "500px" }}>
                <p className="fw-bolder text-white">&copy; Multicompany Solutions</p>

            </footer>

        </div>

  )
}

export default Login