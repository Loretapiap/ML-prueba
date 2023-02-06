import React, { useState, useEffect, useContext } from 'react';
import { getUser } from '../../Services';
import { UserContext } from '../../Context';

import logo from '../../Assets/logo.png'
import icon from '../../Assets/icons/profileIcon.svg';
import subscribe from '../../Assets/subscribe.png'
import style from './style.module.css'

function Header() {
  const { state, dispatch } = useContext(UserContext);
  const [hover, setHover] = useState(false);
  const [userInfo, setUserInfo] = useState({
    id_usuario: '',
    nombre: 'Sin información',
    apellido: 'Sin información',
    nivel: 'Básico',
    imagen: icon
  });


  const handleMouseEnter = () => {
    setHover(true);
  };

  const handleMouseLeave = () => {
    setHover(false);
  };

  useEffect(() => {
    (async () => {
      const personData = await getUser();
      if (personData) {
        setUserInfo(personData);
        dispatch({
          type: 'set_user',
          payload: personData
        });
      }
    })()
  }, []);
  return (
    <>
      <nav className={`navbar navbar-expand-lg justify-content-between border-bottom ${style.navbar}`}>
        <a className="navbar-brand px-3" href="/">
          <img src={logo} alt="logo mercadolibre" />
        </a>
        <div className='mr-3 d-none d-md-flex'>
          <img src={subscribe} className={style.subscribe} alt="banner suscipcion" />
        </div>
      </nav>
      <div className={`py-2 ${style.navbar}`} onMouseLeave={handleMouseLeave}>
        <div className='d-flex justify-content-end align-items-center w-100'>
          <img src={icon} className={style.img} />
          <div className=''>
            <p className='px-2 mb-0 text-end' onMouseEnter={handleMouseEnter}>
              {userInfo.nombre}
            </p>
          </div>
        </div>
        <div className={`d-flex justify-content-end ${style.dropdowncontainer}`}>
          {
            hover && (
              <div className="dropdown show">
                <div className="dropdown-menu show" aria-labelledby="dropdownMenuButton">
                  <a className="dropdown-item" href="/profile">Perfil</a>
                  <a className="dropdown-item" href="/purchases">Mis compras</a>
                </div>
              </div>
            )
          }
        </div>
      </div>
    </>
  );
}

export default Header;