import { useEffect, useState } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import bcrypt from 'bcryptjs';
import "bootstrap-icons/font/bootstrap-icons.css";
import Swal from 'sweetalert2';


const EditarUsuario = () => {


    const { usuariocod } = useParams()


    useEffect(() => {
        fetch("https://lojamcserver.onrender.com/usuarios/" + usuariocod).then((res) => {

            return res.json();

        }).then((resp) => {
            idchange(resp.id);
            emailchange(resp.email)

        }).catch((err) => {
            console.log(err.message);
        })
    }, []);

    const [id, idchange] = useState("")
    const [senha, senhachange] = useState("")
    const [email, emailchange] = useState('');
    const [erro, setErro] = useState('');


    const isValidate = () => {
        let isproceed = true
        let errormessage = "Campo senha não pode estar vazio  !"

        if (senha === null || senha === '') {
            document.getElementById('senha').style.borderColor = 'red'
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

    const validarsenha = (valor) => {

        const senhavalida = /^(?=.*[A-Z])(?=.*[!#@$%&])(?=.*[0-9])(?=.*[a-z]).{8,10}$/


        if (!senhavalida.test(valor)) {
            // Verifica se a string tem pelo menos um espaço no meio
            return 'Senha deve conter: letras maiuscula e minuscula, numeros, caracter especial e de 8 a 10 digitos !';
        }

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

    const editar = (e) => {

        e.preventDefault();

        if (isValidate()) {

            const errosenha = validarsenha(senha);

            if (errosenha) {
                setErro(errosenha);
                console.log('Erro de validação:', errosenha);
            } else {

                const password = senha;
                const hashedPassword = bcrypt.hashSync(password, 10)
                const user = id;

                window.localStorage.setItem('Login', JSON.stringify({ user, hashedPassword, email }))

                const edtobj = { id, hashedPassword, email }

                Swal.fire({
                    title: "Deseja Salvar ?",
                    showDenyButton: true,
                    showCancelButton: true,
                    confirmButtonText: "Salvar",
                    denyButtonText: `Não Salvar`
                }).then((result) => {
                    /* Read more about isConfirmed, isDenied below */
                    if (result.isConfirmed) {

                        fetch("https://lojamcserver.onrender.com/usuarios/" + usuariocod, {
                            method: "PUT",
                            headers: { 'content-type': 'application/json' },
                            body: JSON.stringify(edtobj)
                        }).then((res) => {
                            toast.success('Senha Recuperada com Sucesso !')
                            idchange('');
                            senhachange('');

                        }).catch((err) => {
                            toast.error('Erro ! :' + err.message)
                        })
                        // Swal.fire("Salvo!", "", "success");
                    } else if (result.isDenied) {
                        Swal.fire("Nada Salvo!", "", "info");
                    }
                });
            }


        }


    }
   
 const navigate = useNavigate()
    
    function Voltar(){

        navigate('/recuperasenha')
    }




    return (
        <div className="">

            <div className="bg-secondary" style={{ height: 75 }}>


            </div><br /><br />


            <form onSubmit={editar} className="mobile-form" style={{ margin: '0 100px' }}>
                <h5>Gerar Nova Senha:</h5><br />

                <div className="form-group" style={{ display: 'none' }}>
                    <label htmlFor="nome">Nome:</label><br />

                    <input
                        type="text"
                        id="usuario"
                        name="nome"
                        className='form-control'
                        value={id}
                        onChange={e => idchange(e.target.value)}
                        //placeholder="Seu nome completo"
                        style={{ width: '180px' }}
                    />
                </div>  <br />
                <div className="form-group" style={{ display: 'none' }}>
                    <label htmlFor="nome">Email:</label><br />

                    <input
                        type="email"
                        id="email"
                        name="email"
                        className='form-control'
                        value={email}
                        onChange={e => emailchange(e.target.value)}
                        //placeholder="Seu nome completo"
                        style={{ width: '180px' }}
                    />
                </div> 

                <div className="form-group">
                    <label htmlFor="senha">Senha:</label><br />
                    <div className='d-flex'>
                        <input
                            type="password"
                            id="senha"
                            name="senha"
                            className='form-control'
                            value={senha}
                            onChange={e => senhachange(e.target.value)}
                            onKeyUp={MostraSenha}
                            style={{ width: '180px' }}

                        /><i class="bi bi-eye-fill" id='mostrasenha' style={{ fontSize: 20, margin: '0 20px' }} onClick={MostraTexto}></i><br />

                    </div><br />


                </div><br />
                <center>{erro && <p style={{ color: 'red' }}>{erro}</p>}</center>

                <div className='d-flex'>
                    <button type="submit" style={{ backgroundColor: 'green', color: 'white', width: '120px', height: '30px' }}>Nova Senha:</button>
                    <button onClick={Voltar} type='button' style={{ backgroundColor: 'orange', color: 'white', margin: '0 15px', width: '110px', height: '30px' }}>Voltar:</button>

                </div>
                <ToastContainer />
            </form><br />


            <footer className="py-4 bg-secondary d-flex justify-content-center" style={{ marginTop: "500px" }}>
                <p className="fw-bolder text-white">&copy; Multicompany Solutions</p>

            </footer>

        </div>

    )
}

export default EditarUsuario