
import { useState } from 'react';
import { Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "bootstrap-icons/font/bootstrap-icons.css";
import Swal from 'sweetalert2';
import bcrypt from 'bcryptjs';


const CadUsuario = () => {

    const [id, setId] = useState('')
    const [senha, setSenha] = useState('')
    const [erro, setErro] = useState('');

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

    const isValidate = () => {
        let isproceed = true
        let errormessage = "Campos não podem estar vazio  !"

        if (senha === null || senha === '') {
            document.getElementById('senha').style.borderColor = 'red';
            isproceed = false
            // errormessage += 'Senha:' 
        }
        if (id === null || id === '') {
            document.getElementById('id').style.borderColor = 'red';
            isproceed = false
            // errormessage += 'Senha:' 
        }

        if (!isproceed) {
            toast.warning(errormessage)

        }
        return isproceed
    }



    function MostraSenha() {

        document.getElementById('senha').style.borderColor = 'GainsBoro';
        setErro('');

    }

    function MostraUsuario() {

        document.getElementById('id').style.borderColor = 'GainsBoro';
        setErro('');

    }

    const validarNomeCompleto = (valor) => {


        const regexNomeCompleto = /^[A-Za-zÀ-ú\s]{3,}(?:\s[A-Za-zÀ-ú\s]{3,})+$/


        if (!regexNomeCompleto.test(valor)) {
            // Verifica se a string tem pelo menos um espaço no meio
            return 'Por favor, insira o nome completo (nome e sobrenome).';
        }

        const temComprimentoMinimo = id.length >= 10
        if (!temComprimentoMinimo) {

            return 'O nome deve ter no mínimo 10 caracteres.';
        }



    }
const validarsenha = (valor) => {

        const senhavalida = /^(?=.*[A-Z])(?=.*[!#@$%&])(?=.*[0-9])(?=.*[a-z]).{8,10}$/


        if (!senhavalida.test(valor)) {
            // Verifica se a string tem pelo menos um espaço no meio
            return 'Senha deve conter: letras maiuscula e minuscula, numeros, caracter especial e de 8 a 10 digitos !';
        }

    }

    const cadastrar = (e) => {

        e.preventDefault();

        if (isValidate()) {

            const mensagemErro = validarNomeCompleto(id);
            const errosenha = validarsenha(senha);

            if (mensagemErro) {
                setErro(mensagemErro);
                console.log('Erro de validação:', mensagemErro);
            } else {

                if (errosenha) {
                    setErro(errosenha);
                    console.log('Erro de validação:', errosenha);
                } else {

                    const password = senha;
                    const hashedPassword = bcrypt.hashSync(password, 10)
                    const user = id;
                    window.localStorage.setItem('Login', JSON.stringify({ user, hashedPassword }))

                    const cadobj = { id, hashedPassword }
                    //console.log(cadobj) 
                    Swal.fire({
                        title: "Deseja salvar ?",
                        showDenyButton: true,
                        showCancelButton: true,
                        confirmButtonText: "Salvar",
                        denyButtonText: `Não salvar`
                    }).then((result) => {

                        if (result.isConfirmed) {

                            fetch("https://lojamcserver.onrender.com/usuarios", {
                                method: "POST",
                                headers: { 'content-type': 'application/json' },
                                body: JSON.stringify(cadobj)

                            }).then((res) => {
                                toast.success('Cadastrado com sucesso !')
                                setId('');
                                setSenha('');


                            }).catch((err) => {
                                toast.error('Erro ! :' + err.message)
                            })
                            //Swal.fire("Salvo!", "", "success");
                        } else if (result.isDenied) {
                            Swal.fire("Nada salvo", "", "info");
                        }
                    });

                }
            }
        }
    }

    function Login(){
      
        navigate('/login')

    }

    return (

        <div className="">

            <div className="bg-secondary" style={{ height: 75 }}>
                <Link to="/" className="navbar-brand fs-5 fw-bolder text-white" >Inicio:</Link>

            </div><br /><br />

            <form className="mobile-form" onSubmit={cadastrar}>
                <h5>Cadastrar Usuario:</h5>

                <div className="form-group">
                    <label htmlFor="nome">Nome:</label><br />

                    <input
                        type="text"
                        id="id"
                        name="nome"
                        value={id}
                        onChange={e => setId(e.target.value)}
                        placeholder="Seu nome completo"
                        onKeyUp={MostraUsuario}
              
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
                        
                    /><i class="bi bi-eye-fill" id='mostrasenha' onClick={MostraTexto} style={{ fontSize: 20, margin:'0 20px'}}></i>
                </div><br /><br />
                    <center>{erro && <p style={{ color: 'red' }}>{erro}</p>}</center>
                <button type="submit" style={{backgroundColor:'green', color:'white', width:'90px'}}>Cadastrar:</button>
                <button onClick={Login} style={{backgroundColor:'orange', color:'white', margin:'0 30px', width:'90px'}}>Login:</button>
                <ToastContainer />
            </form>


            <footer className="py-4 bg-secondary d-flex justify-content-center" style={{ marginTop: "500px" }}>
                <p className="fw-bolder text-white">&copy; Multicompany Solutions</p>

            </footer>

        </div>    

    )
}

export default CadUsuario