import React from 'react';
import { Link } from 'react-router-dom';
import style from './style.module.css'

function List({ icon, title, description, link }) {

  return (
    <Link to={link} className={`${style.link} w-100 pt-4 pb-3`}>
      <div className='container'>
        <div className='d-flex flex-wrap justify-content-between'>
          {
            icon && (
              <h1 className={style.icon}>
                <i className={icon}></i>
              </h1>
            )
          }
          <div className='col-11'>
            {title && (<h3 className={style.title}>{title}</h3>)}
            {description && <p className={style.description}>{description}</p>}
          </div>
          <i className={`fas fa-chevron-right align-self-center ${style.arrow}`} />
        </div>
      </div>
    </Link>
  );
}

export default List;