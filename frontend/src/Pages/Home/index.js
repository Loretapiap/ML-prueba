import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom'

import { UserContext } from '../../Context';
import { getUser, getUserPurchases } from '../../Services';
import HistoryCard from '../../Components/Product/history';
import Carousel from './carousel';
import style from './style.module.css';

function Home() {
  const { state } = useContext(UserContext);

  const [loader, setLoader] = useState(true);
  const [purchases, setPurchases] = useState();
  const [userInfo, setUserInfo] = useState();

  useEffect(() => {
    if (state && state.user) {
      setUserInfo(state.user);
      setLoader(false)
    } else {
      (async () => {
        const personData = await getUser();
        if (personData) {
          setUserInfo(personData);
        }
      })()
    }
  }, [state]);

  useEffect(() => {
    if (userInfo) {
      const { id_usuario } = userInfo;
      (async () => {
        const allPurchases = await getUserPurchases(id_usuario, 3);

        if (allPurchases.status !== 500) {
          setPurchases(allPurchases.data);
        }
        setLoader(false)
      })()
    }
  }, [userInfo]);

  return (
    <div className="pb-5">
      <Carousel />
      {
        loader ? (
          <div className="d-flex align-items-center h-100" id="loader">
            <div className="spinner-border m-auto" role="status">
              <span className="sr-only d-md-none">Loading...</span>
            </div>
          </div>
        ) : (<>
          {
            purchases ? (
              <section>
                <div className="container py-5">
                  <div className='row'>
                    <div className='col-12 d-flex justify-content-between'>
                      <h1 className={style.title}>Basado en tu última visita</h1>
                      <p><Link to="/purchases">Ver historial</Link></p>
                    </div>
                  </div>
                  <div className='row'>
                    {
                      purchases.map((product) => (<div className='col-md-4'><HistoryCard data={product} type="home" /></div>))
                    }
                  </div>
                </div>
              </section>
            ) : (<div className="d-flex align-items-center justify-content-center">
              <div className="text-center row">
                <div className="col-12 mt-5">
                  <p className="fs-3"> <span className="text-danger">Opps!</span> Ha ocurrido un error.</p>
                  <p className="lead">
                    Problemas al cargar tu historial de compra
                  </p>
                </div>

              </div>
            </div>)
          }
        </>)
      }

    </div>
  );
}

export default Home;