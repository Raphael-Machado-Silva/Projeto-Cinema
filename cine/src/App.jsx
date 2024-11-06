import './App.css';
import { Link, Outlet } from "react-router-dom";
import logo from './assets/logo.webp';  // Importe a imagem aqui

function App() {

  return (
    <div className='App'>
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
          <Link to="/">CineStream</Link>
        </h2>
        <Link to="/movie/1">Filmes</Link>
        <Link to="/search">Search</Link>
      </nav>

      <h2>CineStream</h2>
      <Outlet></Outlet>
    </div>
  );
}

export default App;
