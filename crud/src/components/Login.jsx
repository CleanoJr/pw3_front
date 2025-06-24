import axios from "axios";
import React, { useState }  from "react";
import api from "../api/axiosConfig"; // Importando a configuração do axios
const Login = ({ setUserLogger }) => {

    const [user,setUser]= useState("");
    const [password,setPassword]= useState("");

    return(
        <div className="login-page">
            <h1>Login</h1>
            <form onSubmit={(e) => e.preventDefault()}>
                <div className="form-group">
                    <label htmlFor="username">Usuário:</label>
                    <input type="text" id="username" name="username" onChange={(e)=>{
                        setUser(e.target.value);
                    }} required />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Senha:</label>
                    <input type="password" id="password" name="password" required  onChange={(e)=>{
                        setPassword(e.target.value);
                    }}/>
                </div>
                <button type="submit" onClick={ (e)=>{

                    e.preventDefault();
                    if(user === "" || password === ""){
                        alert("Preencha todos os campos!");
                        return;
                    }

                    const data = {
                        user: user,
                        password: password
                    }

                    api.post("/login", data).then((rest)=>{
                        localStorage.setItem("authToken", rest.data.token);
                        setUserLogger(true);
                    }).catch((res)=>{

                        
                        console.log("dEU RUIM");
                        alert(res.response.data.msg);

                    });


                    

                } }>Entrar</button>
            </form>
        </div>
    );

}

export default Login;