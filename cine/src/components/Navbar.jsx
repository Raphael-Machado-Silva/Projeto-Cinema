import { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { BiSearchAlt2 } from 'react-icons/bi';
import { GiPopcorn } from 'react-icons/gi'; // Ícone de pipoca
import PropTypes from 'prop-types'; // Importando PropTypes
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

  // Determina o estado atual do tema para alterar o estilo do toggle
  const isLightMode = document.body.classList.contains('light');

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

      {/* Switch Toggle */}
      <div className="theme-switch" onClick={toggleTheme}>
        <span className={`switch ${isLightMode ? "light" : "dark"}`}>
          {isLightMode ? "☀️" : "🌙"}
        </span>
      </div>
    </nav>
  );
};

// Validando a prop 'toggleTheme' como uma função
Navbar.propTypes = {
  toggleTheme: PropTypes.func.isRequired,
};

export default Navbar;
