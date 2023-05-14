import { useEffect, useState } from "react";
import axios from "axios";

function Detalle() {

  let query = new URLSearchParams(window.location.search);
  let movieID = query.get("movieID");

  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const endPoint = `https://api.themoviedb.org/3/movie/${movieID}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`;

    axios
      .get(endPoint)
      .then((response) => {
        const movieData = response.data;
        setMovie(movieData);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [movieID]);

  return (
    <>
      {!movie && <p>Cargando...</p>}
      {movie && (
        <>
          <div className="container">
            <h5 className="mt-4 mb-4">Título: {movie.title}</h5>
            <div className="row">
              <div className="col-4">
                <img
                  src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                  className="img-fluid"
                  alt="movie poster"
                />
              </div>
              <div className="col-8">
                <h5>
                  Fecha de estreno: <small>{movie.release_date}</small>
                </h5>
                <h5>Reseña: </h5>
                <p>{movie.overview}</p>
                <h5>Rating: {movie.vote_average}</h5>
                <h5>Género: </h5>
                <ul>
                  {movie.genres.map((oneGenre) => (
                    <li key={oneGenre.id}>{oneGenre.name}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default Detalle;
