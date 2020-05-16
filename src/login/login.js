import React from "react";
import axios from 'axios';
import './login.css';
import Botao from '../componentes/botao/botao';

class Login extends React.Component {

    render() {
        return (
           <div className="background-all">
               
               <div className="background-all-filter">
                    
                    <div className="form-login">
                        
                        <div className="form-center">

                            <div className="form-title">

                                <h1 className="title">Login</h1>

                            </div>

                            <div className="section-forms">

                                <div className="inputs">

                                    <input id="email" className="form-input" type="email" placeholder="Email" autoComplete="off"/>
                                
                                </div>

                                <div className="inputs">

                                    <input id="password" className="form-input" type="password" placeholder="Senha" />
                                
                                </div>

                                <div className="enter">

                                    <Botao label="Entrar" click={this.validation}></Botao>

                                </div>

                            </div>

                        </div>

                    </div>

               </div>

           </div>
        );
    }

    validation(){
        let email = document.getElementById('email').value;
        let password = document.getElementById('password').value;
        let name = "";
        if(email === '' && password === ''){
            alert('Preencha os campos de e-mail e senha');
        } else if ((email !== '' && password === '') || (email === '' && password !== '')) {
            alert('Preencha os campos de e-mail e senha');
        } else {
            axios.post('http://localhost:8000/auth' , {
               email: email,
               password: password,
            }).then(res => {
                if(res.data){
                    return (
                        window.location.href = '/venda');
                } else {
                    alert('Usuário ou senha Inválido');
                }
            }).catch(err => {
                console.error(err);
            })
        }

        
    }
}

export default Login;
