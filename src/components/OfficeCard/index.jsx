import stringToDate from '../../services/formatDate';
import doRequest from '../../services/api';
import RoomIcon from './RoomIcon';
import { ReactComponent as Dot } from './assets/dot.svg';
import React, { useEffect, useState } from 'react';
import ModalBody from '../ModalBody';
import { useHistory } from 'react-router'
import './style.css';

const OfficeCard = ({ office }) => {
  const [officeState, setOfficeState] = useState()
  const [reunionArgs, setReunionArgs] = useState({})
  const [reunionState, setReunionState] = useState()
  const [roomContent, setRoomContent] = useState()
  const [modalVisibleDay, setModalVisibleDay] = useState(false);
  const [modalVisibleReunion, setModalVisibleReunion] = useState(false);
  const [email, setEmail] = useState('')
  const history = useHistory()

  const [bookingDay, setBookingDay] = useState({
    employee_id: '',
    moment: '',
    type: 1
  })

  const [bookingReunion, setBookingReunion] = useState({
    begin: 8,
    chair: 0,
    employee_id: '',
    end: 18,
    moment: '',
    type: 0,
    weight: 2
  })

  const onSimpleSelect = (e) => {
    const value = stringToDate(e.target.value)
    const name = e.target.name

    doRequest({ url: `/offices/${office?.id}`, params: { date: value } })
      .then(r => setOfficeState(r.data))

    setBookingDay(data => ({ ...data, [name]: e.target.value }))
  }

  const onMultipleSelect = (e) => {
    const name = e.target.name
    const value = e.target.value

    setReunionArgs(data => ({ ...data, [name]: value }))
    setBookingReunion(data => ({ ...data, [name]: value }))
  }

  const getId = (id) => {
    const chair = roomContent?.content.find(r => r.id === id)
    if (chair?.available) {
      setBookingReunion(data => ({ ...data, chair: chair.id }))
    }
  }

  const handleOnSubmitDay = () => {
    const payload = {
      ...bookingDay,
      employee_id: email
    }


    setModalVisibleDay(false);
    doRequest({ url: `/offices/${office?.id}/bookings`, method: 'POST', data: payload })
      .then(r => history.push('/bookings/confirmation', { ...r.data, officeName: office?.name }))
      .catch(error => history.push('/bookings/error', { params: error.response.data }))
  }

  const handleOnSubmitReunion = () => {
    const payload = {
      ...bookingReunion,
      employee_id: email
    }
    console.log(payload)
    doRequest({ url: `/offices/${office?.id}/bookings`, method: 'POST', data: payload })
      .then(r => history.push('/bookings/confirmation', { ...r.data, officeName: office?.name }))
      .catch(error => history.push('/bookings/error', { params: error.response.data }))
  }

  useEffect(() => {
    if (reunionArgs.moment !== undefined && reunionArgs.begin !== undefined && reunionArgs.end) {
      const date = stringToDate(reunionArgs.moment);
      const begin = reunionArgs.begin;
      const end = reunionArgs.end;

      doRequest({ url: `/offices/${office?.id}`, params: { date, begin, end } })
        .then(r => setReunionState(r.data))

      doRequest({ url: `/offices/${office?.id}/chairs`, params: { date, begin, end } })
        .then(r => setRoomContent(r.data))
    }

  }, [reunionArgs, office])

  return (
    <div className="office-card">
      <span>*&nbsp;Lotação máxima restrita: <b>{office?.restrictedCapacity}</b> pessoas</span>
      <div className="office-information">

        <div className="work-day">
          <span>Estações de trabalho</span>
          <p className="bold-p">Escolha uma data</p>
          <select className="form-select" onChange={onSimpleSelect} name="moment">
            <option style={{ display: 'none' }}>Datas disponíveis</option>
            {office?.days.map(day => (
              <option value={day.date} key={day.dayNumber}>{day.date}</option>
            ))}
          </select>
          <p className="info-p">Pessoas no escritório nesse momento: {officeState && <b>{officeState.totalEmployees}</b>}</p>
          <p className="bold-p">
            <Dot color={`${officeState !== undefined && officeState?.totalEmployees >= officeState?.restrictedCapacity ? 'red' : 'green'}`} />
            &nbsp;Lugares disponíveis: {officeState && <b>{officeState.restrictedCapacity - officeState.totalEmployees}</b>}
          </p>

          <button
            className={`${officeState !== undefined && (officeState.totalEmployees >= officeState?.restrictedCapacity) ? 'disabled' : ''}`}
            onClick={() => setModalVisibleDay(true)}>Agendar Estação</button>
        </div>

        <div className="work-reunion">
          <span>Salas de reunião</span>
          <p className="bold-p">Escolha uma data</p>
          <select className="form-select" onChange={onMultipleSelect} name="moment" value={reunionArgs.moment}>
            <option style={{ display: 'none' }}>Datas disponíveis</option>
            {office?.days.map(day => (
              <option value={day.date} key={day.dayNumber}>{day.date}</option>
            ))}
          </select>
          <div className="time-select">
            <div>
              <p><b>Hora inicial</b></p>
              <select className="form-select" name="begin" value={reunionArgs.begin} onChange={onMultipleSelect}>
                <option style={{ display: 'none' }}></option>
                <option value='8'>08h</option>
                <option value='9'>09h</option>
                <option value='10'>10h</option>
                <option value='11'>11h</option>
                <option value='12'>12h</option>
                <option value='13'>13h</option>
                <option value='14'>14h</option>
                <option value='15'>15h</option>
                <option value='16'>16h</option>
                <option value='17'>17h</option>
                <option value='18'>18h</option>
              </select>
            </div>
            <div>
              <div>
                <p><b>Hora final</b></p>
                <select className="form-select" name="end" value={reunionArgs.end} onChange={onMultipleSelect}>
                  <option style={{ display: 'none' }}></option>
                  <option value='8'>08h</option>
                  <option value='9'>09h</option>
                  <option value='10'>10h</option>
                  <option value='11'>11h</option>
                  <option value='12'>12h</option>
                  <option value='13'>13h</option>
                  <option value='14'>14h</option>
                  <option value='15'>15h</option>
                  <option value='16'>16h</option>
                  <option value='17'>17h</option>
                  <option value='18'>18h</option>
                </select>
              </div>
            </div>
          </div>

          <p className="info-p">
            <Dot color={`${reunionState !== undefined && reunionState?.totalEmployees >= reunionState.restrictedCapacity ? 'red' : 'green'}`} />
            &nbsp;Pessoas no escritório nesse momento: {reunionState && <b>{reunionState.totalEmployees}</b>}</p>
          <p className="bold-p">
            <Dot color={`${reunionState !== undefined && reunionState?.totalRooms < 1 ? 'red' : 'green'}`} />
            &nbsp;Salas disponíveis: {reunionState && <b>{reunionState.totalRooms}</b>}
          </p>

          <div className="room-container">
            {roomContent && roomContent.content.map(room => (
              <RoomIcon room={room} key={room.id} onClick={getId} />
            ))}

          </div>

          <button
            className={`${reunionState !== undefined && (reunionState.totalRooms < 1 || reunionState?.totalEmployees >= reunionState?.restrictedCapacity) ? 'disabled' : ''}`}
            onClick={() => setModalVisibleReunion(true)}
          >Agendar sala</button>
        </div>
      </div>



      {modalVisibleDay &&
        <ModalBody onClose={() => setModalVisibleDay(false)} onModalAction={handleOnSubmitDay}>
          <div className="modal-content-children">
            <p>Você selecionou:</p>
            <div className="modal-reunion-info">
              <p>Dia: <strong>{bookingDay.moment}</strong></p>
              <p>Unidade: <strong>{office?.name}</strong></p>
            </div>
            <div className="modal-email-input">
              <p>Agora só falta colocar o seu e-mail para confirmarmos o seu agendamento!</p>
              <label for="email">E-mail</label>
              <input type="text" id="email" onChange={e => setEmail(e.target.value)} value={email} />
            </div>
          </div>
        </ModalBody>
      }
      {modalVisibleReunion &&
        <ModalBody onClose={() => setModalVisibleReunion(false)} onModalAction={handleOnSubmitReunion}>
          <div className="modal-content-children">
            <p>Você selecionou:</p>
            <div className="modal-reunion-info">
              <p>Dia: <strong>{bookingReunion.moment}</strong> - <strong>{bookingReunion.weight}</strong> Lugares</p>
              <p>Unidade: <strong>{office?.name}</strong></p>
              <div className="info">
                <p>Sala: <strong>{bookingReunion.chair}</strong></p>
                <p>Horário: <strong>{bookingReunion.begin}h - {bookingReunion.end}h</strong></p>
              </div>
            </div>
            <div className="modal-email-input">
              <p>Agora só falta colocar o seu e-mail para confirmarmos o seu agendamento!</p>
              <label for="email">E-mail</label>
              <input type="text" id="email" onChange={e => setEmail(e.target.value)} value={email} />
            </div>
          </div>
        </ModalBody>
      }
    </div>
  )
}

export default OfficeCard