import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../Context';
import { getUserPurchases } from '../../Services';
import HistoryCard from '../../Components/Product/history';
import Breadcrumb from '../../Components/Breadcrumb';

function Purchases() {
  const { state } = useContext(UserContext);

  const [loader, setLoader] = useState(true);
  const [purchases, setPurchases] = useState();

  useEffect(() => {
    if (state && state.user) {
      const { id_usuario } = state.user;
      (async () => {
        const allPurchases = await getUserPurchases(id_usuario);

        if (allPurchases.status !== 500) {
          setPurchases(allPurchases.data);
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
                    label: 'Mis Compras',
                    url: '/purchases'
                  }
                ]} />
              </div>

            </div>
            {
              purchases ? (
                <section>
                  <div className="container py-5">
                    {
                      purchases.map((product) => (<HistoryCard data={product} />))
                    }
                  </div></section>
              ) : (<div className="d-flex align-items-center justify-content-center">
                <div className="text-center row">
                  <div className="col-12 mt-5">
                    <p className="fs-3"> <span className="text-danger">Opps!</span> Ha ocurrido un error.</p>
                    <p className="lead">
                      Problemas al cargar tu historial de compra
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

export default Purchases;