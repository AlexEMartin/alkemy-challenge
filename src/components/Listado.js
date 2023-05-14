import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";
import axios from "axios";
import swal from "@sweetalert/with-react";

function Listado(props) {

  const [moviesList, setMoviesList] = useState([]);

  useEffect(() => {
    const endPoint =
      `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`;
    axios
      .get(endPoint)
      .then((response) => {
        const apiData = response.data.results;
        setMoviesList(apiData);
      })
      .catch((error) => {
        swal(<h5>Ha ocurrido un error, vuelve a intentarlo más tarde.</h5>);
      });
  }, [setMoviesList]);

  return (
    <>
      <div className="row">
        {moviesList.map((movie) => (
          <div key={movie.id} className="col-md-3 d-flex justify-content-center align-items-center my-4">
            <Card style={{ width: "18rem" }}>
              <Card.Img
                variant="top"
                src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
              />
              <button
                onClick={props.addOrRemoveFromFavs}
                className="favourite-btn"
                data-movie-id={movie.id}
              >
                🖤
              </button>
              <Card.Body>
                <h5>{movie.title.substring(0, 18)}...</h5>
                <p>{movie.overview.substring(0, 100)}...</p>
                <Link to={`/detalle?movieID=${movie.id}`} variant="primary">
                  View Detail
                </Link>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
    </>
  );
}

export default Listado;
