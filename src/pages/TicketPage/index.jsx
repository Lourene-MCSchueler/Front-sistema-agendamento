import './style.css';
import { Link, useLocation } from 'react-router-dom';
import Ticket from '../../components/Ticket';

function TicketPage() {

  const location = useLocation();

  return (
    <div className="ticket-page">

      <div className="top">
        <div className="logo">
          <img src="/images/logo.svg" alt="logo" />
        </div>
        <div className="msg">
          <h1>CONFIRMADO!</h1>
          <div className="image-space">
            <img src="/images/space.svg" alt="foguete" />
          </div>
        </div>
      </div>

      <div className="text">
        <p>Seu agendamento foi concluído com sucesso e gerou o ticket:</p>
      </div>

      <div className="middle">
        <div className="ticket">
          {location.state && <Ticket booking={location.state} />}
        </div>
      </div>

      <div className="bottom">

        <p className="text">Salve, anote ou copie este número, pois ele é seu passe de entrada para
          o escritório, certo? Porém, se não conseguir agora, tudo bem também, mandamos
          para o seu email.
        </p>
        <div className="bottom-info">
          <div className="bottom-image">
            <img src="/images/mascara.svg" alt="use-mascara" />
          </div>
          <p className="link"><Link to="/">Voltar para a tela inicial</Link></p>
        </div>
      </div>
    </div>
  )
}

export default TicketPage;