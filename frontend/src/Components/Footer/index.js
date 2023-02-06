import style from './style.module.css'

function Footer() {
  return (
    <div id="footer" className={`container-fluid ${style.footer}`}>
      <div className="row no-gutters justify-content-center">
        <div className="col-md-2">
          <a className={style.link} href="https://careers-meli.mercadolibre.com/?utm_campaign=site-mlc&utm_source=mercadolibre&utm_medium=mercadolibre" target="_blank">Trabaja con nosotros</a>
        </div>
        <div className="col-md-2">
          <a className={style.link} href="https://www.mercadolibre.cl/ayuda/terminos-y-condiciones-uso_1843" target="_blank">Términos y condiciones</a>
        </div>
        <div className="col-md-2">
          <a className={style.link} href="https://www.mercadolibre.cl/privacidad" target="_blank">Cómo cuidamos tu privacidad</a>
        </div>
        <div className="col-md-2">
          <a className={style.link} href="https://www.mercadolibre.cl/accesibilidad" target="_blank">Accesibilidad</a>
        </div>
        <div className="col-md-2">
          <a className={style.link} href="https://www.mercadolibre.cl/ayuda" target="_blank">Ayuda</a>
        </div>
      </div>
      <div className="row justify-start">
        <div className="col-12 d-flex justify-content-center">
          <small className='text-center'>Copyright © 1999-2023 MercadoLibre Chile Ltda.</small>
        </div>
      </div>
      <div className="row">
        <div className="col-12 d-flex justify-content-center">
          <address className={style.address}>Av. Apoquindo 4800, Torre 2, piso 21, Las Condes, Santiago - Chile.</address>
        </div>
      </div>
    </div >
  );
}

export default Footer;