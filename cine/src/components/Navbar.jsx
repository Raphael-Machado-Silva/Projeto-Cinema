import { useState } from 'react';
import logo from '../assets/logo.webp';  // Importe a imagem aqui
import { Link, useNavigate } from "react-router-dom";
import {BiCameraMovie, BiSearchAlt2} from 'react-icons/bi'
import './Navbar.css'

const Navbar = () => {
  const [search, setSearch] = useState("")
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if(!search) return

    navigate(`/search?q=${search}`)
    setSearch("")
  }


  return (
    <nav id='navbar'>
      <div className='logo'>
                  <img 
            src={logo} 
            alt="CineStream Logo" 
            style={{
              width: '55px',   // Ajuste o tamanho desejado
              height: '55px',  // Ajuste para a altura ser igual à largura
              borderRadius: '50%',  // Torna a imagem circular
              objectFit: 'cover',  // Garante que a imagem não distorça
            }} 
          />
        <h2>

          <Link to="/"><BiCameraMovie></BiCameraMovie> CineStream</Link>
        </h2>
      </div>

        <form onSubmit={handleSubmit}>
            <input type="text" 
            placeholder='Pesquisar' 
            onChange={(e)=> setSearch(e.target.value)}
            value={search}
            />
            <button type='submit'>
                <BiSearchAlt2></BiSearchAlt2>
            </button>
        </form>
    </nav>
  )
}

export default Navbar
