import { useState } from 'react'
import './App.css'
import Sidebar from './components/Sidebar'
import Clientes from './pages/Clientes'
import Produtos from './pages/Produtos'

function App() {
  const [currentPage, setCurrentPage] = useState('home')
  
  const renderPage=()=>{
    console.log("rebderuzad"+currentPage)
    if (currentPage=="clientes"){
      return <Clientes/>
    }
    if (currentPage=="produtos"){
      return <Produtos/>
    }
  }

  return (
    <>
     <div className='app'>
      <Sidebar setCurrentPage={setCurrentPage}></Sidebar>   
        <div className="main-content">
        {renderPage()}
      </div>

     </div>
       
    </>
  )
}

export default App
