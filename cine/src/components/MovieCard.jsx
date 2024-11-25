import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import PropTypes from "prop-types";  // Importando o PropTypes
import "./MovieCard.css";

const imageUrl = import.meta.env.VITE_IMG;

const MovieCard = ({ movie, showLink = true }) => {
  const isMovie = movie.title !== undefined;  // 'title' é para filmes, 'name' é para séries
  const title = isMovie ? movie.title : movie.name;  // Título (name para séries, title para filmes)
  const posterPath = movie.poster_path;
  const voteAverage = movie.vote_average || "N/A";  // Fallback caso vote_average seja undefined
  const overview = movie.overview || "Descrição indisponível.";  // Fallback para overview
  const id = movie.id;
  const linkType = isMovie ? "movie" : "tv";  // Define o tipo de link (movie ou tv)

  return (
    <div className="movie-card">
      <img src={imageUrl + posterPath} alt={title} />
      <div className="hover-info">
        <h3>{title}</h3>
        <p className="rating">
          <FaStar /> {voteAverage}
        </p>
        <p className="description">
          {overview.length > 150 ? overview.substring(0, 150) + "..." : overview}
        </p>
        {showLink && <Link to={`/${linkType}/${id}`}>Detalhes</Link>}
      </div>
    </div>
  );
};

// Definindo a validação de props
MovieCard.propTypes = {
  movie: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string,
    name: PropTypes.string,
    poster_path: PropTypes.string.isRequired,
    vote_average: PropTypes.number,
    overview: PropTypes.string,
  }).isRequired,
  showLink: PropTypes.bool,
};

export default MovieCard;
