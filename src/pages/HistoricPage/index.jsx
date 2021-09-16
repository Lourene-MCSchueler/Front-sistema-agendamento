import ModalBody from '../../components/ModalBody/index.jsx';
import ResultTable from '../../components/ResultTable';
import Background from '../../components/Background';
import doRequest from '../../services/api.js';
import { toast } from 'react-toastify';
import { useState } from 'react';
import { set } from 'date-fns';
import './style.css'

export default function HistoricPage() {
  const [email, setEmail] = useState('');
  const [reserva, setReserva] = useState([]);
  const [modalErro, setModalErro] = useState([]);

  const button = email == '' ? (
    <button disabled style={{ opacity: '50%' }}>buscar</button>) :
    (<button type="button" onClick={onClick} style={{ cursor: 'pointer' }}>buscar</button>);


  function onChange(ev) {
    setEmail(ev.target.value);
  }

  function onClick() {
    setReserva(0);

    doRequest({ url: '/offices/bookings', params: { email: email } })
      .then(r => r.data == 0 ? setModalErro(
        <ModalBody 
        onClose={() => setModalErro([])}
        btnConfirmVisible = {0}  
        > 
          <p>Não foram encontrados agendamentos para esse email <strong>{email}</strong>.</p>
          <span><strong>*Atenção!</strong> Verifique o email ou realize um agendamento.</span>
        </ModalBody>
      ) : setReserva(r.data)
      )
      .catch(erro => setModalErro(
        <ModalBody 
        onClose={() => setModalErro([])}
        btnConfirmVisible = {0}  
        > 
          <p>Não foram encontrados agendamentos para esse email <strong>{email}</strong>.</p>
          <span><strong>*Atenção!</strong> Verifique o email ou realize um agendamento.</span>
        </ModalBody>
      ));
  }

  return (
    <Background>
      <div className="messageHP">
        <h1>Histórico</h1>
        <p>Busque seu histórico de agendamentos da última semana pelo e-mail utilizado na confirmação de sua reserva.</p>
      </div>
      <div className="inputHP">
        <label for="email"></label>
        <input
          type="text"
          placeholder="Insira aqui seu e-mail"
          name="email"
          onChange={onChange}
        />
        {button}
      </div>
      {
        reserva == 0 ? '' : <ResultTable reserva={reserva} />
      }
      {modalErro}
    </Background>
  )
}