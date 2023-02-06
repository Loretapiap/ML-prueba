import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../../Context';
import { getUser } from '../../Services';
import List from '../../Components/List';
import icon from '../../Assets/icons/profileIcon.svg';
import style from './style.module.css';

function Profile() {
  const { state, dispatch } = useContext(UserContext);

  const [loader, setLoader] = useState(true);
  const [userInfo, setUserInfo] = useState({
    id_usuario: '',
    nombre: 'Sin información',
    apellido: 'Sin información',
    nivel: 'Básico',
    imagen: icon
  });

  const ListOptions = [
    {
      link: '/privacy',
      title: 'Privacidad',
      description: 'Gestiona el uso de tu información personal.',
      icon: 'fas fa-shield-alt'
    },
    {
      link: '/purchases',
      title: 'Mis compras',
      description: 'Gestiona tus compras',
      icon: 'fas fa-shopping-basket'
    }
  ];

  useEffect(() => {
    if (state && state.user) {
      setUserInfo(state.user);
      setLoader(false)
    } else {
      (async () => {
        const personData = await getUser();
        console.log(personData);
        if (personData) {
          setUserInfo(personData);
        }
        setLoader(false)
      })()
    }
  }, [state]);
  return (
    <div className="py-5">
      {
        loader ? (
          <div className="d-flex align-items-center h-100" id="loader">
            <div className="spinner-border m-auto" role="status">
              <span className="sr-only d-md-none">Loading...</span>
            </div>
          </div>
        ) : (
          <div className='container'>
            {/* user info */}
            <div className='row justify-content-center'>
              <div className='col-10'>
                <div className="card mb-3 p-4">
                  <div className="card-body container-fluid">
                    <div className="d-flex">
                      <div className="">
                        <div className={`${style.icon} d-flex justify-content-center align-items-center`}>
                          <img src={userInfo.imagen} alt="user icon" />
                        </div>
                      </div>
                      <div className="mx-3">
                        <h5 className="card-title">{userInfo.nombre} {userInfo.apellido}</h5>
                        <p className="card-text">Nivel {userInfo.nivel} - Mercado Puntos</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* options */}
            <div className='row justify-content-center'>
              <div className='col-10'>
                <div className="card mb-3 p-4">
                  {
                    ListOptions.map((item) => (
                      <List link={item.link} title={item.title} description={item.description} icon={item.icon} />
                    ))
                  }
                </div>
              </div>
            </div>
          </div>
        )
      }
    </div >
  );
}

export default Profile;