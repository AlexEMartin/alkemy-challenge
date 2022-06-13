import { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";
import swal from "@sweetalert/with-react";


function Resultados(props) {
  let query = new URLSearchParams(window.location.search);
  let keyword = query.get("keyword");

  const [moviesResults, setMoviesResults] = useState([])

  useEffect(() => {
    const endPoint = `https://api.themoviedb.org/3/search/movie?api_key=b1857ba56197ae84cff79e8d15addf8b&language=en-US&query=${keyword}`;

    axios
      .get(endPoint)
      .then((response) => {
        const moviesArray = response.data.results;
        if(moviesArray.length === 0) {
           swal(<h5>Tu búsqueda no arrojó resultados.</h5>)
        }
        setMoviesResults(moviesArray);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [keyword])


  return (
    <>
      <h2>Buscaste: <em>{keyword}</em></h2>
      {moviesResults.length === 0 && <h4>No hay resultados.</h4>}
      <div className="row">
        {moviesResults.map((movie) => (
          <div key={movie.id} className="col-4 my-4">
            <Card style={{ width: "18rem" }}>
              <Card.Img variant="top" src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} />
              <button
                onClick={props.addOrRemoveFromFavs}
                className="favourite-btn"
                data-movie-id={movie.id}
              >
                🖤
              </button>
              <Card.Body>
                <Card.Title>{movie.title.substring(0, 18)}...</Card.Title>
                <Card.Text>
                  {movie.overview.substring(0, 100)}...
                </Card.Text>
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

export default Resultados;
