import { useState, useEffect } from "react";
import { FaFilm, FaTv } from 'react-icons/fa'; // Ícones de filme e TV
import { Link } from "react-router-dom"; // Para navegação
import MovieCard from '../components/MovieCard';
import CategoryMenu from '../components/CategoryMenu'; // Componente para menu de categorias
import './MoviesGrid.css';

const moviesURL = import.meta.env.VITE_API;
const tvURL = import.meta.env.VITE_TV_API;
const apiKey = import.meta.env.VITE_API_KEY;

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [category, setCategory] = useState('');
  const [isMovies, setIsMovies] = useState(true); // Estado para alternar entre Filmes e Séries

  // Função para obter filmes ou séries por categoria
  const getMoviesOrSeriesByCategory = async (categoryId) => {
    setLoading(true);
    setError(null);
    let url = '';

    try {
      if (isMovies) {
        // URL para filmes
        url = `${moviesURL}${categoryId ? categoryId : "popular"}?api_key=${apiKey}&language=pt-BR`;
      } else {
        // URL para séries
        url = `${tvURL}${categoryId ? categoryId : "popular"}?api_key=${apiKey}&language=pt-BR`;
      }

      const res = await fetch(url);
      if (!res.ok) {
        throw new Error('Falha ao carregar conteúdo');
      }
      const data = await res.json();
      setMovies(data.results);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    getMoviesOrSeriesByCategory(category);
  }, [category, isMovies]);

  return (
    <div className="container">
      <h2 className="title">{isMovies ? 'Filmes' : 'Séries'}</h2>
      
      {/* Botões para alternar entre Filmes e Séries */}
      <div className="toggle-buttons">
        <button 
          className={`toggle-button ${isMovies ? 'active' : ''}`}
          onClick={() => setIsMovies(true)}
        >
          <FaFilm style={{ marginRight: '8px' }} /> Filmes
        </button>
        <button 
          className={`toggle-button ${!isMovies ? 'active' : ''}`}
          onClick={() => setIsMovies(false)}
        >
          <FaTv style={{ marginRight: '8px' }} /> Séries
        </button>
      </div>

      {/* Exibe o menu de categorias */}
      <CategoryMenu onCategorySelect={setCategory} />

      {error && <p className="error-message">Erro ao carregar conteúdo: {error}</p>}

      <div className="movies-container">
        {loading && <p>Carregando...</p>}
        {!loading && !error && movies.length > 0 &&
          movies.map((movie) => <MovieCard movie={movie} key={movie.id} />)
        }
        {!loading && !error && movies.length === 0 && <p>Nenhum conteúdo encontrado.</p>}
      </div>

      {/* Link para pesquisa com passagem do estado isMovies */}
      <div className="search-link">
        <Link to={`/search?isMovies=${isMovies}`}>Ir para Pesquisa</Link>
      </div>
    </div>
  );
};

export default Home;
