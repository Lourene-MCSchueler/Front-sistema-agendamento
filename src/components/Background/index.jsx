import './style.css';
import AsideDesktop from '../Aside/AsideDesktop';
import AsideMobile from '../Aside/AsideMobile';

export default function Background(props) {
  return (
    <div className="page">
      <div className="images">
        <img className="logo" src="/images/logoLaranja.svg" alt="logo" />
        <img className="pontilhado" src="/images/pontilhado.svg" alt="pontilhado" />
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