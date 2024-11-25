import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { BsStar, BsFillCalendarDateFill, BsFillTvFill, BsTag, BsFillCircleFill, BsFillFileEarmarkTextFill } from 'react-icons/bs'; // Novos ícones para status e gêneros
import './TVShow.css'; // Importando o CSS

const TVShow = () => {
  const { id } = useParams();
  const [tvShow, setTvShow] = useState(null);
  const [trailerKey, setTrailerKey] = useState(null); // Armazena a chave do trailer
  const [error, setError] = useState(null);

  useEffect(() => {
    const getTVShow = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/tv/${id}?api_key=de5dba7ba60e841f3213d70cc2583b55&language=pt-BR`
        );

        if (!response.ok) {
          throw new Error(`Erro ao buscar série: ${response.status}`);
        }

        const data = await response.json();
        setTvShow(data);

        // Obter o trailer da série
        const trailerResponse = await fetch(
          `https://api.themoviedb.org/3/tv/${id}/videos?api_key=de5dba7ba60e841f3213d70cc2583b55&language=pt-BR`
        );

        const trailerData = await trailerResponse.json();
        if (trailerData.results && trailerData.results.length > 0) {
          setTrailerKey(trailerData.results[0].key); // Pega o trailer
        }

      } catch (err) {
        console.error('Erro ao buscar série: ', err);
        setError('Falha ao carregar os dados da série');
      }
    };

    getTVShow();
  }, [id]);

  if (error) {
    return <div>{error}</div>; // Mostra uma mensagem de erro se houver
  }

  if (!tvShow) {
    return <div>Carregando...</div>; // Enquanto os dados não são carregados, exibe "Carregando..."
  }

  const formatGenres = (genres) => {
    if (genres && genres.length > 0) {
      return genres.map(genre => genre.name).join(", ");
    }
    return "Gêneros não disponíveis";
  };

  const formatStatus = (status) => {
    switch (status) {
      case 'Returning Series':
        return 'Série em Andamento';
      case 'Ended':
        return 'Série Finalizada';
      case 'Canceled':
        return 'Série Cancelada';
      default:
        return 'Status desconhecido';
    }
  };

  return (
    <div className="movie-page"> {/* Usando o estilo da página de filmes */}
      {/* Cabeçalho da série */}
      <div className="movie-header">
        <h1>{tvShow.name}</h1>
        <p className="release-year">{new Date(tvShow.first_air_date).getFullYear()}</p> {/* Ano de estreia */}
      </div>

      {/* Trailer da série */}
      {trailerKey && (
        <div className="movie-trailer">
          <h2 className="trailer-title">Trailer</h2>
          <iframe
            width="100%"
            height="400"
            src={`https://www.youtube.com/embed/${trailerKey}`}
            title="Trailer"
            frameBorder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      )}

      {/* Informações sobre a série */}
      <div className="movie-info">
        <div className="info">
          <h3>
            <BsStar /> Classificação Média:
          </h3>
          <p>{tvShow.vote_average ? tvShow.vote_average : 'Sem avaliação'}</p> {/* Exibe a classificação */}
        </div>

        <div className="info">
          <h3>
            <BsFillCalendarDateFill /> Número de Temporadas:
          </h3>
          <p>{tvShow.number_of_seasons ? tvShow.number_of_seasons : 'Sem informações'}</p> {/* Exibe o número de temporadas */}
        </div>

        <div className="info">
          <h3>
            <BsFillTvFill /> Número de Episódios:
          </h3>
          <p>{tvShow.number_of_episodes ? tvShow.number_of_episodes : 'Sem informações'}</p> {/* Exibe o número de episódios */}
        </div>

        <div className="info">
          <h3>
            <BsFillCircleFill /> Status:
          </h3>
          <p>{formatStatus(tvShow.status)}</p> {/* Exibe o status da série em português */}
        </div>

        <div className="info">
          <h3>
            <BsTag /> Gêneros:
          </h3>
          <p>{formatGenres(tvShow.genres)}</p> {/* Exibe os gêneros da série */}
        </div>

        <div className="info description">
          <h3>
            <BsFillFileEarmarkTextFill /> Descrição:
          </h3>
          <p>{tvShow.overview ? tvShow.overview : 'Sem descrição disponível'}</p> {/* Descrição da série */}
        </div>
      </div>
    </div>
  );
};

export default TVShow;
