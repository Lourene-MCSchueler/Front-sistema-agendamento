import { NavLink } from 'react-router-dom';
import './style.css'
import { ReactComponent as HomeImage } from './assets/home.svg';
import { ReactComponent as BookImage } from './assets/book.svg';
import { ReactComponent as ClockImage } from './assets/clock.svg';
import { ReactComponent as CancelImage } from './assets/cancel.svg';

function AsideDesktop() {

  return (
    <div className="aside-desk">
      <nav>
        <ul>
          <li><NavLink exact to='/' activeClassName="active"><HomeImage /></NavLink></li>
          <li><NavLink to='/booking' activeClassName="active"><BookImage /></NavLink></li>
          <li><NavLink to='/historic' activeClassName="active"><ClockImage /></NavLink></li>
          <li><NavLink to='/cancel' activeClassName="active"><CancelImage /></NavLink></li>
        </ul>
      </nav>
    </div>
  )
}

export default AsideDesktop;

