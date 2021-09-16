import Background from '../../components/Background';
import ModalBodyCancelar from '../../components/ModalBodyCancelar/index.jsx';
import doRequest from '../../services/api.js';
import { useState } from 'react';
import './style.css';

export default function CancelPage(props) {
  const [idTicket, setIdTicket] = useState([]);
  const [modalInfo, setModalInfo] = useState([]);

  const button = idTicket == '' ? (
    <button disabled style={{ opacity: '50%' }}>cancelar ticket</button>)
    :
    (<button type="button" onClick={onClick} style={{ cursor: 'pointer' }}>cancelar ticket</button>);

  function onChange(ev) {
    setIdTicket(ev.target.value);
  }

  function onClick() {
    setModalInfo(
      <ModalBodyCancelar
        onClose={() => setModalInfo([])}
        onModalAction={requisicao}
        className="modal">
        <p>Tem certeza que deseja cancelar o ticket <strong>{idTicket}</strong>?</p>
        <span><strong>*Atenção!</strong> Depois de confirmada, essa ação não poderá ser desfeita.</span>
      </ModalBodyCancelar>
    );
  }

  const requisicao = () => {
    doRequest({ url: `/offices/bookings/${idTicket}`, method: 'DELETE' })
      .then(resposta =>
        setModalInfo(
          <ModalBodyCancelar
            onClose={() => setModalInfo([])}
            onModalAction={requisicao}
            btnConfirmVisible={0}
            className="modal">
            <p>O ticket <strong>{idTicket}</strong> foi cancelado com sucesso</p>
            <span><strong>Atenção!</strong> Você receberá um e-mail com a confirmação do cancelamento..</span>
          </ModalBodyCancelar>
        )
      )
      .catch(erro =>
        setModalInfo(
          <ModalBodyCancelar
            onClose={() => setModalInfo([])}
            btnConfirmVisible={0}
            className="modal">
            <p>O Ticket <strong>{idTicket}</strong> não foi encontrado.</p>
            <span><strong>Atenção!</strong> verifique o numero do ticket e tente novamente.</span>
          </ModalBodyCancelar>
        )
      )
  };

  return (
    <Background>
      <div className="messageCP">
        <h1>Cancelar Ticket</h1>
        <p>Para cancelar uma reserva já realizada,
          por favor insira o número do ticket correspondente
          à esse agendamento no espaço abaixo.
        </p>
      </div>
      <div>
        <form className="formCP" action="">
          <input
            type="text"
            placeholder="Insira o número do seu Ticket"
            name="" id="" onChange={onChange}
          />
          {button}
        </form>
        {modalInfo}
      </div>
    </Background>
  );
}


