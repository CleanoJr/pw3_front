import React  from "react";
const Sidebar = ({ setCurrentPage }) => {
    return(
        <div className="sidebar">
            <div className="sidebar-header">
                <h2>Menu</h2>
                
            </div>
            <div className="sidebar-content">
            <ul className="sidebar-menu">
                <li onClick={() => setCurrentPage('usuarios')}>Gerenciamento de Usuarios</li>
                <li onClick={() => setCurrentPage('clientes')}>Cadastro de Clientes</li>
                <li onClick={()=> setCurrentPage("produtos")}>Cadastro de Produtos</li>
                <li onClick={()=> setCurrentPage("servicos")}>Cadastro de Servicos</li>
                <li onClick={()=> setCurrentPage("vendas")}>Vendas</li>
                <li onClick={()=> setCurrentPage("caixa")}>Caixa</li>
                </ul>
            </div>
        </div>
    );
}
export default Sidebar;