import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import moment from 'moment';
import 'moment/locale/es';
import { UserContext } from '../../Context';
import { getPayment, getShipment } from '../../Services';
import HistoryCard from '../../Components/Product/history';
import Breadcrumb from '../../Components/Breadcrumb';
import style from './style.module.css'

function Product() {
  const navigate = useNavigate();

  const { state } = useContext(UserContext);
  const [product, setProduct] = useState();
  const [payment, setPayment] = useState();
  const [shipment, setShipment] = useState();
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    if (state && state.product) {
      setProduct(state.product);
    } else {
      navigate('/');
    }
  }, [state]);

  useEffect(() => {
    if (product) {
      (async () => {
        const getData = await getPayment(product.id_transaccion);
        const getDataShipment = await getShipment(product.id_envio);

        if (getData.status !== 500) {
          setPayment(getData.estado);
        }
        if (getDataShipment.status !== 500) {
          setShipment(getDataShipment.estado);
        }
        setLoader(false)
      })()
    }
  }, [product]);

  return (
    loader ? (
      <div className="d-flex align-items-center h-100" id="loader">
        <div className="spinner-border m-auto" role="status">
          <span className="sr-only d-md-none">Loading...</span>
        </div>
      </div>
    ) : (
      <div className='d-flex'>
        <div className='flex-grow-1 pt-5'>
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
                },
                {
                  label: `Producto #${product.id_compra}`
                }
              ]} />
            </div>

          </div>
          <HistoryCard data={product} type="details" />
        </div>
        <div className={`${style.detail} px-4 py-5 border-bottom`}>
          <div className='border-bottom'>
            <h6>Detalle de la compra</h6>
            <p className={style.paragraph}><small>{moment(product.fecha).locale('es').format("DD/MMMM/YYYY")} | #{product.id_compra}</small></p>
          </div>
          <div className='border-bottom py-3'>
            <table className='w-100'>
              <tbody>
                <tr>
                  <td>Producto</td>
                  <td className='text-end'>{product.precio.moneda}${product.precio.total}</td>
                </tr>
                <tr>
                  <td>Estado del pago</td>
                  <td className='text-end text-capitalize'>{payment}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className='border-bottom py-3'>
            <table className='w-100'>
              <tbody>
                <tr>
                  <td>Envío</td>
                  <td className='text-end text-capitalize'>{shipment}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    )
  );
}

export default Product;