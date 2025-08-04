import React from "react";
import { useState, useEffect } from "react";
import axios from 'axios';
import api from '../api/axiosConfig'; // Importando a configuração do axios
function Vendas() {


  /// metodo para carrer on load
  useEffect(()=>{
    getAllVendas();
  },[]);
  /// dados do formulário
  const [dadosVenda,setDadosVendas] = React.useState({
    idCliente:"",
    total:"",
    id:"",
  });

  //resultado da consulta
  const [resultado, setResultado] = React.useState();

  //setando os dados que o operador do sitema está digitando.
  const inputData = (e)=>{
    setDadosVendas({
      ...dadosVenda,
      [e.target.name]:e.target.value
    })
  }

  //chamando back-and para criar um dado
  const saveData = async (e)  =>{
    e.preventDefault();

    if (dadosVenda.id =="") {

    const resposta = await api.post('/vendas',
      dadosVenda).then((res)=>{
        console.log(res);
        if (res.status == 201){
          setDadosVendas({
              id:"",
              idCliente:"",
              total:"",
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


       const resposta = await api.put('/vendas/'+dadosVenda.id,
      dadosVenda).then((res)=>{
        console.log(res);
        if (res.status == 200){
          setDadosVendas({
              id:"",
              idCliente:"",
              total:"",
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
      getAllVendas();
  }

  // chamando backend para trazer todos os usuários
  const getAllVendas = async (e)=>{
    const consulta = await api.get("/vendas");
    setResultado(consulta.data.vendas);
  }

  const functionEdit = async (e)=>{
     const getClient = await api.get("/vendas/"+e).then((res)=>{
      console.log(res.data);
      setDadosVendas({
        idCliente:res.data.vendas.idCliente,
        total:res.data.vendas.total,
        id:res.data.vendas.id
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
     const callDelete = api.delete("/vendas/"+e).then(
      (res)=>{
        alert("Apagado com sucesso!!");
        getAllVendas()
      }
     )
  
    }catch(e){
      alert(e);
    }
  }

  // pagina
    return(
         <div className="page-content">
      <h1>Gerenciamento de Vendas</h1>
      

      <form onSubmit={saveData}>
        Codigo:
        <br></br>
        <br></br>
        Cliente:
        <br></br>
        <input type="text" name="idCliente" required placeholder="Id da Venda" value={dadosVenda.idCliente} onChange={inputData}></input>
        <br></br>
        Preço:
        <br></br>
        <input type="text" name="total" required placeholder="Preço" value={dadosVenda.total} onChange={inputData}></input>
        <br></br>
        <button type="submit">Enviar</button>
        <button type="button" onClick={getAllVendas}>Listar</button>
        <div className="tabela"> 

          <table style={{ border:1 , borderStyle:"double"}}>
            <thead>
              <tr>
                <th>Id Venda</th>
                <th>Id Cliente</th>
                <th>Preço</th>
                <th>Editar</th>
                <th>Excluir</th>
              </tr>
            </thead>
            <tbody>
              {resultado && resultado.map((vendas, index) => (
                    <tr key={index}>
                        <td>{vendas.id}</td>
                        <td>{vendas.idCliente}</td>
                        <td>{vendas.total}</td>
                       
                        <td><button type="button"  onClick={(e)=>{
                          functionEdit(vendas.id)

                        }}>Editar</button></td>
                        <td><button type="button" 
                        onClick={(e)=>{
                          removeFunct(vendas.id)
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

export default Vendas;