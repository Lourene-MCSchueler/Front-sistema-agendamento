import { NavLink } from 'react-router-dom';
import './style.css'
import { ReactComponent as HomeImageM } from './assets/home.svg';
import { ReactComponent as BookImageM } from './assets/book.svg';
import { ReactComponent as ClockImageM } from './assets/clock.svg';
import { ReactComponent as CancelImageM } from './assets/cancel.svg';

function AsideMobile() {

  return (
    <div className="aside-mob">
      <nav>
        <ul>
          <li><NavLink exact to="/" activeClassName="active" className="to"><HomeImageM />Início</NavLink></li>
          <li><NavLink to="/booking" activeClassName=" active" className="to"><BookImageM />Agendar</NavLink></li>
          <li><NavLink to="/historic" activeClassName=" active" className="to"><ClockImageM />Histórico</NavLink></li>
          <li><NavLink to="/cancel" activeClassName=" active" className="to"><CancelImageM />Cancelar</NavLink></li>
        </ul >
      </nav >
    </div >
  )
}

export default AsideMobile;
