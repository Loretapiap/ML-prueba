import React from 'react';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import style from './style.module.css'

const Layout = ({ children }) => {

  return (
    <>
      <Header />
      <div className={`${style.body}`}>
        {children}
      </div>
      <Footer />
    </>
  );
};

export default Layout;
