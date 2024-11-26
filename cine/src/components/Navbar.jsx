import { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { BiCameraMovie, BiSearchAlt2 } from 'react-icons/bi';
import { GiPopcorn } from 'react-icons/gi'; // Ícone de pipoca
import './Navbar.css';

const Navbar = ({ toggleTheme }) => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!search) return;
    navigate(`/search?q=${search}`);
    setSearch("");
  };

  return (
    <nav id='navbar'>
      <div className='logo'>
        <h2>
          <Link to="/">
             <h3 className='Popcorn'>PopcornPlay</h3> <GiPopcorn />
          </Link>
        </h2>
      </div>

      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder='Pesquisar' 
          onChange={(e) => setSearch(e.target.value)} 
          value={search} 
        />
        <button type='submit'>
          <BiSearchAlt2 />
        </button>
      </form>

      {/* Botão para alternar entre os temas */}
      <button onClick={toggleTheme} className="theme-toggle">
        {document.body.classList.contains('light') ? '🌙' : '☀️'}
      </button>
    </nav>
  );
};

export default Navbar;
