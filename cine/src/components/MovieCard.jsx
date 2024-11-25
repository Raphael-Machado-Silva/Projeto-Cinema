import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import "./MovieCard.css";

const imageUrl = import.meta.env.VITE_IMG;

const MovieCard = ({ movie, showLink = true }) => {
  return (
    <div className="movie-card">
      <img src={imageUrl + movie.poster_path} alt={movie.title} />
      <div className="hover-info">
        <h3>{movie.title}</h3>
        <p className="rating">
          <FaStar /> {movie.vote_average}
        </p>
        <p className="description">
          {movie.overview
            ? movie.overview.length > 150
              ? movie.overview.substring(0, 150) + "..."
              : movie.overview
            : "Descrição indisponível."}
        </p>
        {showLink && <Link to={`/movie/${movie.id}`}>Detalhes</Link>}
      </div>
    </div>
  );
};

export default MovieCard;
