import logo from '../assets/logo.webp';  // Importe a imagem aqui
import { Link } from "react-router-dom";
import {BiCameraMovie, BiSearchAlt2} from 'react-icons/bi'

const Navbar = () => {
  return (
    <nav id='navbar'>
        <h2>
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
          <Link to="/"><BiCameraMovie></BiCameraMovie>CineStream</Link>
        </h2>
        <form>
            <input type="text" placeholder='Busque um filme' />
            <button type='submit'>
                <BiSearchAlt2></BiSearchAlt2>
            </button>
        </form>
    </nav>
  )
}

export default Navbar
