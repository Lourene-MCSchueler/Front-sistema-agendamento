import './style.css';


export default function Ticket({ booking }) {
  return (
    <div className="ticket-box">
      <div className="ticket-number">{booking.id}</div>
      <div className="tickets">
        <div className="ticket-left">
          <img src="/images/ticketOK.svg" alt="" />
          {booking.begin !== undefined ? <p>{booking.moment} <br /> {booking.begin}h - {booking.end}h</p> : <p>{booking.moment}</p>}</div>
        <div className="ticket-right">
          <div className="ticket-right-info-header">
            <p>Unidade</p>
            {booking.chair !== undefined ? <p>Sala</p> : ''}
          </div>
          <div className="ticket-right-info">
            {booking.officeName}
            {booking.chair !== undefined ? <p>{booking.chair}</p> : ''}
          </div>
        </div>
      </div>
    </div>

  )
}