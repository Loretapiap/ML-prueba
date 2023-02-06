import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Breadcrumb(history) {
  const list = history.history;

  return (
    <>
      {
        (list.length > 0) && (
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              {list.map((item, index) => (
                <li className={`breadcrumb-item ${index === list.length - 1 && 'active'}`} key={'li'+index}>
                  {index === list.length - 1
                    ? <span key={'link'+index}>{item.label}</span>
                    : <Link to={item.url} className='text-black-50' key={'link'+index}>{item.label}</Link>}
                </li>
              ))}
            </ol>
          </nav>
        )
      }
    </>
  );
}

export default Breadcrumb;