import { useEffect, useState } from "react"
import { useLocation } from "react-router"
import './style.css'
import { Link } from "react-router-dom"



const ErrorPage = () => {
  const location = useLocation();
  const [error, setError] = useState();

  useEffect(() => {
    if (location.state !== undefined) {
      setError(location.state.params)
    }
  }, [location])

  return (
    <div className="main-error-container">
      <div className="image-error">
        <img src="/images/logo.svg" alt="logo" />
      </div>
      <div className="error-information">
        {error !== undefined ?
          <>
            <h1>Erro: {error.status}</h1>
            <p>{error.message}</p>
            <div className="main-error-information">
              {error.errors && error.errors.map(x => (
                <span key={x.message}>{x.message}</span>
              ))}
            </div>
          </>
          :
          <>
            <h1>404</h1>
            <div className="main-error-information">
              <span>Nada de interessante por aqui</span>
            </div>
          </>}
        <img src="/images/errorSpace.png" alt="Space Rocket" />
        <Link to="/"><p>Voltar para a tela inicial</p></Link>
      </div>
    </div>)
}

export default ErrorPage;