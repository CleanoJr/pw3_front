import React from "react";
import { useState, useEffect } from "react";
import axios from 'axios';
function Clientes() {

  /// metodo para carrer on load
  useEffect(()=>{
    getAllUser()
  });
  /// dados do formulário
  const [dadosCliente,setDadosClient] = React.useState({
    name:"",
    email:"",
    password:""
  });

  //resultado da consulta
  const [resultado, setResultado] = React.useState();

  //setando os dados que o operador do sitema está digitando.
  const inputData = (e)=>{
    setDadosClient({
      ...dadosCliente,
      [e.target.name]:e.target.value
    })
  }

  //chamando back-and para criar um dado
  const saveData = async (e)  =>{
    e.preventDefault();
    const resposta = await axios.post('http://localhost:3000/user/add',
      dadosCliente).then((res)=>{
        if (res.status == 200){
          setDadosClient({
              name:"",
              email:"",
              password:""
          });

          alert("Salvo com sucesso");
        }
      }  ).catch((res)=>{
       // console.log(res);
        if (res.response) {
        alert("Erro " + res.response.data.msg);
        } else{
          alert("Erro " );
        }
      });
      getAllUser();
  }

  // chamando backand para trazer todos os usuários
  const getAllUser = async (e)=>{
    const consulta = await axios.get("http://localhost:3000/user/all");
    setResultado(consulta.data);
    console.log(consulta.data);
  }

  // chamando backend para remover um usuário
  const removeFunct =  async (e)=>{

    try {
     const callDelete = axios.delete("http://localhost:3000/user/delete/"+e).then(
      (res)=>{
        alert("Apagado com sucesso!!");
        getAllUser()
      }
     )

     alert("ta excluido " + e)
    }catch(e){
      alert(e);
    }
  }

  // pagina
    return(
         <div className="page-content">
      <h1>Gerenciamento de Clientes</h1>
      

      <form onSubmit={saveData}>
        Nome:
        <br></br>
        <input type="text" name="name" required placeholder="Nome" value={dadosCliente.name} onChange={inputData}></input>
        <br></br>
        Email:
        <br></br>
        <input type="email" name="email" required placeholder="E-mail" value={dadosCliente.email} onChange={inputData}></input>
        <br></br>
        Senha
        <br></br>
        <input type="password" name="password" required placeholder="Senha" value={dadosCliente.password} onChange={inputData}></input>
        <br></br>
        <button type="submit">Enviar</button>
        <button type="button" onClick={getAllUser}>Listar</button>
        <div className="tabela"> 

          <table style={{ border:1 , borderStyle:"double"}}>
            <thead>
              <tr>
                <th>Nome</th>
                <th>Email</th>
                <th>Editar</th>
                <th>Excluir</th>
              </tr>
            </thead>
            <tbody>
              {resultado && resultado.map((cliente, index) => (
                    <tr key={index}>
                        <td>{cliente.name}</td>
                        <td>{cliente.email}</td>
                        <td>{cliente.password}</td>
                       
                        <td><button type="button">Editar</button></td>
                        <td><button type="button" 
                        onClick={(e)=>{
                          removeFunct(cliente.id)
                        }}
                        >Excluir</button></td>
                         
                    </tr>
                ))}
            </tbody>
          </table>

        </div>
      </form>
      
    </div>
    );
}

export default Clientes;