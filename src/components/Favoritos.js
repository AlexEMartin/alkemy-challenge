import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

function Favoritos(props) {

const miLocal = localStorage.getItem("favs");
const aMapear = JSON.parse(miLocal);

  return (
    <>
      <h2>Sección favoritos</h2>
      <div className="row">
        {aMapear.length === 0 && <div className="col-12 text-danger">No hay favoritos</div>}  
        {aMapear.map((movie) => (
          <div key={movie.id} className="col-3 my-4">
            <Card style={{ width: "18rem" }}>
              <Card.Img
                variant="top"
                src={movie.imgUrl}
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

export default Favoritos;
