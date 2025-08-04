import React from "react";
import { useState, useEffect } from "react";
import axios from 'axios';
import api from '../api/axiosConfig'; // Importando a configuração do axios
function Servicos() {


  /// metodo para carrer on load
  useEffect(()=>{
    getAllClients();
  },[]);
  /// dados do formulário
  const [dadosCliente,setDadosClient] = React.useState({
    name:"",
    adress:"",
    cpf:"",
    id:""
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

    if (dadosCliente.id =="") {

    const resposta = await api.post('/clientes',
      dadosCliente).then((res)=>{
        console.log(res);
        if (res.status == 201){
          setDadosClient({
              name:"",
              adress:"",
              cpf:""
          });

          alert("Salvo com sucesso");
        }
      }
    
    ).catch((res)=>{
        console.log(res);
        if (res.response) {
        alert("Erro " + res.response.data.message);
        } else{
          alert("Erro " );
        }
      });
    } else{


       const resposta = await api.put('/cliente/'+dadosCliente.id,
      dadosCliente).then((res)=>{
        console.log(res);
        if (res.status == 200){
          setDadosClient({
              name:"",
              adress:"",
              cpf:"",
              id:""
          });
          alert("Salvo com sucesso");
        }
      }
    
    ).catch((res)=>{
        console.log(res);
        if (res.response) {
        alert("Erro " + res.response.data.message);
        } else{
          alert("Erro " );
        }
      });



          
    }
      getAllClients();
  }

  // chamando backand para trazer todos os usuários
  const getAllClients = async (e)=>{
    const consulta = await api.get("/servicos");
    setResultado(consulta.data.servicos);
  }

  const functionEdit = async (e)=>{
     const getClient = await api.get("/cliente/"+e).then((res)=>{
      //console.log(res.data.cliente);
      setDadosClient({
        name:res.data.cliente.name,
        adress:res.data.cliente.adress,
        cpf:res.data.cliente.cpf,
        id: res.data.cliente.id
      });

     }).catch((res)=>{
        console.log(res);

     });  

      alert("chegou aqy"+e);

  }

  // chamando backend para remover um usuário
  const removeFunct =  async (e)=>{

    if (!window.confirm("Deseja realmente excluir este cliente?")) {
      return;
    }

    try {
     const callDelete = api.delete("/cliente/"+e).then(
      (res)=>{
        alert("Apagado com sucesso!!");
        getAllClients()
      }
     )
  
    }catch(e){
      alert(e);
    }
  }

  // pagina
    return(
         <div className="page-content">
      <h1>Gerenciamento de Serviços</h1>
      

      <form onSubmit={saveData}>
        Codigo:
        <br></br>
        <input type="text" name="name" required placeholder="Código do Serviço" value={dadosCliente.name} onChange={inputData}></input>
        <br></br>
        Descrição do Serviço:
        <br></br>
        <input type="text" name="adress" required placeholder="Preço do Serviço" value={dadosCliente.adress} onChange={inputData}></input>
        <br></br>
        Preço:
        <br></br>
        <input type="text" name="cpf" required placeholder="CPF" value={dadosCliente.cpf} onChange={inputData}></input>
        <br></br>
        <button type="submit">Enviar</button>
        <button type="button" onClick={getAllClients}>Listar</button>
        <div className="tabela"> 

          <table style={{ border:1 , borderStyle:"double"}}>
            <thead>
              <tr>
                <th>Nome</th>
                <th>Endereço</th>
                <th>CPF</th>
                <th>Editar</th>
                <th>Excluir</th>
              </tr>
            </thead>
            <tbody>
              {resultado && resultado.map((cliente, index) => (
                    <tr key={index}>
                        <td>{cliente.name}</td>
                        <td>{cliente.adress}</td>
                        <td>{cliente.cpf}</td>
                       
                        <td><button type="button"  onClick={(e)=>{
                          functionEdit(cliente.id)

                        }}>Editar</button></td>
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

export default Servicos;