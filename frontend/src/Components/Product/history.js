import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import 'moment/locale/es';
import { UserContext } from '../../Context';
import style from './style.module.css'

function HistoryCard({ data, type }) {
  const navigate = useNavigate();
  const { state, dispatch } = useContext(UserContext);

  const toDetail = (e) => {
    e.preventDefault();
    dispatch({
      type: 'set_product',
      payload: data
    });
    navigate(`/product/${data.id_compra}`);
  };

  return (
    // <Link to={link} className={`${style.link} w-100 pt-4 pb-3`}>
    <div className="row justify-content-center mb-3">
      <div className={`${(type === 'home') ? 'col-12 col-md' : 'col-md-12 col-xl-10'}`}>
        <div className="card shadow-0 border rounded-3">
          <div className="card-body">
            <div className="row">
              <div className="col-md-12 col-lg-3 col-xl-3 mb-4 mb-lg-0">
                <div className={style.bgimage}>
                  <img src={data.imagen}
                    className="w-100" />
                  <a href="#!">
                    <div className="hover-overlay">
                      <div className="mask"></div>
                    </div>
                  </a>
                </div>
              </div>
              <div className="col-md-6 col-lg-6 col-xl-6">
                <h5 className='text-truncate'>{data.titulo}</h5>
                <div className="d-flex flex-row">
                  <div className="text-danger mb-1 me-2">
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                  </div>
                </div>
                <div className="mt-1 mb-0 text-muted small">
                  <span>Cantidad: {data.cantidad}</span>
                  <span className="text-primary"> • </span>
                  <span>Vendido por: {data.vendedor.nickname}</span>
                  <span className="text-primary"> • </span>
                  <span>#{data.id_compra}</span>
                </div>
                <p className="text-truncate mb-4 mb-md-0">
                  Fecha de compra: {moment(data.fecha).locale('es').format("DD/MMMM/YYYY")}
                </p>
              </div>
              {
                !type && (<div className="col-md-6 col-lg-3 col-xl-3 border-sm-start-none border-start">
                  <div className="d-flex flex-row align-items-center mb-1">
                    <h4 className="mb-1 me-1">{data.precio.moneda} ${data.precio.total}</h4>
                  </div>
                  <div className="d-flex flex-column mt-4">
                    <a onClick={toDetail} className="btn btn-primary btn-sm" type="button">Detalles</a>
                  </div>
                </div>)
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HistoryCard;