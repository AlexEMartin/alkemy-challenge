import axios from "axios";
import swal from "@sweetalert/with-react";
import { useNavigate, Navigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const submitHandler = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    const regexEmail =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (email === "" || password === "") {
      swal(<h2>Los campos no pueden estar vacios</h2>);
      return;
    }

    if (email !== "" && !regexEmail.test(email)) {
      swal(<h2>Debes introducir un correo válido</h2>);
      return;
    }

    if (email !== "challenge@alkemy.org" || password !== "react") {
      swal(<h2>Credenciales inválidas</h2>);
      return;
    }

    axios
      .post("http://challenge-react.alkemy.org", { email, password })
      .then((res) => {
        swal(<h2>ESTAMOS READY</h2>);
        const tokenRecibido = res.data.token;
        sessionStorage.setItem("token", tokenRecibido);
        navigate(`/listado`);
      });
  };

  let token = sessionStorage.getItem("token");

  return (
    <>
      {token && <Navigate to="/listado" />}

      <div className="row">
        <div className="col-6 offset-3">
          <h2 className='mt-4 mb-2'>Formulario de Login</h2>
          <form onSubmit={submitHandler}>
            <label className="form-label d-block mt-2">
              <span>Correo electrónico: </span>
              <br />
              <input className='form-control' type="text" name="email" />
              <br />
            </label>
            <label className="form-label d-block mt-2">
              <span>Contraseña: </span>
              <br />
              <input className='form-control' type="password" name="password" />
            </label>
            <br />
            <button className='btn btn-success mt-2' type="submit">Ingresar</button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
