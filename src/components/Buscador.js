import swal from "@sweetalert/with-react";
import { useNavigate } from 'react-router-dom'

function Buscador() {
  const navigate = useNavigate();
  const submitHandler = (e) => {
    e.preventDefault();
    const keyword = e.currentTarget.keyword.value.trim();
    if (keyword.length === 0) {
      swal(<h5>Tienes que escribir una palabra clave</h5>);
    } else if (keyword.length < 4) {
      swal(<h5>Tienes que escribir al menos 4 caracteres</h5>);
    } else {
      e.currentTarget.keyword.value = '';
      navigate(`/resultados?keyword=${keyword}`);
    }
  };

  return (
    <form onSubmit={submitHandler}>
      <label className="form-label mt-2">
        <input
          className="form-control"
          placeholder="Buscar.."
          type="text"
          name="keyword"
        />
      </label>

      <button className="btn btn-success ms-4 mb-1" type="submit">
        Buscar
      </button>
    </form>
  );
}

export default Buscador;
