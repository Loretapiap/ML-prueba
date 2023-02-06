import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../Context';
import { getUserRestrictions } from '../../Services';
import Breadcrumb from '../../Components/Breadcrumb';
import style from './style.module.css';

function Privacy() {
  const { state } = useContext(UserContext);

  const [loader, setLoader] = useState(true);
  const [restrictions, setRestrictions] = useState();
  const [userInfo, setUserInfo] = useState();

  useEffect(() => {
    if (state && state.user) {
      const { id_usuario } = state.user;
      setUserInfo(state.user);
      (async () => {
        const getRestrictions = await getUserRestrictions(id_usuario);

        if (getRestrictions.status !== 500) {
          setRestrictions(getRestrictions);
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
          <>
            <div className='row justify-content-center'>
              <div className='col-md-12 col-xl-10'>
                <Breadcrumb history={[
                  {
                    label: 'Inicio',
                    url: '/'
                  },
                  {
                    label: 'Perfil',
                    url: '/profile'
                  },
                  {
                    label: 'Privacidad',
                    url: '/privacy'
                  }
                ]} />
              </div>

            </div>
            {
              (restrictions && restrictions.length > 0) ? (
                <div className='container'>
                  {
                    restrictions.map((restriction) => (
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
                                  <h5 className="card-title">{userInfo.nombre} {userInfo.apellido} {restriction.tipo === "warning" && <i className="fas fa-exclamation-triangle text-danger"></i>}</h5>
                                  <p className="card-text">{restriction.mensaje}</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  }

                </div>
              ) : (<div className="d-flex align-items-center justify-content-center">
                <div className="text-center row">
                  <div className="col-12 mt-5">
                    <p className="fs-3"> <span className="text-danger">Opps!</span> Ha ocurrido un error.</p>
                    <p className="lead">
                      Problemas al cargar tu información
                    </p>
                    <Link to="/" className="btn btn-primary">Ir al inicio</Link>
                  </div>

                </div>
              </div>)
            }
          </>
        )
      }
    </div>
  );
}

export default Privacy;