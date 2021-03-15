import React from 'react';

import bemCssModules from 'bem-css-modules';

import { default as FooterStyles } from './Footer.module.scss'

const style = bemCssModules(FooterStyles);

const Footer = () => {


    return (
        <section className={style()}>
            <div className={style('logo-wrapper')}>
                <img className={style('logo')} src="logo.png" alt="logo" />
            </div>
            <div className={style('title-wrapper')}>
                <h2 className={style('title')}>Skontaktuj się z nami</h2>
                <p className={style('contact')}>Zadzwoń lub napisz do nas!</p>
            </div>
            <div className={style('address-wrapper')}>
                <p className={style('address')}>
                    <i className="fas fa-map-marker-alt"></i>
                    <span className={style('span')}>{`Międzynarodowa 4/8 \n00-574 Warszawa`}</span>
                </p>
                <p className={style('address')}>
                    <i className="fas fa-phone-square"></i>
                    <span className={style('span')}>23 303 03 03</span>
                </p>
                <p className={style('address')}>
                    <i className="fas fa-envelope"></i>
                    <span className={style('span')}>stanleys@pizza.com</span>
                </p>
            </div>
        </section>
    );
};

export default Footer;