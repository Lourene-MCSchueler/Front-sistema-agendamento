import './style.css';
import AsideDesktop from '../Aside/AsideDesktop';
import AsideMobile from '../Aside/AsideMobile';

export default function HomeBack(props) {
  return (
    <div className="pageH">
      <div className="images">
        <img className="logo" src="/images/logoLaranja.svg" alt="logo" />
        <img className="agenda" src="/images/agenda.svg" alt="agenda-laranja" />
      </div>
      <div className="container-page">
        <AsideDesktop />
        <div className="white-page">
          {props.children}
          <AsideMobile />
        </div>
      </div>
    </div>
  )

}